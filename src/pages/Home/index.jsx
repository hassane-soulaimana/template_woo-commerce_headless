import HomeSlider from "../../components/HomeSlider";
import PageContent from "../../components/PageContent";
import DeleteAccountButton from "../../components/DeleteAccountButton";
import Advantages from "../../components/Advantages";

export default function Home() {
  return (
    <div className="home">
      <PageContent slug="home" />
      <HomeSlider />
      <div className="apropos-wrapper">
        <PageContent slug="a-propos" />
        <Advantages />
      </div>
    </div>
  );
}