async function KTH_API_fetch(course) {
    try {
        const response = await fetch("https://api.kth.se/api/kopps/v2/course/" + course + "/detailedinformation");
        const data = await response.json();
        const function_response = data["publicSyllabusVersions"][0]["courseSyllabus"]["eligibility"];
        return function_response;

    } catch(err) {
        console.error(err);
    }
}


async function test() {
    let resp = await KTH_API_fetch("IK1203");
    console.log(resp);
}

test();




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


