/* Takes in a string of the course code and returns the course code, name, location, department, prerequisits */
async function KTH_API_course_fetch(course) {
    try {
        const response = await fetch("https://api.kth.se/api/kopps/v2/course/" + course + "/detailedinformation");
        const data = await response.json();
        const function_response = data["publicSyllabusVersions"][0]["courseSyllabus"]["eligibility"];

        

        return function_response;

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
        
        return data
        
    } catch(err) {
        console.error(err);

    }
}

async function test() {
    let resp = await KTH_API_course_fetch("IK1203");
    console.log(resp);
}

//test();

KTH_API_all_active_courses();




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


