import React from 'react';

function FavouritesDropdown(props) {
    return (
        <>
            <div className="fixed mt-3  w-[32rem] right-4 bg-indigo-300/75 backdrop-blur-lg border border-violet-500 rounded-lg z-20 shadow-lg flex flex-col max-h-[calc(100vh-8rem)]">
                {/* Fixed Header */}
                <div className="sticky top-0 p-3 rounded-t-md bg-violet-500 flex justify-between items-center w-full border-b border-solid border-violet-600 font-semibold">
                    <p className="text-white w-1/4">Code</p>
                    <p className="text-white w-1/2">Name</p>
                    <p className="text-white w-1/4 text-center">Credits</p>
                    <div className="w-8"></div>
                </div>

                {/* Scrollable Course List */}
                <div className="overflow-y-auto flex-1">
                    {props.favouriteCourses.length > 0 ? (
                        props.favouriteCourses.map(course => (
                            <div
                                onClick={() => {
                                    props.setSelectedCourse(course);
                                    props.setIsPopupOpen(true);
                                }}
                                key={course.code}
                                className="p-3 hover:bg-indigo-400/50 cursor-pointer flex justify-between items-center w-full border-b border-solid border-violet-400">
                                <p className="text-violet-700 font-semibold w-1/4">{course.code}</p>
                                <p className="text-slate-900 font-semibold w-1/2">{course.name}</p>
                                <p className="text-slate-900 font-semibold w-1/4 text-center">{course.credits} hp</p>
                                <button
                                    className="text-violet-700 hover:text-red-500 cursor-pointer w-8 text-center font-bold"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        props.removeFavourite(course);
                                    }}>
                                    ×
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="p-3 text-slate-900 font-semibold">
                            No favourites
                        </div>
                    )}
                </div>

                {/* Fixed Footer */}
                <div className="sticky bottom-0 border-t border-solid border-violet-400 bg-indigo-300/75 backdrop-blur-lg">
                    <div className='p-3 flex justify-between items-center bg-violet-400/30'>
                        <p className='text-slate-900 font-bold w-1/2'>Total:</p>
                        <p className='text-slate-900 font-bold w-1/4'></p>
                        <p className='text-slate-900 font-bold w-1/4 text-center'>{props.totalCredits} hp</p>
                        <div className="w-8"></div>
                    </div>

                    <div className="flex border-t border-solid border-violet-400">
                        {props.favouriteCourses.length > 0 && (
                            <>
                                <button
                                    onClick={props.removeAllFavourites}
                                    className="w-1/2 p-3 cursor-pointer text-red-600 hover:bg-red-600 hover:text-white border-r border-solid border-violet-400 font-semibold transition-colors">
                                    Clear All
                                </button>
                                <button
                                    className="w-1/2 p-3 cursor-pointer text-violet-700 hover:bg-blue-500 hover:text-white flex items-center justify-center gap-2 font-semibold"
                                    onClick={() => console.log('Share feature coming soon')}>
                                    Share Courses
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {props.isPopupOpen && props.popup}
        </>
    );
}

export default FavouritesDropdown;