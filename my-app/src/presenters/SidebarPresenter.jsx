import React from 'react';
import { observer } from "mobx-react-lite";
import SidebarView from "../views/SidebarView.jsx";


const SidebarPresenter = observer(({ model }) => {
    /*HandleFilterChange param is structured as such
        [
            type of the field: (toggle, slider, dropdown, buttongroup)
            name of the filter: (level, language, location, credits)
            data to set in model
        ]
    */
    function HandleFilterChange(param){
        console.log(param);
    }

    /*HandleFilterEnable param is structured as such
        [
            name of the filter: (level, language, location, credits)
            value: (true/false)
        ]
    */
    function HandleFilterEnable(param) {
        console.log(param);
    }
    return (
        <SidebarView  HandleFilterChange={HandleFilterChange} 
        HandleFilterEnable={HandleFilterEnable} />
    );
});

export { SidebarPresenter };