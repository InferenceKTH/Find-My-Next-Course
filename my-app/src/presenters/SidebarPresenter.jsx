import React from 'react';
import { observer } from "mobx-react-lite";
import SidebarView from "../views/SidebarView.jsx";
import { useState } from "react";









const SidebarPresenter = observer(({ model }) => {
    






    const [filterCopied, setFilterCopied] = useState(false);

    const handleShareFilters = () => {
        model.activeFilters = model.getActiveFiltersFromOptions();
        const query = new URLSearchParams(model.activeFilters || {}).toString();
        const url = `${window.location.origin}/#/share?${query}`;

        navigator.clipboard.writeText(url)
            .then(() => {
            setFilterCopied(true);
            setTimeout(() => setFilterCopied(false), 2500); // revert after 2.5 sec
            })
            .catch(err => {
            console.error("Copy failed:", err);
            });
    };






    let currentLanguageSet = 'none';
    let currentLevelSet = [];
    function handleLanguageFilterChange(param) {
        if (param === "English") {
            switch (currentLanguageSet) {
                case "none":
                    currentLanguageSet = "english";
                    break;
                case "swedish":
                    currentLanguageSet = "both";
                    break;
                case "english":
                    currentLanguageSet = "none";
                    break;
                case "both":
                    currentLanguageSet = "swedish";
                    break;
                default:
                    console.log("Invalid language filter value");
            }
        } else if (param === "Swedish") {
            switch (currentLanguageSet) {
                case "none":
                    currentLanguageSet = "swedish";
                    break;
                case "english":
                    currentLanguageSet = "both";
                    break;
                case "swedish":
                    currentLanguageSet = "none";
                    break;
                case "both":
                    currentLanguageSet = "english";
                    break;
                default:
                    console.log("Invalid language filter value");
            }
        }
        model.updateLanguageFilter(currentLanguageSet);
    }
    function handleLevelFilterChange(param) {
        let properParam;
        switch (param) {
            case "Preparatory":
                properParam = "PREPARATORY";
                break;
            case "Basic":
                properParam = "BASIC";
                break;
            case "Advanced":
                properParam = "ADVANCED";
                break;
            case "Research":
                properParam = "RESEARCH";
                break;
        }
    
        if (!currentLevelSet.includes(properParam)) {
            currentLevelSet.push(properParam);
        } else {
            const index = currentLevelSet.indexOf(properParam);
            if (index > -1) {
                currentLevelSet.splice(index, 1);
            }
        }
    
        model.updateLevelFilter(currentLevelSet);
    
        // ✅ Add this line to reflect it in the shareable link
        // You can choose how to serialize it — here we just use the first selected level
        if (currentLevelSet.length > 0) {
            model.updateFilter("level", currentLevelSet[0]); // or join if multiple
        } else {
            delete model.activeFilters.level;
        }
    }
    

    /*HandleFilterChange param is structured as such
        [
            type of the field: (toggle, slider, dropdown, buttongroup)
            name of the filter: (level, language, location, credits)
            data to set in model
        ]
    */
    function HandleFilterChange(param) {
        switch (param[1]) {
            case "language":
                handleLanguageFilterChange(param[2]);
                break;
            case "level":
                handleLevelFilterChange(param[2]);
                break;
            case "location":
                console.log("location filter set to: " + param[2]);
                model.updateLocationFilter([param[2]]);
                model.updateFilter("location", param[2]);
                break;
            case "credits":
                model.updateCreditsFilter(param[2]);
                break;
            case "eligibility":
                model.updateTranscriptElegibilityFilter(param[2].toLowerCase());
                break;
            default:
                console.log("Invalid filter type");
        }
        model.setFiltersChange();
    }

    /*HandleFilterEnable param is structured as such
        [
            name of the filter: (level, language, location, credits)
            value: (true/false)
        ]
    */
    function HandleFilterEnable(param) {
        switch (param[0]) {
            case "language":
                console.log("language filter set to: " + param[1]);
                model.setApplyLanguageFilter(param[1]);
                break;
            case "level":
                console.log("level filter set to: " + param[1]);
                model.setApplyLevelFilter(param[1]);
                break;
            case "location":
                console.log("location filter set to: " + param[1]);
                model.setApplyLocationFilter(param[1]);
                break;
            case "credits":
                console.log("credits filter set to: " + param[1]);
                model.setApplyCreditsFilter(param[1]);
                break;
            case "transcript":
                console.log("transcript filter set to: " + param[1]);
                model.setApplyTranscriptFilter(param[1]);
                break;
            default:
                console.log("Invalid filter type");
        }
        model.setFiltersChange();
    }
   // return (
     //   <SidebarView HandleFilterChange={HandleFilterChange}
       //     HandleFilterEnable={HandleFilterEnable} />
    //);




    return (
        <SidebarView
          HandleFilterChange={HandleFilterChange}
          HandleFilterEnable={HandleFilterEnable}
          onShareFilters={handleShareFilters}
          filterCopied={filterCopied}
        />
      );
      
});

export { SidebarPresenter };