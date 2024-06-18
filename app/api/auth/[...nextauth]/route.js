import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../lib/dbConnect";
import User from "../../models/user";

const handler = (req, res) =>
  NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          await connectDB();

          const user = await User.findOne({ email: credentials.email });
          if (user) {
            if (user.password == credentials.password) {
              console.log(user);
              return {
                id: user._id,
                name: user.name,
                mobile: user.mobile,
                img: user.img,
                username: user.name,
              };
            } else {
              console.log("Invalid password");
            }
          } else {
            console.log("User not found");
          }
          return null;
        },
      }),
    ],
    session: {
      jwt: true,
      maxAge: 24 * 60 * 60, // 1 day
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.username = user.name;
          token.useremail = user.email;
          token.img = user.img;
          token.designation = user.designation;
        }
        return token;
      },
      async session({ session, token }) {
        session.user.id = token.id;
        session.user.name = token.username;
        session.user.email = token.useremail;
        session.user.img = token.img;
        session.user.designation = token.designation;
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  });

export { handler as GET, handler as POST };
