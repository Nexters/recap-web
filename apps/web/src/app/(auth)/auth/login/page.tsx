"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { tokenStore } from "@/app/(auth)/src/lib/token-store";
import { authAPIService } from "@/app/(auth)/src/service";

type BackendLoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export default function GoogleLoginPage() {
  const router = useRouter();

  const [msg, setMsg] = useState("");
  const [ready, setReady] = useState(false);

  const tokenClientRef = useRef<ReturnType<
    NonNullable<
      NonNullable<NonNullable<Window["google"]>["accounts"]>["oauth2"]
    >["initTokenClient"]
  > | null>(null);

  const clientId = useMemo(
    () => process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
    [],
  );

  useEffect(() => {
    if (!clientId) {
      setMsg("NEXT_PUBLIC_GOOGLE_CLIENT_ID가 비어 있어요.");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      const google = window.google;
      if (!google?.accounts?.oauth2?.initTokenClient) {
        setMsg("Google GIS(oauth2) 스크립트가 로드되지 않았어요.");
        return;
      }

      tokenClientRef.current = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: "openid email profile",
        callback: async (resp) => {
          try {
            if (resp.error) {
              throw new Error(
                `Google error: ${resp.error} ${resp.error_description ?? ""}`.trim(),
              );
            }

            const googleAccessToken = resp.access_token;
            if (!googleAccessToken)
              throw new Error("Google access_token이 없어요.");

            const data = (await authAPIService.googleOauthLogin({
              oAuthToken: googleAccessToken,
              provider: "GOOGLE",
            })) as BackendLoginResponse;

            if (!data?.accessToken || !data?.refreshToken) {
              throw new Error("백엔드 토큰 응답 형식이 예상과 달라요.");
            }

            tokenStore.set({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            });

            setMsg("로그인 성공! 이동 중...");

            router.replace("/");
          } catch (e: unknown) {
            setMsg(e instanceof Error ? e.message : String(e));
          }
        },
      });

      setReady(true);
      setMsg("");
    };

    script.onerror = () => setMsg("Google GIS 스크립트 로드 실패");
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [clientId, router]);

  const onClickLogin = () => {
    if (!tokenClientRef.current) {
      setMsg("token client가 준비되지 않았어요.");
      return;
    }
    tokenClientRef.current.requestAccessToken({ prompt: "consent" });
  };

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700 }}>
        Google Login (Access Token)
      </h1>

      <button
        disabled={!ready}
        onClick={onClickLogin}
        style={{
          marginTop: 16,
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #ddd",
          cursor: ready ? "pointer" : "not-allowed",
        }}
      >
        Google로 로그인
      </button>

      {msg && (
        <pre style={{ marginTop: 16, whiteSpace: "pre-wrap" }}>{msg}</pre>
      )}
    </main>
  );
}
