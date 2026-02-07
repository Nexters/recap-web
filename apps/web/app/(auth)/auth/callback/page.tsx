"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authAPIService } from "app/(auth)/src/service";
import { exchangeCodeForToken } from "lib/google-token";

const STORAGE_KEY = "google_oauth_pkce_v2";

type Stored = {
  state: string;
  codeVerifier: string;
  redirectUri: string;
  createdAt: number;
};

export default function GoogleOAuthCallbackPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<
    "validating" | "exchanging" | "sending" | "success" | "error"
  >("validating");
  const [message, setMessage] = useState("");

  const clientId = useMemo(
    () => process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
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

        setStatus("exchanging");
        setMessage("Google token endpoint로 교환 중...");

        const token = await exchangeCodeForToken({
          code,
          clientId,
          redirectUri: stored.redirectUri,
          codeVerifier: stored.codeVerifier,
        });

        const accessToken = token.access_token;
        if (!accessToken) throw new Error("Google access_token이 없어요.");

        setStatus("sending");
        setMessage("백엔드(/api/v1/auth/login)로 access_token 전달 중...");

        const data = await authAPIService.googleOauthLogin({
          oAuthToken: accessToken,
          provider: "GOOGLE",
        });

        sessionStorage.removeItem(STORAGE_KEY);

        setStatus("success");
        setMessage(`성공!\n백엔드 응답: ${JSON.stringify(data, null, 2)}`);
      } catch (e: unknown) {
        setStatus("error");
        setMessage(e instanceof Error ? e.message : String(e));
      }
    };

    run();
  }, [sp, clientId]);

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

      {status === "error" && (
        <div style={{ marginTop: 16 }}>
          <button
            onClick={() => {
              sessionStorage.removeItem(STORAGE_KEY);
              router.replace("/auth/login");
            }}
          >
            다시 로그인
          </button>
        </div>
      )}
    </main>
  );
}
