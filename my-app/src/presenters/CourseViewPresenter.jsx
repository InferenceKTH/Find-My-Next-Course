import React from 'react';
import { observer } from "mobx-react-lite";
import CourseView from "../views/CourseView.jsx";

const CourseViewPresenter = observer(() => {
    return <CourseView/>;
});

export { CourseViewPresenter };