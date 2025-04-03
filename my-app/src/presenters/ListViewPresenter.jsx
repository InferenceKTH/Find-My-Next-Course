import React from 'react';
import { observer } from "mobx-react-lite";
import ListView from "../views/ListView.jsx";

const ListViewPresenter = observer(({ model }) => {
    return <ListView
        courses={model.courses}
        searchResults={model.currentSearch}
        favouriteCourses={model.favourites}
        addFavourite={model.addFavourite}
        removeFavourite={model.removeFavourite}
    />;
});

export { ListViewPresenter };