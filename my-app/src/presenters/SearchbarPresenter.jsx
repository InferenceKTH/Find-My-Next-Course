import React from 'react';
import { observer } from "mobx-react-lite";
import SearchbarView from "../views/SearchbarView.jsx";

const SearchbarPresenter = observer(({ model }) => {
    const searchCourses = (query) => {
        model.searchCourses(query);
    }

    const removeFavourite = (course) => {
        model.removeFavourite(course);
    }

    return (
        <SearchbarView
            model={model}
            searchCourses={searchCourses}
            favouriteCourses = {model.favourites}
            removeFavourite={removeFavourite}
        />
    );
});

export { SearchbarPresenter };