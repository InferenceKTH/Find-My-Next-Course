import React from 'react';

function FavouritesDropdown(props) {
    return (
        <div className="absolute mt-2 w-48 bg-white border border-solid border-black rounded-lg z-50 overflow-y-auto">
            {props.favouriteCourses.length > 0 ? (
            
                    props.favouriteCourses.map(course => (
                        <div
                            key={course.code}
                            className="p-2 flex justify-between items-center w-full border border-solid border-black">
                            <p
                                className="text-black">
                                {course.name}
                            </p>
                            <button
                                className="text-red-500 cursor-pointer"
                                onClick={() => props.removeFavourite(course)}>
                                X
                            </button>
                        </div>
                    ))
                    
               
            )  : (
                <div className="p-2 text-[#000061]">
                    No favourites
                </div>
            )}
            {props.favouriteCourses.length > 0 ? <button onClick={props.removeAllFavourites}>Clear Favourites</button> : ""}
        </div>
    );
}

export default FavouritesDropdown;