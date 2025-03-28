import { KTH_API_course_fetch, KTH_API_all_active_courses } from "./api_data_fetching.js";
import fs from "fs";

let active_courses = await KTH_API_all_active_courses();

let json_course_data = {};

for (let i = 0; i < 100; i++) {
    if (i % 2 == 0) {process.stdout.write(".")}   // Generates progress bar

    let course_info = await KTH_API_course_fetch(active_courses[i]);
    json_course_data[active_courses[i]] = course_info;
}

const jsonString = JSON.stringify(json_course_data, null, 4);  // Pretty print with 4 spaces

fs.writeFile('all_courses_data.json', jsonString, (err) => {
    if (err) {
        console.error('\nError writing file', err);
    } else {
        console.log('\nFile written successfully');
    }
});
