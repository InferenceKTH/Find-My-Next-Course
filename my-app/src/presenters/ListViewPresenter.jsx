import React from 'react';
import { observer } from "mobx-react-lite";
import ListView from "../views/ListView.jsx";

const ListViewPresenter = observer(({ model }) => {
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
    />;
});

export { ListViewPresenter };