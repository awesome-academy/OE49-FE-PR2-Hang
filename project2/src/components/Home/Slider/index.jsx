import "./style.scss";
import Carousel from "react-bootstrap/Carousel";
import banner1 from "../../../assets/images/banner-1.jpg";
import banner2 from "../../../assets/images/banner-2.jpg";
import banner3 from "../../../assets/images/banner-3.jpg";
import banner4 from "../../../assets/images/banner-4.jpg";
import banner5 from "../../../assets/images/banner-5.jpg";

const banners = [banner1, banner2, banner3, banner4, banner5];
const carouselItem = banners.map((banner, index) => {
  return (
    <Carousel.Item key={index} interval={3000}>
      <img className="d-block w-100" src={banner} alt="slide" />
    </Carousel.Item>
  );
});

function BannerSlider() {
  return <Carousel>{carouselItem}</Carousel>;
}

export default BannerSlider;
