import { observer } from "mobx-react-lite";
import eligibility from "../scripts/eligibility_refined.js";

const FilterPresenter = observer(({ model }) => {
    var localFilteredCourses = []; //might need to declare out of scope. idk js


    function applyTranscriptEligibility() {
        if(localFilteredCourses.length == 0) 
            return;
        /* this elias thing  */
        const eligibilitytype = model.filterOptions.eligibility;

        let strongcourses = [];
        let zerocourses = [];
        let moderatecourses = [];
        let weakcourses = [];

        let storedFinishedCourses = [];

        if (localStorage.getItem("completedCourses"))
            storedFinishedCourses = JSON.parse(localStorage.getItem("completedCourses"));

        
        localFilteredCourses.forEach(course => {
            //console.log(storedFinishedCourses);
            //console.log(course?.prerequisites);
            if(course?.prerequisites && (course.prerequisites !== "null"))
                var resultEligibility = eligibility(storedFinishedCourses, course?.prerequisites);
            else{
                //zerocourses.push(course);
                return;
            }
            if(resultEligibility.strong){
                strongcourses.push(course);
                return;
            }else if(resultEligibility.zero){
                zerocourses.push(course);
                return;
            }else if(resultEligibility.moderate){
                moderatecourses.push(course);
                return;
            }else if(resultEligibility.weak){
                weakcourses.push(course);
                return;
            }else{
                //it's not eligible at all
                return;
            }
            
        });

        switch(eligibilitytype){
            case "strong":
                {
                    localFilteredCourses = [...strongcourses, ...zerocourses];
                    break;
                }
            case "moderate":
                {
                    localFilteredCourses = [...strongcourses, ...moderatecourses, ...zerocourses];
                    break;
                }
            case "weak":
                {
                    localFilteredCourses = [...strongcourses, ...moderatecourses, ...weakcourses, ...zerocourses];
                    break; 
                }
            default:
                {
                    console.log("Error: somehow we got into a state where model.eligibility is no \"strong\"/\"moderat\"/\"weak\".");
                    localFilteredCourses = [];
                    break;
                }
        }
        

    }

    function updateCredits() {
        if(localFilteredCourses.length == 0) 
            return;
        const min = model.filterOptions.creditMin;
        const max = model.filterOptions.creditMax;

        localFilteredCourses = localFilteredCourses.filter(function(course){
            try {
                return ((course.credits >= min)&&(course.credits <= max));
            } catch (error) {
                console.log("for some reason course.credits is: ", course?.credits, error);
                return false;
            }
            
        });
    }

    function updateLocations() {
        //possible locations:  'null', 'KTH Campus', 'KTH Kista', 'AlbaNova', 'KTH Flemingsberg', 'KTH Solna', 'KTH Södertälje', 'Handelshögskolan', 'KI Solna', 'Stockholms universitet', 'KONSTFACK'
        //model.filterOptions.location is an array of locations the user toggled on, just like with academic level

        const locations = model.filterOptions.location;
        let bestCourses = [];
        let worstCourses = [];

        bestCourses = localFilteredCourses.filter(function(course) {
            try {
                return (locations.includes(course.location));
            } catch (error) {
                console.log("for some reason course.location is: ", course?.location, error);
                return false;
            }
            
        });
        worstCourses = localFilteredCourses.filter(function(course) {
            try {
                return ((course?.location === undefined) || (course?.location === "null"));
            } catch (error) {
                console.log("BIG ERROR", error);
                return false;
            }
            
        });

        localFilteredCourses = [...bestCourses, ...worstCourses];
        
    }

    function updateLanguages() {
        if(localFilteredCourses.length == 0) 
            return;
        //possible model.filterOptions.languages values: "none"/"english"/"swedish"/"both"
        const languages = model.filterOptions.language;
        let data = [...localFilteredCourses];
        let bestCourses = [];
        let middleCourses = [];
        let worstCourses = [];

        //in the database a course can have
        //course.language.english (true/false/"null")
        //course.language.swedish (true/false/"null")

        //console.log(data);
        
        switch (languages) {
            case "none":
                {
                    bestCourses = data;
                    break;
                }
            case "english":
                {
                    bestCourses = data.filter(function (course) {
                        try {
                            return (course?.language?.english === true);
                        } catch (error) {
                            console.log(course);
                            console.log("BIG ERROR", error);
                            return false;
                        }
                        
                    }
                    );
                    worstCourses = data.filter(function(course) {
                        try {
                            return ((course?.language === undefined ) || course?.language?.english === "null");
                        } catch (error) {
                            console.log(course);
                            console.log("BIG ERROR");
                            return false;
                        }
                        
                    });
                    break;
                }
            case "swedish":
                {
                    bestCourses = data.filter(function (course) {
                        try {
                            return (course?.language?.swedish === true);
                        } catch (error) {
                            console.log(course);
                            console.log("BIG ERROR");
                            return false;
                        }
                        
                    }
                    );
                    worstCourses = data.filter(function(course) {
                        try {
                            return ((course?.language === undefined ) || course?.language?.swedish === "null");
                        } catch (error) {
                            console.log(course);
                            console.log("BIG ERROR");
                            return false;
                        }
                        
                    });
                    break;
                }
            case "both":
                { //both on reorders, the both languages are reordered both - english - swedish - null
                    bestCourses = data.filter(function (course) {
                        try {
                            return ((course?.language?.english === true) && (course?.language?.swedish === true));
                        } catch (error) {
                            console.log(course);
                            console.log("BIG ERROR");
                            return false;
                        }
                        
                    }
                    );
                    middleCourses = data.filter(function (course) {
                        try {
                            return (((course?.language?.english === true) && (course?.language?.swedish === false))
                            || ((course?.language?.english === false) && (course?.language?.swedish === true)));
                        } catch (error) {
                            console.log(course);
                            console.log("BIG ERROR");
                            return false;
                        }
                        
                        }
                    );
                    worstCourses = data.filter(function(course) {
                        try {
                            return ((course?.language === undefined ) || course?.language?.english === "null");
                        } catch (error) {
                            console.log(course);
                            console.log("BIG ERROR");
                            return false;
                        }
                        
                    });
                    break;
                }
        }

        localFilteredCourses = [...bestCourses, ...middleCourses, ...worstCourses];
    }

    function updateLevels() {
        if(localFilteredCourses.length == 0) 
            return;

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
            //after deo finishes locations, until then dont

            //console.log("going to apply location on:",localFilteredCourses.length);
            //updateLocations();
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

        model.filteredCourses = [...localFilteredCourses];
        model.filtersChange = false;
        console.log("filtered objects number of elements: ", model.filteredCourses.length);
    }
});

export { FilterPresenter };