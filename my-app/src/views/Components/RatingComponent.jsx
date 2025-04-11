import React, {useState} from 'react';
import StarComponent from "./StarComponent.jsx";

const RatingComponent = () => {
    const [rating, setRating] = useState(0);

    const handleRating = (starIndex, isLeftHalf) => {
        const newRating = isLeftHalf ? starIndex + 0.5 : starIndex + 1;
        setRating(newRating);
    }

    return (
        <div className="font-kanit flex justify-center items-center bg-transparent ">
                <div className="flex justify-center mb-4 gap-1 sm:gap-2">
                    {Array.from({length: 5}, (_, index) => (
                        <StarComponent key={index} index={index} rating={rating} onRatingChange={handleRating}/>))}
                </div>
        </div>
    );
}

export default RatingComponent;