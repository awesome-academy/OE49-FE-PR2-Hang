import Products from "./Products";
import BannerSlider from "./Slider";

function Home() {
  return (
    <main className="home">
      <BannerSlider />
      <Products />
    </main>
  );
}

export default Home;
