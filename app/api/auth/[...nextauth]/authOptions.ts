import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import clientPromise from "../../../lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { userIsAllowedToSignIn } from "@/utils/axios";

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
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
  },
};
