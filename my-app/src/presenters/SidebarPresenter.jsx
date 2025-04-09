import React from 'react';
import { observer } from "mobx-react-lite";
import SidebarView from "../views/SidebarView.jsx";

const SidebarPresenter = observer(() => {
    return (
        <SidebarView/>
    );
});

export { SidebarPresenter };