/* Takes in a string of the course code and returns the info based on the parameters */
async function KTH_API_course_fetch(course, parameter_array) {
    try {
        let course_info = {};
        const response = await fetch("https://api.kth.se/api/kopps/v2/course/" + course + "/detailedinformation");
        const data = await response.json();
        
        course_info["name"] = data["course"]["titleOther"];
        course_info["code"] = data["course"]["courseCode"];
        course_info["location"] = data["roundInfos"][0]["round"]["campus"]["name"];
        course_info["department"] = data["course"]["department"]["name"];
        course_info["description"] = data["publicSyllabusVersions"][0]["courseSyllabus"]["goals"];
        course_info["academic_level"] = data["course"]["educationalLevelCode"];
        course_info["lectures"] = data["roundInfos"][0]["lectureCount"];
        course_info["credits"] = data["course"]["credits"];
        course_info["language"] = {"Swedish" : false, "English": false};
        course_info["periods"] = {"P1" : false, "P2" : false, "P3" : false, "P4" : false};

        for (let i = 0; i < data["roundInfos"].length; i++) {
            if (data["roundInfos"][i]["round"]["language"] == "Engelska") {
                course_info["language"]["English"] = true;
            }
            if (data["roundInfos"][i]["round"]["language"] == "Svenska") {
                course_info["language"]["Swedish"] = true;
            }

            let period = data["roundInfos"][i]["round"]["courseRoundTerms"][0]["formattedPeriodsAndCredits"].substring(0, 2);
            

        }


        //course_info["period"] = data[]
        
        //course_info["profesors"] = data[""]
        //console.log("N of rounds: " + data["roundInfos"].length);
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


console.log(await KTH_API_course_fetch("IK1203", ""));



/*
async function KTH_API_fetch(course) {
    let response = await fetch("https://api.kth.se/api/kopps/v2/course/" + course + "/detailedinformation");
    return response;
}
function_response = "";
await fetch("https://api.kth.se/api/kopps/v2/course/" + course + "/detailedinformation") 
.then(response => response.json())  
.then(data => {function_response = data["publicSyllabusVersions"][0]["courseSyllabus"]["eligibility"]; console.log(function_response); return function_response})    
.catch(error => console.error(error));

return function_response;
*/


