"use client";

// import { redirect } from "next/navigation"; // 서버 Side 리다이렉트
import { useRouter } from "next/navigation"; // 클라이언트에서 navigate하는 훅
import Main from "@/app/(beforeLogin)/_component/Main";

export default function Login() {
  // redirect('/i/flow/login');

  const router = useRouter();
  router.replace("/i/flow/login"); // 클라이언트 리다이렉트

  return <Main />;
}
