import React from 'react';
import { observer } from "mobx-react-lite";
import SearchbarView from "../views/SearchbarView.jsx";

const SearchBarPresenter = observer(() => {
    return (
        <SearchbarView searchResults={model.setCurrentSearch} />
    );
});

export { SearchBarPresenter };