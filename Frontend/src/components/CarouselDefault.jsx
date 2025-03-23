import { useState, useEffect } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function CarouselDefault({ slides, interval = 3000 }) {
  const [current, setCurrent] = useState(0);

  // Function to go to the previous slide
  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto-play effect
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, interval); // Change slide every `interval` ms

    return () => clearInterval(slideInterval); // Cleanup on unmount
  }, [current]); // Re-run when `current` changes

  return (
    <div className="overflow-hidden relative h-[40vh] w-full flex items-center justify-center rounded-2xl border-4 border-red-500  ">
      {/* Slides Wrapper */}
      <div
        className="flex transition-transform ease-out duration-500"
        style={{
          transform: `translateX(-${current * 100}%)`,
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((s, index) => (
          <img
            key={index}
            className="w-full h-full object-cover"
            src={s}
            alt={`Slide ${index}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-0 h-full w-full flex justify-between items-center px-5 text-transparent text-3xl">
        <button onClick={previousSlide}>
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 flex justify-center gap-3 w-full">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full w-3 h-3 cursor-pointer ${
              i === current ? "bg-white" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

