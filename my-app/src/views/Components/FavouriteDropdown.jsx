import React from 'react';

function FavouritesDropdown(props) {
    return (
        <div className=" absolute mt-2 w-48 bg-white border border-gray-300 rounded-lg">
            {props.favouriteCourses.length > 0 ? (
                props.favouriteCourses.map(course => (

                    <div
                        key={course.code}
                        className="p-2 flex justify-between items-center">

                        <p>{course.name}</p>

                        <button
                            className="text-red-500 cursor-pointer"
                            onClick={() => removeFavourite(course.code)}>
                            X
                        </button>

                    </div>
                ))
            ) :
                (
                <div className="p-2 text-gray-500">No favourites</div>
                )
            }
        </div>
    );
}

export default FavouritesDropdown;