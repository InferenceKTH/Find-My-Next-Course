import { KTH_API_course_fetch, KTH_API_all_active_courses } from "./api_data_fetching.js";
import fs from "fs";

let active_courses = await KTH_API_all_active_courses();

let previous_data = fs.readFileSync('all_courses_data4.json');
let previous_object = JSON.parse(previous_data);


console.log(active_courses.length);
console.log(Object.keys(previous_object).length);