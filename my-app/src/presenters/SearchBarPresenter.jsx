import React from 'react';
import { observer } from "mobx-react-lite";
import SearchbarView from "../views/SearchbarView.jsx";

const SearchBarPresenter = observer(({ model }) => {
    return (
        <SearchbarView courses = {model.courses} searchResults={model.setCurrentSearch} />
    );
});

export { SearchBarPresenter };