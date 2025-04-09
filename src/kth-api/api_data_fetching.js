/* Function used for extracting the periodes a course is given in from a string */
function period_extraction(text) {
    const myArray = text.split(", ");
    let result = [];
    for (let i = 0; i < myArray.length; i++) {
        const arr = myArray[i].split(" ");
        result.push(arr[0]);
    }
    return result;
}


/* Takes in a string of the course code and returns the info based on the parameters */
async function KTH_API_course_fetch(course) {
    try {
        let course_info = {};
        const response = await fetch("https://api.kth.se/api/kopps/v2/course/" + course + "/detailedinformation?l=en");
        const data = await response.json();
        
        course_info["name"] = data["course"]["title"];
        course_info["code"] = data["course"]["courseCode"];
        course_info["location"] = null;
        course_info["department"] = data["course"]["department"]["name"];
        course_info["academic_level"] = data["course"]["educationalLevelCode"];
        course_info["credits"] = data["course"]["credits"];
        course_info["grading"] = data["course"]["gradeScaleCode"];
        course_info["lectures"] = null;
        course_info["language"] = {"swedish" : null, "english": null};
        course_info["periods"] = {"P1" : null, "P2" : null, "P3" : null, "P4" : null};
        course_info["kth_page_url"] = "https://www.kth.se/student/kurser/kurs/" + course_info["code"];
        course_info["description"] = null;
        course_info["prerequisites"] = null;
        course_info["learning_outcomes"] = null;
        
        let language_set = false;
        let periods_set = false;

        if (data["roundInfos"].length > 0) {
            course_info["location"] = data["roundInfos"][0]["round"]["campus"]["name"];
    
            if (data["roundInfos"][0]["lectureCount"]) {
                course_info["lectures"] = data["roundInfos"][0]["lectureCount"];
            }

            for (let i = 0; i < data["roundInfos"].length; i++) {
                if (data["roundInfos"][i]["round"]["language"] == "English") {
                    course_info["language"]["english"] = true;
                    language_set = true;
                }
                if (data["roundInfos"][i]["round"]["language"] == "Swedish") {
                    course_info["language"]["swedish"] = true;
                    language_set = true;
                }
                
                let periods_unformated = data["roundInfos"][i]["round"]["courseRoundTerms"][0]["formattedPeriodsAndCredits"];
                let periods_array = period_extraction(periods_unformated);
                
                for (let i = 0; i < periods_array.length; i++) {
                    if (!course_info["periods"][periods_array[i]]) {
                        course_info["periods"][periods_array[i]] = true;
                        periods_set = true;
                    }
                }
                 
            }
            
            if (language_set) {
                for (let key of Object.keys(course_info["language"])) {
                    if (!course_info["language"][key]) {
                        course_info["language"][key] = false;
                    }
                }
            }

            if (periods_set) {
                for (let key of Object.keys(course_info["periods"])) {
                    if (!course_info["periods"][key]) {
                        course_info["periods"][key] = false;
                    }
                }
            }
        }

        try {
            if (data["publicSyllabusVersions"][0]["courseSyllabus"]["content"]) {
                course_info["description"] = data["publicSyllabusVersions"][0]["courseSyllabus"]["content"];
            }
            if (data["publicSyllabusVersions"][0]["courseSyllabus"]["eligibility"]) {
                course_info["prerequisites"] = data["publicSyllabusVersions"][0]["courseSyllabus"]["eligibility"];
            }
            if (data["publicSyllabusVersions"][0]["courseSyllabus"]["goals"]) {
                course_info["learning_outcomes"] = data["publicSyllabusVersions"][0]["courseSyllabus"]["goals"];
            }
        } catch (err) {}
        
        return course_info;
        
    } catch(err) {
        console.error(err);
    }
}


/* Return an array of strings containing the course code of all active courses */
async function KTH_API_all_active_courses() {
    try {
        let active_courses = [];
        const response = await fetch("https://api.kth.se/api/kopps/v2/courses");
        const data = await response.json();

        for (let i = 0; i < data.length; i++) {
            if (data[i]["state"] === "ESTABLISHED") {
                active_courses.push(data[i]["code"]);
            }
        }
        
        return active_courses;
        
    } catch(err) {
        console.error(err);

    }
}

export { KTH_API_course_fetch, KTH_API_all_active_courses };
