import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // id: "x",
            id: credentials.username,
            password: credentials.password,
            // password: "x",
          }),
        });

        // const authResponse = await fetch(`${process.env.AUTH_URL}/graphql`, {
        //   method: "POST",
        //   //   credentials: "include",
        //   headers: { "content-type": "application/json" },
        //   body: JSON.stringify({
        //     query: `mutation loing($email: String!, $password: String!) {
        //           loginAdminWithEmail(email: $email, password: $password) {
        //             access_token
        //             scopes
        //           }
        //         }
        //         `,
        //     variables: {
        //       email: `admin@sejinmind.com`,
        //       password: `admin1234!`,
        //     },
        //   }),
        // });

        // const fallback: [] = [];
        // let user: any = fallback;
        // user = await authResponse.json();
        // return user;

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();
        console.log("user", user);
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        };
      },
    }),
  ],
});
