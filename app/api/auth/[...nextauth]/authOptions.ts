import { userIsAllowedToSignIn } from "@/utils/axios";
import constants from "@/utils/constants";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
import clientPromise from "../../../lib/mongodb";
import { CustomSendVerificationRequest } from "./signInEmail";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT
          ? parseInt(process.env.EMAIL_SERVER_PORT, 10)
          : undefined,
        secure: true,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: CustomSendVerificationRequest,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise!) as Adapter,
  callbacks: {
    async signIn({ user }) {
      const body = { email: user.email };
      const isAllowedToSignIn = await userIsAllowedToSignIn(body);
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  pages: {
    signIn: constants.LOGIN_PATH,
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/verificar", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: {
    maxAge: constants.SIX_MONTHS_IN_SECONDS,
  },
};
