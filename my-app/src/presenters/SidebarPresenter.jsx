import React from 'react';
import { observer } from "mobx-react-lite";
import SidebarView from "../views/SidebarView.jsx";


const SidebarPresenter = observer(({ model }) => {
    const HandleFilterChange = () => {
        console.log("presenter ", model);
        model.updateLanguage();
    }
    return (
        <SidebarView  HandleFilterChange={HandleFilterChange} />
    );
});

export { SidebarPresenter };