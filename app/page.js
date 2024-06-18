// pages/index.js (or Home.js, depending on your project structure)
import Header from "@/components/header";
import Homepagebody from "@/components/homebody";
import Signin from "@/components/signin";
export const metadata = {
  title: "Yt Home",
  desc: "This is home page",
};

export default function Home() {
  return (
    <div>
      <Homepagebody />
    </div>
  );
}
