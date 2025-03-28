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
        const response = await fetch("https://api.kth.se/api/kopps/v2/course/" + course + "/detailedinformation");
        const data = await response.json();
        
        course_info["name"] = data["course"]["titleOther"];
        course_info["code"] = data["course"]["courseCode"];
        course_info["location"] = data["roundInfos"][0]["round"]["campus"]["name"];
        course_info["department"] = data["course"]["department"]["name"];
        course_info["academic_level"] = data["course"]["educationalLevelCode"];
        course_info["grading"] = data["course"]["gradeScaleCode"];
        course_info["lectures"] = null;
        course_info["credits"] = data["course"]["credits"];
        course_info["language"] = {"swedish" : false, "english": false};
        course_info["periods"] = {"P1" : false, "P2" : false, "P3" : false, "P4" : false};
        
        for (let i = 0; i < data["roundInfos"].length; i++) {
            if (data["roundInfos"][i]["round"]["language"] == "Engelska") {
                course_info["language"]["english"] = true;
            }
            if (data["roundInfos"][i]["round"]["language"] == "Svenska") {
                course_info["language"]["swedish"] = true;
            }
            
            let periods_unformated = data["roundInfos"][i]["round"]["courseRoundTerms"][0]["formattedPeriodsAndCredits"];
            let periods_array = period_extraction(periods_unformated);
            
            for (let i = 0; i < periods_array.length; i++) {
                if (!course_info["periods"][periods_array[i]]) {
                    course_info["periods"][periods_array[i]] = true;
                }
            }
             
        }
        course_info["description"] = data["publicSyllabusVersions"][0]["courseSyllabus"]["goals"];

        let prereqs = data["publicSyllabusVersions"][0]["courseSyllabus"]["eligibility"];
        if (prereqs != null) {
            course_info["prerequisites"] = prereqs;
        } else {
            course_info["prerequisites"] = null;

        }

        if (data["roundInfos"][0]["lectureCount"]) {
            course_info["lectures"] = data["roundInfos"][0]["lectureCount"];
        }

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


//console.log(await KTH_API_course_fetch("IK1203"));



