import React from 'react';
import { observer } from "mobx-react-lite";
import { useState } from 'react';
import ListView from "../views/ListView.jsx";
import CoursePagePopup from '../views/Components/CoursePagePopup.jsx';
import PrerequisitePresenter from './PrerequisitePresenter.jsx';
import {ReviewPresenter} from "../presenters/ReviewPresenter.jsx"

const ListViewPresenter = observer(({ model }) => {
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
        currentSearchLenght={model.currentSearch.length}

    />;
});

export { ListViewPresenter };