import React from 'react';
import StarComponent from "./StarComponent.jsx";

const RatingComponent = ({ value = 0, onChange, readOnly = false }) => {
    const handleRating = (starIndex, isLeftHalf) => {
        if (readOnly) return; // if readOnly, do nothing
        const newRating = isLeftHalf ? starIndex + 0.5 : starIndex + 1;
        onChange(newRating);
    }

    return (
        <div className="font-kanit flex justify-center items-center bg-transparent">
            <div className="flex justify-center mb-4 gap-1 sm:gap-2">
                {Array.from({length: 5}, (_, index) => (
                    <StarComponent
                        key={index}
                        index={index}
                        rating={value}
                        onRatingChange={handleRating}
                        readOnly={readOnly}
                    />
                ))}
            </div>
        </div>
    );
}

export default RatingComponent;