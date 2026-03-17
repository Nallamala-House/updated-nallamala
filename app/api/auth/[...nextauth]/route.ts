import NextAuth from "next-auth"

const handler = NextAuth({
  providers: [], // keep empty for now
})

export { handler as GET, handler as POST }