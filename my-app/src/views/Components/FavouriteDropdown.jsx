import React from 'react';

function FavouritesDropdown(props) {
    console.log('Popup:', props.popup);
    console.log('isPopupOpen:', props.isPopupOpen);
    return (
        <div className="absolute mt-2 w-48 bg-white border border-solid border-black rounded-lg z-50 overflow-y-auto">
            {props.favouriteCourses.length > 0 ? (
                props.favouriteCourses.map(course => (
                    <div
                        onClick={() => {
                            console.log('Clicked:', course); // check browser console
                            props.setSelectedCourse(course);
                            props.setIsPopupOpen(true); // Ensure popup state is updated
                        }}
                        key={course.code}
                        className="p-2 flex justify-between items-center w-full border border-solid border-black">
                        <p className="text-black">{course.name}</p>
                        <button
                            className="text-red-500 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent parent click
                                props.removeFavourite(course);
                            }}>
                            X
                        </button>
                    </div>
                ))
            ) : (
                <div className="p-2 text-[#000061]">
                    No favourites
                </div>
            )}
            {/* Ensure popup is conditionally rendered */}
            <div style={{ position: 'relative', zIndex: 1000 }}>
                {props.isPopupOpen && props.popup}
            </div>
            {props.favouriteCourses.length > 0 && (
                <button
                    onClick={props.removeAllFavourites}
                    className="mt-2 text-red-500">
                    Clear Favourites
                </button>
            )}
        </div>
    );
}

export default FavouritesDropdown;