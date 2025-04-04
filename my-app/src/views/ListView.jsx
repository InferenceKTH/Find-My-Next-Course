import React, { useState } from 'react';
import { Quantum } from 'ldrs/react';
import 'ldrs/react/Quantum.css';

function ListView(props) {
    const coursesToDisplay = props.searchResults.length > 0 ? props.searchResults : props.courses;
    const [readMoreState, setReadMoreState] = useState({});

    const toggleReadMore = (courseCode) => {
        setReadMoreState(prevState => (
            { ...prevState, [courseCode]: !prevState[courseCode] }
        ));
    };

    const handleFavouriteClick = (course) => {
        if (props.favouriteCourses.some(fav => fav.code === course.code)) {
            props.removeFavourite(course);
        } else {
            props.addFavourite(course);
        }
    };

    return (
        <div className="relative bg-white text-black p-2 flex flex-col gap-5 h-full overflow-auto">
            {coursesToDisplay.length > 0 ? (
                coursesToDisplay.map((course) => (
                    <div
                        key={course.code}
                        className="p-5 hover:bg-blue-100 flex items-center border border-b-black border-solid w-full rounded-lg cursor-pointer"
                    >
                        <div>
                            <p className="font-bold text-[#000061]">{course.code}</p>
                            <p className="font-bold">{course.name}</p>
                            <p
                                className="text-gray-600"
                                dangerouslySetInnerHTML={{
                                    __html: readMoreState[course.code]
                                        ? course.description
                                        : course.description.slice(0, 150),
                                }}
                            />
                            {course.description.length > 150 && (
                                <span
                                    className="text-blue-500 cursor-pointer"
                                    onClick={() => toggleReadMore(course.code)}
                                >
                                    {readMoreState[course.code]
                                        ?
                                        ' show less'
                                        :
                                        ' read more'}
                                </span>
                            )}
                            <div>
                                <button
                                    className="text-yellow-500 cursor-pointer"
                                    onClick={() => handleFavouriteClick(course)}
                                >
                                    {props.favouriteCourses.some(fav => fav.code === course.code)
                                        ?
                                        'Unfavourite'
                                        :
                                        'Favourite'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <Quantum
                    size="1000"
                    speed="2"
                    color="#000061"
                />
            )}
        </div>
    );
}

export default ListView;