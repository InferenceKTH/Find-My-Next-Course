import React from 'react';
import { observer} from "mobx-react-lite";
import { useState } from 'react';
import ListView from "../views/ListView.jsx";
import CoursePagePopup from '../views/Components/CoursePagePopup.jsx';
import PrerequisitePresenter from './PrerequisitePresenter.jsx';
import App from '../views/Components/ReactDiscussionReviews/App.js';

const ListViewPresenter = observer(({ model }) => {

    const handleFavouriteClick = (course) => {
        if (model.favourites.some(fav => fav.code === course.code)) {
            model.removeFavourite(course);
        } else {
            model.addFavourite(course);
        }
    };

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const preP = <PrerequisitePresenter model={model} selectedCourse={selectedCourse}/>
    const popup = <CoursePagePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} course={selectedCourse} handleFavouriteClick={handleFavouriteClick} prerequisiteTree={preP}/>
    const review=<App/>

    const addFavourite = (course) => {
        model.addFavourite(course);
    }
    const removeFavourite = (course) => {
        model.removeFavourite(course);
    }

    return <ListView
        courses={model.courses}
        searchResults={model.currentSearch}
        favouriteCourses={model.favourites}
        addFavourite={addFavourite}
        removeFavourite={removeFavourite}
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        setSelectedCourse={setSelectedCourse}
        popUp={popup}
        handleFavouriteClick={handleFavouriteClick}
        reviews={review}

    />;
});

export { ListViewPresenter };