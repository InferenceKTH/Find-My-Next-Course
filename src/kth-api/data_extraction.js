import { KTH_API_course_fetch, KTH_API_all_active_courses } from "./api_data_fetching.js";
import fs from "fs";

let active_courses = await KTH_API_all_active_courses();


for (let start = 200; start < 4700; start += 100) {
    let end = start + 100;
    if (start > 4663) {
        end = 4663;
    }

}
let start = 400; 
let end = start + 100;
let previous_data = fs.readFileSync('all_courses_data2.json');
let previous_object = JSON.parse(previous_data);
let json_course_data = {};
console.log("Writing from " + start + " to " + end + "\n");
for (let i = start; i < end; i++) {
    if (i % 2 == 0) {process.stdout.write(".")}   // Generates progress bar

    let course_info = await KTH_API_course_fetch(active_courses[i]);
    json_course_data[active_courses[i]] = course_info;
}

let new_object = {...previous_object, ...json_course_data};

const jsonString = JSON.stringify(new_object, null, 4);  // Pretty print with 4 spaces

fs.writeFile('all_courses_data2.json', jsonString, (err) => {
    if (err) {
        console.error('\nError writing file\n', err);
    } else {
        console.log('\nFile written successfully\n');
    }
});