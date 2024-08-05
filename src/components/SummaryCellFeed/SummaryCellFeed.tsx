import React from "react";
import Slider from "react-slick";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { YouTube as YouTubeIcon } from "@mui/icons-material";
import { CarouselProps } from "../../interface/feeds.interface";
import "./SummaryCellFeed.scss";

const SummaryCellFeed: React.FC<CarouselProps> = ({
  city,
  country,
  images,
  title,
  video,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Box className="summary-cell-feed-container">
      <Box className="summary-cell-feed-header">
        <Typography className="location-info">
          {country} - {city}
        </Typography>
        <IconButton href={video} target="_blank" className="youtube-icon">
          <YouTubeIcon />
        </IconButton>
      </Box>
      <Slider {...settings} className="image-slider">
        {images?.map((image, index) => (
          <div key={index} className="slide">
            <img src={image} alt={`${title} ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default SummaryCellFeed;
