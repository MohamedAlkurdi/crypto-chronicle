// import { useState } from "react";

// const slideStyles = {
//     width: "100%",
//     height: "100%",
//     borderRadius: "10px",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
// };

// const rightArrowStyles = {
//     position: "absolute",
//     top: "50%",
//     transform: "translate(0, -50%)",
//     right: "32px",
//     fontSize: "45px",
//     color: "#fff",
//     zIndex: 1,
//     cursor: "pointer",
// };

// const leftArrowStyles = {
//     position: "absolute",
//     top: "50%",
//     transform: "translate(0, -50%)",
//     left: "32px",
//     fontSize: "45px",
//     color: "#fff",
//     zIndex: 1,
//     cursor: "pointer",
// };

// const sliderStyles = {
//     position: "relative",
//     height: "100%",
// };

// const dotsContainerStyles = {
//     display: "flex",
//     justifyContent: "center",
// };

// const dotStyle = {
//     margin: "0 3px",
//     cursor: "pointer",
//     fontSize: "20px",
// };

// const ImageSlider = ({ slides }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const goToPrevious = () => {
//         const isFirstSlide = currentIndex === 0;
//         const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
//         setCurrentIndex(newIndex);
//     };
//     const goToNext = () => {
//         const isLastSlide = currentIndex === slides.length - 1;
//         const newIndex = isLastSlide ? 0 : currentIndex + 1;
//         setCurrentIndex(newIndex);
//     };
//     const goToSlide = (slideIndex) => {
//         setCurrentIndex(slideIndex);
//     };
//     const slideStylesWidthBackground = {
//         ...slideStyles,
//         backgroundImage: `url(${slides[currentIndex].url})`,
//     };

//     return (
//         <div style={sliderStyles}>
//             <div>
//                 <div onClick={goToPrevious} style={leftArrowStyles}>
//                     ❰
//                 </div>
//                 <div onClick={goToNext} style={rightArrowStyles}>
//                     ❱
//                 </div>
//             </div>
//             <div style={slideStylesWidthBackground}></div>
//             <div style={dotsContainerStyles}>
//                 {slides.map((slide, slideIndex) => (
//                     <div
//                         style={dotStyle}
//                         key={slideIndex}
//                         onClick={() => goToSlide(slideIndex)}
//                     >
//                         ●
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ImageSlider;


import { useEffect, useState } from "react"
import "../image-slider.css"

export default function ImageSlider({ images }) {
    const [imageIndex, setImageIndex] = useState(0)

    function showNextImage() {
        setImageIndex(index => {
            if (index === images.length - 1) return 0
            return index + 1
        })
    }

    function showPrevImage() {
        setImageIndex(index => {
            if (index === 0) return images.length - 1
            return index - 1
        })
    }
    useEffect(() => {
        const interval = setInterval(() => {
            showNextImage();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section
            aria-label="Image Slider"
            style={{ width: "100%", height: "100%", position: "relative" }}
        >
            <a href="#after-image-slider-controls" className="skip-link">
                Skip Image Slider Controls
            </a>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    overflow: "hidden"
                }}
            >
                {images.map(({ url, alt }, index) => (
                    <img
                        key={url}
                        src={url}
                        alt={alt}
                        aria-hidden={imageIndex !== index}
                        className="img-slider-img"
                        style={{ translate: `${-100 * imageIndex}%` }}
                    />
                ))}
            </div>
            <button
                onClick={showPrevImage}
                className="img-slider-btn"
                style={{ left: 0 }}
                aria-label="View Previous Image"
            >
                <div className="text-secondary"><i className="fa-solid fa-arrow-left"></i></div>
            </button>
            <button
                onClick={showNextImage}
                className="img-slider-btn"
                style={{ right: 0 }}
                aria-label="View Next Image"
            >
                <div className="text-secondary"><i className="fa-solid fa-arrow-right"></i></div>
            </button>
            <div className="over flex gap-1 w-36 overflow-hidden absolute bottom-2 left-1/2 translate-x-[-50%] justify-between"

            >
                {images.map((_, index) => (
                    <button
                        key={index}
                        className="img-slider-dot-btn h-8 overflow-hidden"
                        aria-label={`View Image ${index + 1}`}
                        onClick={() => setImageIndex(index)}
                    >
                        {index === imageIndex ? (
                            <div className="overflow-hidden text-secondary w-5"><i className="fa-solid fa-circle"></i></div>
                        ) : (
                            <div className="overflow-hidden text-secondary w-5"><i className="fa-regular fa-circle"></i></div>
                        )}
                    </button>
                ))}
            </div>
            <div id="after-image-slider-controls" />
        </section>
    )
}
