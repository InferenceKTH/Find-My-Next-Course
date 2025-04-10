import React from 'react';
import { observer } from "mobx-react-lite";

const FilterPresenter = observer(({ model }) => {
    var localFilteredCourses = []; //might need to declare out of scope. idk js


    function applyTranscriptEligibility() {
        /* this elias thing  */
    }

    function updateCredits() {
        const min = model.filterOptions.creditMin;
        const max = model.filterOptions.creditMax;

        localFilteredCourses = localFilteredCourses.filter(function(course){
            return ((course.credits >= min)&&(course.credits <= max));
        });
    }

    function updateLocations() {
        //possible locations:  'null', 'KTH Campus', 'KTH Kista', 'AlbaNova', 'KTH Flemingsberg', 'KTH Solna', 'KTH Södertälje', 'Handelshögskolan', 'KI Solna', 'Stockholms universitet', 'KONSTFACK'
        //model.filterOptions.location is an array of locations the user toggled on, just like with academic level

        const locations = model.filterOptions.location;
        let bestCourses = [];
        let worstCourses = [];

        bestCourses = localFilteredCourses.filter(function(course) {
            return (locations.includes(course.location));
        });
        worstCourses = localFilteredCourses.filter(function(course) {
            return ((course.location === "null"));
        });

        localFilteredCourses = [...bestCourses, ...worstCourses];
        
    }

    function updateLanguages() {
        //possible model.filterOptions.languages values: "none"/"english"/"swedish"/"both"
        const languages = model.filterOptions.languages;
        let data = [...localFilteredCourses];
        let bestCourses = [];
        let middleCourses = [];
        let worstCourses = [];

        //in the database a course can have
        //course.language.english (true/false/"null")
        //course.language.swedish (true/false/"null")

        switch (languages) {
            case "none":
                {
                    bestCourses = data;
                    break;
                }
            case "english":
                {
                    bestCourses = data.filter(function (course) {
                        return (course.language.english === true);
                    }
                    );
                    worstCourses = data.filter(function(course) {
                        return (course.language.english === "null");
                    });
                    break;
                }
            case "swedish":
                {
                    bestCourses = data.filter(function (course) {
                        return (course.language.swedish === true);
                    }
                    );
                    worstCourses = data.filter(function(course) {
                        return (course.language.swedish === "null");
                    });
                    break;
                }
            case "both":
                { //both on reorders, the both languages are reordered both - english - swedish - null
                    bestCourses = data.filter(function (course) {
                        return ((course.language.english === true) && (course.language.swedish === true));
                    }
                    );
                    middleCourses = data.filter(function (course) {
                        return (((course.language.english === true) && (course.language.swedish === false))
                            || ((course.language.english === false) && (course.language.swedish === true)));
                        }
                    );
                    worstCourses = data.filter(function(course) {
                        return (course.language.english === "null");
                    });
                    break;
                }
        }

        localFilteredCourses = [...bestCourses, ...middleCourses, ...worstCourses];
    }

    function updateLevels() {
        //the possible values are: "PREPARATORY", "BASIC", "ADVANCED", "RESEARCH"
        //model.filterOptions.level is an array. it can have []
        const levels = model.filterOptions.level;
        localFilteredCourses = localFilteredCourses.filter(course => levels.includes(course.academicLevel));

        /*
        let levels = model.filterOptions.level;
        let stayingCourses = [];
        
        for(let i=0; i<localFilteredCourses.length; i++){
            let stay = false;
            for(let j=0; j<levels.length; j++){
                if(localFilteredCourses[i].academicLevel === levels[j]){
                    stay = true;
                    break;
                }
            }
            if(stay) stayingCourses.push(localFilteredCourses[i]);
        }
        localFilteredCourses = [...stayingCourses];*/
    }


    if (model.filtersChange) {
        localFilteredCourses = [...model.courses];


        if (model.filterOptions.applyLocationFilter) {
            updateLocations();
        }
        if (model.filterOptions.applyLevelFilter) {
            updateLevels();
        }
        if (model.filterOptions.applyLanguageFilter) {
            updateLanguages();
        }
        if (model.filterOptions.applyCreditsFilter) {
            updateCredits();
        }
        if (model.filterOptions.applyTranscriptFilter) {
            applyTranscriptEligibility();
        }


        model.filteredCourses = localFilteredCourses;
        model.filtersChange = false;
    }
});

export { FilterPresenter };