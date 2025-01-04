import { useState, useEffect } from 'react';
import '../Styles/ChallengeCarousel.css';
import '../Styles/ImageCarousel.css';
import ScavengerHunting from '../assets/ScavengerHunting.avif';
import TravelColosseum from '../assets/travelcolosseum.jpg';
import TravelMountains from '../assets/travelmountains.jpg';
import TravelSeoulTower from '../assets/travelseoultower.jpg';
import TravelChicagoBean from '../assets/travelchicagobean.jpg';

const images = [
    ScavengerHunting,
    TravelColosseum,
    TravelMountains,
    TravelSeoulTower,
    TravelChicagoBean
];

const ImageReel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPreviousSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isHovered) {
                goToNextSlide();
            }
        }, 4000); // Change slide every 4 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [isHovered]);

    return (
        <div 
            className='image-reel' 
            aria-label="Gallery"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="image-reel__viewport" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div className="image-reel__slide" key={index}>
                        <img 
                            src={image}
                            alt={`Image of different places`}
                            className='image-style'
                        />
                    </div>
                ))}
            </div>
            <button onClick={goToPreviousSlide} className="image-reel__prev">Previous</button>
            <button onClick={goToNextSlide} className="image-reel__next">Next</button>
            <aside className="image-reel__navigation">
                <ol className="image-reel__navigation-list">
                    {images.map((_, navIndex) => (
                        <li className="image-reel__navigation-item" key={navIndex}>
                            <button onClick={() => setCurrentIndex(navIndex)} className="image-reel__navigation-button">Go to slide {navIndex + 1}</button>
                        </li>
                    ))}
                </ol>
            </aside>
        </div>
    );
}

export default ImageReel;