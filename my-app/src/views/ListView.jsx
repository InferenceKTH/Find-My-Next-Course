import React, { useState, useEffect, useCallback } from 'react';
import { DotPulse, Quantum } from 'ldrs/react';
import 'ldrs/react/Quantum.css';
import InfiniteScroll from 'react-infinite-scroll-component';

function ListView(props) {
    const coursesToDisplay = props.searchResults.length > 0 ? props.searchResults : props.courses;
    const [displayedCourses, setDisplayedCourses] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [readMore, setReadMore] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const toggleReadMore = (courseCode) => {
        setReadMore(prevState => ({
            ...prevState,
            [courseCode]: !prevState[courseCode]
        }));
    };

    const handleFavouriteClick = (course) => {
        if (props.favouriteCourses.some(fav => fav.code === course.code)) {
            props.removeFavourite(course);
        } else {
            props.addFavourite(course);
        }
    };
    
    useEffect(() => {
        setIsLoading(true);
        const initialCourses = coursesToDisplay.slice(0, 10);
        setDisplayedCourses(initialCourses);
        setHasMore(coursesToDisplay.length > 10);
        setIsLoading(false);
    }, [props.courses, props.searchResults]);

    const fetchMoreCourses = useCallback(() => {
        if (!hasMore) return;
    
        const nextItems = coursesToDisplay.slice(displayedCourses.length, displayedCourses.length + 10);
        setDisplayedCourses(prevCourses => [...prevCourses, ...nextItems]);
        setHasMore(displayedCourses.length + nextItems.length < coursesToDisplay.length);
    }, [displayedCourses.length, coursesToDisplay, hasMore]);

    return (
        <div className="relative bg-white text-black p-2 flex flex-col gap-5 h-screen">
            {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <Quantum size="400" speed="10" color="#000061" />
                </div>
            ) : (
                <div className="overflow-y-auto h-full" id="scrollableDiv">
                    <InfiniteScroll
                        dataLength={displayedCourses.length}
                        next={fetchMoreCourses}
                        hasMore={hasMore}
                        loader={
                            <div className="text-center py-3">
                                <DotPulse size="100" speed="1.3" color="black" />
                            </div>
                        }
                        endMessage={<p className="text-center py-2">No more courses</p>}
                        scrollThreshold={0.9} // 90% of the container height
                        scrollableTarget="scrollableDiv"
                    >
                        {displayedCourses.map(course => (
                            <div
                                onClick={() => {
                                    props.setSelectedCourse(course);
                                    props.setIsPopupOpen(true);
                                }}
                                key={course.code}
                                className="p-5 mb-3 hover:bg-blue-100 flex items-center border border-b-black border-solid w-full rounded-lg cursor-pointer"
                            >
                                <div>
                                    <p className="font-bold text-[#000061]">{course.code}</p>
                                    <p className="font-bold">{course.name}</p>
                                    <p
                                        className="text-gray-600"
                                        dangerouslySetInnerHTML={{
                                            __html: readMore[course.code]
                                                ? course.description
                                                : course.description.slice(0, 150),
                                        }}
                                    />
                                    {course.description.length > 150 && (
                                        <span
                                            className="text-blue-500 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleReadMore(course.code);
                                            }}
                                        >
                                            {readMore[course.code] ? ' show less' : ' read more'}
                                        </span>
                                    )}
                                    <div>
                                        <button
                                            className="text-yellow-500 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFavouriteClick(course);
                                            }}
                                        >
                                            {props.favouriteCourses.some(fav => fav.code === course.code)
                                                ? 'Unfavourite'
                                                : 'Favourite'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
            )}
            {props.popup}
        </div>
    );
}

export default ListView;