"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { exchangeCodeForToken } from "lib/google-token";

const STORAGE_KEY = "google_oauth_pkce_v2";

type Stored = {
  state: string;
  codeVerifier: string;
  redirectUri: string;
  createdAt: number;
};

export default function Page() {
  const sp = useSearchParams();

  const [status, setStatus] = useState<
    "validating" | "exchanging" | "sending" | "success" | "error"
  >("validating");
  const [message, setMessage] = useState("");

  const clientId = useMemo(
    () => process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
    [],
  );
  const backendBase = useMemo(
    () => process.env.NEXT_PUBLIC_BACKEND_URL ?? "",
    [],
  );

  useEffect(() => {
    const run = async () => {
      try {
        const code = sp.get("code");
        const state = sp.get("state");
        const err = sp.get("error");
        const errDesc = sp.get("error_description");

        if (err)
          throw new Error(`Google error: ${err} ${errDesc ?? ""}`.trim());
        if (!code) throw new Error("callback에 code가 없어요.");
        if (!state) throw new Error("callback에 state가 없어요.");

        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (!raw)
          throw new Error("PKCE 세션이 없어요. 로그인 다시 시도해 주세요.");
        const stored = JSON.parse(raw) as Stored;

        if (stored.state !== state)
          throw new Error("state mismatch. 로그인 다시 시도해 주세요.");

        const ageMs = Date.now() - stored.createdAt;
        if (ageMs > 10 * 60 * 1000)
          throw new Error("로그인 시도가 만료됐어요.");

        if (!clientId)
          throw new Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID가 비어 있어요.");
        if (!backendBase)
          throw new Error("NEXT_PUBLIC_BACKEND_URL가 비어 있어요.");

        setStatus("exchanging");
        setMessage("Google token endpoint로 교환 중...");

        // ✅ 프론트에서 "토큰까지" 획득
        const token = await exchangeCodeForToken({
          code,
          clientId,
          redirectUri: stored.redirectUri,
          codeVerifier: stored.codeVerifier,
        });

        // 보통 백엔드로는 access_token보다 "id_token"을 보내는 게 인증 목적에 더 적합
        // (id_token은 JWT라 백엔드에서 서명 검증으로 사용자 식별 가능)
        const socialToken = token.id_token ?? token.access_token;

        setStatus("sending");
        setMessage("백엔드로 소셜 토큰 전달 중...");

        const res = await fetch(`${backendBase}/auth/social/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: "google",
            tokenType: token.id_token ? "id_token" : "access_token",
            token: socialToken,
          }),
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`백엔드 전달 실패: ${res.status} ${text}`);
        }

        const data = await res.json().catch(() => ({}));

        sessionStorage.removeItem(STORAGE_KEY);

        setStatus("success");
        setMessage(`성공!\n백엔드 응답: ${JSON.stringify(data, null, 2)}`);
      } catch (err: unknown) {
        setStatus("error");
        let messageText = "오류";
        if (err instanceof Error) {
          messageText = err.message;
        } else if (typeof err === "string") {
          messageText = err;
        } else if (err !== null && err !== undefined) {
          messageText = String(err);
        }
        setMessage(messageText);
      }
    };

    run();
  }, [sp, clientId, backendBase]);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700 }}>OAuth Callback</h1>
      <p style={{ marginTop: 12 }}>
        상태: <b>{status}</b>
      </p>
      <pre
        style={{
          marginTop: 12,
          whiteSpace: "pre-wrap",
          color: status === "error" ? "crimson" : "#333",
        }}
      >
        {message}
      </pre>
      <div style={{ marginTop: 16 }}>
        <a href="/auth/login">다시 로그인</a>
      </div>
    </main>
  );
}
