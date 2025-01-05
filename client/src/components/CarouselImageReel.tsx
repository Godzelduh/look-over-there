
import '../Styles/ChallengeCarousel.css';
import '../Styles/ImageCarousel.css';
import ScavengerHunting from '../assets/ScavengerHunting.avif';
import TravelColosseum from '../assets/travelcolosseum.jpg';
import TravelMountains from '../assets/travelmountains.jpg';
import TravelSeoulTower from '../assets/travelseoultower.jpg';
import TravelChicagoBean from '../assets/travelchicagobean.jpg';
import Bridge from '../assets/bridge.jpg';
import Castle from '../assets/castle.png';
import Eiffeltower from '../assets/eiffeltower.png';
import Fountains from '../assets/fountains.png';
import Sphinx from '../assets/sphinx.png';


const images = [
    ScavengerHunting,
    TravelColosseum,
    TravelMountains,
    TravelSeoulTower,
    TravelChicagoBean,
    Bridge,
    Castle,
    Eiffeltower,
    Fountains,
    Sphinx
];

const ImageReel = () => {
    return (
        <div className="image-reel__viewport">
            <div className="image-reel__inner">
                {images.concat(images).map((image, index) => (
                    <div className="image-reel__slide" key={index}>
                        <img
                            src={image}
                            alt={`Image of different places`}
                            className='image-style'
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageReel;