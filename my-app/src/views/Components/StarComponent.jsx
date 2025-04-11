import React from 'react';

export const StarComponent = ({ index, rating, onRatingChange, onHover }) => {
    const handleLeftClick = () => onRatingChange(index, false);
    const handleRightClick = () => onRatingChange(index, true);

    const isFullStar = rating >= index + 1;
    const isHalfStar = rating >= index + 0.5 && rating < index + 1;
    const starClass = isFullStar ? "bxs-star" : isHalfStar ? "bxs-star-half" : "bx-star";

    return (
        <div
            className="relative group"
            onMouseEnter={() => onHover(index + 1)}
            onMouseLeave={() => onHover(0)}
        >
            <i
                className={`bx ${starClass} text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-yellow-400 transition-transform duration-200 group-hover:scale-110`}
            ></i>
            <button
                className="absolute top-0 left-1/2 w-1/2 h-full cursor-pointer"
                onClick={handleLeftClick}
            />
            <button
                className="absolute top-0 right-1/2 w-1/2 h-full cursor-pointer"
                onClick={handleRightClick}
            />
        </div>
    );
};

export default StarComponent;