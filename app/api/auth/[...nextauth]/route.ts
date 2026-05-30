import NextAuth from "next-auth"

const handler = NextAuth({
  providers: [], // keep empty for now if you don’t use login
})

export { handler as GET, handler as POST }