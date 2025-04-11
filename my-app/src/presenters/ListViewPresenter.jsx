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
            // Calculate the percentage
            const scrollPercentage = window.scrollY / document.documentElement.scrollHeight;
            // Update the model's scroll position
            model.setScrollPosition(scrollPercentage);
            // If not logged in, also store in localStorage
            if (!model.user) {
                localStorage.setItem("scrollPercentage", scrollPercentage);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [model]);

    useEffect(() => {
        if (!model.user) {
            const stored = localStorage.getItem("scrollPercentage");
            if (stored) {
                window.scrollTo(0, stored * document.documentElement.scrollHeight);
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
    />;
});

export { ListViewPresenter };