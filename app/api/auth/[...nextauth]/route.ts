import NextAuth from "next-auth"

import GoogleProvider from "next-auth/providers/google"
import AzureADProvider from "next-auth/providers/azure-ad"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        AzureADProvider({
            clientId: process.env.AZURE_CLIENT_ID as string,
            clientSecret: process.env.AZURE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            id: 'teacher',
            credentials: {},
            async authorize() {
                return {
                    id: "teacher",
                    name: "Teacher",
                    email: "teacher@chatedu.io"
                }
            }
        }),
        CredentialsProvider({
            id: 'student',
            credentials: {},
            async authorize() {
                return {
                    id: "student",
                    name: "Student",
                    email: "student@chatedu.io"
                }
            }
        }),
    ],
    callbacks: {
        session({ session, token }) {
            if(session.user) {
                session.user.id = token.sub || "";
            }
            return session;
        }
    }
})

export { handler as GET, handler as POST }