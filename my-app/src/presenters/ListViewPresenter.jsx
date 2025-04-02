import React from 'react';
import { observer } from "mobx-react-lite";
import { model } from "../model.js";
import ListView from "../views/ListView.jsx";

const ListViewPresenter = observer((props) => {
    return <ListView courses={props.model.courses} />;
});

export { ListViewPresenter };