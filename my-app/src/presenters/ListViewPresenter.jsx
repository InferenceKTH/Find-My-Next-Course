import React from 'react';
import { observer } from "mobx-react-lite";
import { useState, useEffect } from 'react';
import ListView from "../views/ListView.jsx";
import CoursePagePopup from '../views/Components/CoursePagePopup.jsx';
import PrerequisitePresenter from './PrerequisitePresenter.jsx';
import {ReviewPresenter} from "../presenters/ReviewPresenter.jsx"

const ListViewPresenter = observer(({ model }) => {

    useEffect(() => {
        const handleScroll = () => {
            const scrollPixel = window.scrollY;
            model.setScrollPosition(scrollPixel);
            // If not logged in, also save in localStorage (absolute pixel value)
            if (!model.user) {
                localStorage.setItem("scrollPosition", scrollPixel);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [model]);

    // When user is not logged in, restore scroll from localStorage on login state change.
    useEffect(() => {
        if (!model.user) {
            const stored = localStorage.getItem("scrollPosition");
            if (stored) {
                const target = Number(stored);
                // Only scroll if the document is tall enough
                if (document.documentElement.scrollHeight > target) {
                    window.scrollTo(0, target);
                }
            }
        }
    }, [model.user]);
    
    const addFavourite = (course) => {
        model.addFavourite(course);
    }
    const removeFavourite = (course) => {   
        model.removeFavourite(course);
    }
    const handleFavouriteClick = (course) => {
        if (model.favourites.some(fav => fav.code === course.code)) {
            model.removeFavourite(course);
        } else {
            model.addFavourite(course);
        }
    };

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const preP = <PrerequisitePresenter model={model} selectedCourse={selectedCourse} />;
    const reviewPresenter = <ReviewPresenter model={model} course={selectedCourse}/>;

    const popup = <CoursePagePopup
        favouriteCourses={model.favourites}
        addFavourite={addFavourite}
        removeFavourite={removeFavourite}
        handleFavouriteClick={handleFavouriteClick}
        isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}
        course={selectedCourse}
        prerequisiteTree={preP} 
        reviewPresenter={reviewPresenter}/>
        


    return <ListView
        courses={model.courses}
        searchResults={model.currentSearch}
        favouriteCourses={model.favourites}
        addFavourite={addFavourite}
        removeFavourite={removeFavourite}
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        setSelectedCourse={setSelectedCourse}
        popup={popup}
        handleFavouriteClick={handleFavouriteClick}
        targetScroll={model.scrollPosition}
    />;
});

export { ListViewPresenter };