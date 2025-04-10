import React from 'react';
import { observer } from "mobx-react-lite";
import SidebarView from "../views/SidebarView.jsx";


const SidebarPresenter = observer(({ model }) => {
    console.log("presenter ", model);
    const HandleFilterChange = () => {
        model.updateLanguage();
    }
    return (
        <SidebarView  HandleFilterChange={HandleFilterChange} />
    );
});

export { SidebarPresenter };