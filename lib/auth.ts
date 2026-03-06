import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "select_account",
                },
            },
        }),
    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === "google") {
                const email = profile?.email?.toLowerCase();
                if (!email) return false;

                const isAllowedDomain = email.endsWith("@ds.study.iitm.ac.in") || email.endsWith("@es.study.iitm.ac.in");

                if (isAllowedDomain) {
                    // Sync the user to the backend database
                    try {
                        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
                        // Using fetch with keepalive to ensure it runs even if navigation happens
                        fetch(`${apiUrl}/users/sync`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                name: profile?.name || "",
                                email: email,
                                image: (profile as any)?.picture || profile?.image || "",
                            }),
                            keepalive: true
                        }).catch(e => console.error("Failed to sync user to backend", e));
                    } catch (error) {
                        console.error("Error initiating user sync:", error);
                    }
                    return true;
                }
                return false;
            }
            return true
        },
    },
}
