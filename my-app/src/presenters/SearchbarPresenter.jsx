import React from 'react';
import { observer } from "mobx-react-lite";
import SearchbarView from "../views/SearchbarView.jsx";

const SearchbarPresenter = observer(({ model }) => {
    const searchCourses = (query) => {
        const searchResults = model.courses.filter(course =>
            course.code.toLowerCase().includes(query.toLowerCase()) ||
            course.name.toLowerCase().includes(query.toLowerCase()) ||
            course.description.toLowerCase().includes(query.toLowerCase())
        );
        model.setCurrentSearch(searchResults);
    }

    const removeFavourite = (course) => {
        model.removeFavourite(course);
    }

    return (
        <SearchbarView
            model={model}
            searchCourses={searchCourses}
            favouriteCourses={model.favourites}
            removeFavourite={removeFavourite}
        />
    );
});

export { SearchbarPresenter };