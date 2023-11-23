import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { CarouselProps } from "../../Model/model";
import axios from "axios";
import { useEffect, useState } from "react";
import { img_300, noPicture } from "../Config/Config";
import "./Carousel.css";
const handleDragStart = (e: any) => e.preventDefault();

const Carousel = (props: CarouselProps) => {
  const [credits, setCredits] = useState([]);
  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${props.media_type}/${props.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setCredits(data.cast);
  };

  /*  const items = [
    <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
    <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
    <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
  ]; */
  const items = credits?.map((credit: any) => (
    <div className="carouselItem">
      <img
        className="carouselItem_img"
        src={
          credit.profile_path ? `${img_300}/${credit.profile_path}` : noPicture
        }
        onDragStart={handleDragStart}
        role="presentation"
      />
      <b className="carouselItem_txt">{credit?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };
  useEffect(() => {
    fetchCredits();
  }, []);

  return (
    <AliceCarousel
      autoPlay
      responsive={responsive}
      mouseTracking
      items={items}
      disableButtonsControls
      disableDotsControls
    />
  );
};
export default Carousel;
