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
                        const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || 'http://localhost:3001';
                        const internalSecret = process.env.INTERNAL_API_SECRET || '';
                        // Await the sync to ensure user is created before session is established
                        const syncRes = await fetch(`${backendUrl}/api/users/sync`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-Internal-Secret': internalSecret,
                            },
                            body: JSON.stringify({
                                name: profile?.name || "",
                                email: email,
                                image: (profile as any)?.picture || profile?.image || "",
                            }),
                        });
                        const syncData = await syncRes.json();
                        if (syncData.success && syncData.data) {
                            // Store the backend user info in the account object temporarily
                            // so it can be picked up by the jwt callback
                            (account as any).backendUser = syncData.data;
                        } else {
                            console.error("User sync failed:", syncData.message);
                        }
                    } catch (error) {
                        console.error("Error syncing user to backend:", error);
                    }
                    return true;
                }
                return false;
            }
            return true
        },
        async jwt({ token, account }) {
            // If we just signed in, account.backendUser will be available from the signIn callback
            if (account && (account as any).backendUser) {
                token.id = (account as any).backendUser._id;
                token.role = (account as any).backendUser.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
}
