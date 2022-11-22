import { useState, useEffect } from "react";
import "./Slider.scss";
import { GrPrevious, GrNext } from "react-icons/gr";
import { sliderData } from "./Slider-data";

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;

  let slideInterval;
  let intervalTime = 5000;

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, slideInterval, autoScroll]);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="slider">
      <GrPrevious
        className="arrow prev"
        onClick={prevSlide}
        style={{
          fontSize: "40px",
        }}
      />
      <GrNext
        className="arrow next"
        onClick={nextSlide}
        style={{ fontSize: "40px" }}
      />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={image} style={{ opacity: ".8" }} alt="slide" />
                {/* <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a
                    href="#product"
                    className="bg-blue-500 hover:bg-blue-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    Alışverişe Başla
                  </a>
                </div> */}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Slider;
