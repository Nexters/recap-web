"use client";

import { useEffect, useRef, useState } from "react";
import { authAPIService } from "app/(auth)/src/service";

export default function GoogleLoginPage() {
  const [msg, setMsg] = useState<string>("");

  const btnRef = useRef<HTMLDivElement | null>(null);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

  useEffect(() => {
    if (!clientId) {
      setMsg("NEXT_PUBLIC_GOOGLE_CLIENT_ID가 비어 있어요.");
      return;
    }
    if (!backend) {
      setMsg("NEXT_PUBLIC_BACKEND_URL가 비어 있어요.");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      const google = window.google;

      if (!google) {
        setMsg("Google 스크립트가 로드되지 않았어요.");
        return;
      }

      google.accounts.id.initialize({
        client_id: clientId,
        callback: async (resp: { credential?: string }) => {
          try {
            const idToken = resp.credential;
            if (!idToken) throw new Error("id_token(credential)이 없어요.");

            const data = await authAPIService.googleOauthLogin({
              oAuthToken: idToken,
              provider: "GOOGLE",
            });

            setMsg(`로그인 성공!\n${JSON.stringify(data, null, 2)}`);

            // const res = await fetch(`${backend}/api/v1/auth/login`, {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({
            //     provider: "google",
            //     tokenType: "id_token",
            //     token: idToken,
            //   }),
            //   credentials: "include",
            // });
          } catch (e: unknown) {
            if (e instanceof Error) {
              setMsg(e.message);
            } else {
              setMsg(String(e) || "로그인 처리 오류");
            }
          }
        },
      });

      // 4) 버튼 렌더
      if (btnRef.current) {
        if (!window.google) {
          return;
        }
        window.google.accounts.id.renderButton(btnRef.current, {
          theme: "outline",
          size: "large",
          type: "standard",
          shape: "pill",
          text: "signin_with",
        });
      }
    };

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [clientId, backend]);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700 }}>Google Login (ID Token)</h1>

      <div style={{ marginTop: 16 }} ref={btnRef} />

      {msg && (
        <pre style={{ marginTop: 16, whiteSpace: "pre-wrap" }}>{msg}</pre>
      )}
    </main>
  );
}
