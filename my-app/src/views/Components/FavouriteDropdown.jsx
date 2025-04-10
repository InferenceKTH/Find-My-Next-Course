import React from 'react';
import { observer } from "mobx-react-lite";

const FavouritesDropdown = observer((props) => {
    console.log('Popup:', props.popup);
    console.log('isPopupOpen:', props.isPopupOpen);
    return (
        <div className="absolute mt-2 w-48 bg-white border border-solid border-black rounded-lg z-50 overflow-y-auto max-h-60">
            {props.favouriteCourses.length > 0 ? (
                props.favouriteCourses.map(course => (
                    <div
                        onClick={() => {
                            console.log('Clicked:', course);
                            props.setSelectedCourse(course);
                            props.setIsPopupOpen(true);
                        }}
                        key={course.code}
                        className="p-2 flex justify-between items-center w-full border border-solid border-black">
                        <p className="text-black">{course.name}</p>
                        <p className="text-black">
                            {course.name || course.code}
                        </p>
                        <button
                            className="text-red-500 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
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
            <div className="relative z-100">
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
});

export default FavouritesDropdown;
