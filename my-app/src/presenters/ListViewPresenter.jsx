import React from 'react';
import { observer } from "mobx-react-lite";
import ListView from "../views/ListView.jsx";

const ListViewPresenter = observer((props) => {
    return (
        <ListView courses={props.model.courses} searchResults={props.model.searchResults} />
    );
});

export { ListViewPresenter };