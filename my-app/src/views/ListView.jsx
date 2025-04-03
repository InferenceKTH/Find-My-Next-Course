import React, { useState } from 'react';
import { Quantum } from 'ldrs/react';
import 'ldrs/react/Quantum.css';
import FavouritesDropdown from './Components/FavouriteDropdown.jsx';

function ListView(props) {
    const coursesToDisplay = props.searchResults.length > 0 ? props.searchResults : props.courses;
    const [readMoreState, setReadMoreState] = useState({});

    const toggleReadMore = (courseCode) => {
        setReadMoreState(prevState => (
            {...prevState, [courseCode]: !prevState[courseCode]}));
    };

    const handleFavouriteClick = (courseCode) => {
        if (props.favouriteCourses.includes(courseCode)) {
            props.removeFavourite(courseCode);
        }
        else {
            props.addFavourite(courseCode);
        }
    };

    return (
        <div className="relative bg-white text-black p-2 flex flex-col gap-5 h-full overflow-auto">
            {
                coursesToDisplay.length > 0 ?
                    coursesToDisplay.map((course) => (
                        <div
                            key={course.code}
                            className="p-5 hover:bg-blue-100 flex items-center border border-b-black border-solid w-full rounded-lg cursor-pointer">
                            <div>
                                <p className={"font-bold text-[#000061]"}>{course.code}</p>
                                <p className="font-bold">{course.name}</p>
                                <p className="text-gray-600" dangerouslySetInnerHTML={
                                    { __html: readMoreState[course.code] ? course.description : course.description.slice(0, 150) }
                                }
                                />
                                {course.description.length > 150 && (
                                    <span className="text-blue-500" onClick={() => toggleReadMore(course.code)}>
                                        {readMoreState[course.code] ? ' show less' : 'read more'}
                                    </span>
                                )}

                                <div>
                                    <button className="text-yellow-500 cursor-pointer" onClick={() => handleFavouriteClick(course.code)}>
                                        {props.favouriteCourses.includes(course.code)
                                            ?
                                            'Remove from Favourites'
                                            :
                                            'Add to Favourites'
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) :
                    <Quantum
                        size="1000"
                        speed="2"
                        color="#000061"
                    />
            }
        </div>
    );
}

export default ListView;