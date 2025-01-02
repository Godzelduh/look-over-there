import '../Styles/ChallengeCarousel.css'
import '../Styles/ImageCarousel.css'
import ScavengerHunting from '../assets/ScavengerHunting.avif';
import TestImage from '../assets/testimage.jpg';
import LookoverthereLogo1 from '../assets/LookoverthereLogo1.jpg';
const images: string[] = [
    ScavengerHunting,
    TestImage,
    LookoverthereLogo1,
];
//list components containing images

const ImageReel = () => {
    return (
        <>
            <div >
                <div className='image-reel' aria-label="Gallery">
                <ol className="image-reel__viewport">
                    {images.map((image: string, index: number) => (
                        <li id={`imageReel__slide${index+1}`} tabIndex={0} className="image-reel__slide" key={index}>
                            <div className="image-reel__snapper">
                                
                                    
                                        <img 
                                            key={index}
                                            src={image}
                                            alt={`Image of different places`}
                                            className='image-style'
                                        />
                                   
                                    <a href={`#imageReel__slide${index === 0 ? images.length : index}`} className="image-reel__prev">Go to previous slide</a>
                                    <a href={`#imageReel__slide${index === images.length - 1 ? 1 : index + 2}`} className="image-reel__next">Go to next slide</a>
                             </div>
                         </li> 
                    ))}
                </ol>
                <aside className="image-reel__navigation">
                    <ol className="image-reel__navigation-list">
                        {images.map((_, navIndex) => (
                            <li className="image-reel__navigation-item" key={navIndex}>
                                <a href={`#imageReel__slide${navIndex + 1}`} className="image-reel__navigation-button">Go to slide {navIndex + 1}</a>
                            </li>
                        ))}
                    </ol>
                </aside>
                </div>
            </div>
        </>
    )
}

export default ImageReel;