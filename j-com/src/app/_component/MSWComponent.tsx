"use client";
import { useEffect } from "react";

export const MSWComponent = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 브라우저 환경, msw ver2 변경점
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        require("@/mocks/browser"); // 클라이언트의 요청을 가로채기 -> http.ts -> handler.ts
      }
    }
  }, []);

  return null;
};
