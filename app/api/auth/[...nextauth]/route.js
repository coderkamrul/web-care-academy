import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "../../../../models/User"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          const user = await User.findByEmail(credentials.email)

          if (!user) {
            return null
          }

          // Verify password
          const isValidPassword = await User.verifyPassword(credentials.password, user.password)

          if (!isValidPassword) {
            return null
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isVerified: user.isVerified, // Include verification status
            isProfileComplete: user.isProfileComplete,
            profileImage: user.profileImage,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.isVerified = user.isVerified // Include verification status in token
        token.isProfileComplete = user.isProfileComplete
        token.profileImage = user.profileImage
        token.phone = user.phone
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
        session.user.isVerified = token.isVerified // Include verification status in session
        session.user.isProfileComplete = token.isProfileComplete
        session.user.profileImage = token.profileImage
        session.user.phone = token.phone
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/signup",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
