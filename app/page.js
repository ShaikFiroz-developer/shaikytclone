// pages/index.js (or Home.js, depending on your project structure)
import Footer from "@/components/footer";
import Header1 from "@/components/head";
import Homepagebody from "@/components/homebody";
import Signin from "@/components/signin";
export const metadata = {
  title: "Yt Home",
  desc: "This is home page",
};

export default function Home() {
  return (
    <div>
      <Header1 />
      <Homepagebody />
      <Footer />
    </div>
  );
}
