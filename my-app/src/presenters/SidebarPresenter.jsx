import React from 'react';
import { observer } from "mobx-react-lite";
import SidebarView from "../views/SidebarView.jsx";

const SidebarPresenter = observer(({ model }) => {
    return (
        <SidebarView/>
    );
});

export { SidebarPresenter };