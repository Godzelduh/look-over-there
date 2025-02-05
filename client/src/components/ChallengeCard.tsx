//import { CSSProperties } from 'react';
import '../Styles/ChallengeCarousel.css'
import { Place } from '../models/Place';

const counter = ["First", "Second", "Third", "Fourth", "Fifth"];

const ChallengeCard = ({ places }: { places: Place[] }) => {
    return (
        <>
            <div >
                <h3 className= 'h2-header'>Preview of your Hunt!</h3> 
                <div className='carousel' aria-label="Gallery">
                <ol className="carousel__viewport">
                    {places.map((place: Place, index: number) => (
                        <li id={`challengeCard__slide${index+1}`} tabIndex={0} className="carousel__slide" key={index}>
                            <div className="carousel__snapper">
                                <div className='image-container-card'>
                                    <h3 className="overlap">{counter[index]} Challenge!</h3>
                                    {place.photos.map((photo: string, photoIndex: number) => (
                                        <img 
                                            key={photoIndex}
                                            src={photo}
                                            alt={`Image of ${place.name}`}
                                            className='image-style-card'
                                        />
                                    ))}
                                </div>
                                
                                <a href={`#challengeCard__slide${index === 0 ? places.length : index}`} className="carousel__prev">Go to previous slide</a>
                                <a href={`#challengeCard__slide${index === places.length - 1 ? 1 : index + 2}`} className="carousel__next">Go to next slide</a>
                             </div>
                         </li> 
                    ))}
                </ol>
                <aside className="carousel__navigation">
                    <ol className="carousel__navigation-list">
                        {places.map((_, navIndex) => (
                            <li className="carousel__navigation-item" key={navIndex}>
                                <a href={`#carousel__slide${navIndex + 1}`} className="carousel__navigation-button">Go to slide {navIndex + 1}</a>
                            </li>
                        ))}
                    </ol>
                </aside>
                </div>
            </div>
        </>
    )
}

export default ChallengeCard;