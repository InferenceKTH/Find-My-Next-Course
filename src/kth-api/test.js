import { KTH_API_course_fetch, KTH_API_all_active_courses } from "./api_data_fetching.js";
import fs from "fs";

//let active_courses = await KTH_API_all_active_courses();

let data = JSON.parse(fs.readFileSync('firebase_data.json'));

let unique_identifiers = new Set();


for (let course_code of Object.keys(data)) {
    unique_identifiers.add(data[course_code]["department"]);
}

console.log(unique_identifiers);

let test_string = "``H\n[test]\nH``";

console.log(test_string.replace(/\n/g, "").replace(/`/g, ""));