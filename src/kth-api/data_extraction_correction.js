import { KTH_API_course_fetch, KTH_API_all_active_courses } from "./api_data_fetching.js";
import fs from "fs";

let active_courses = await KTH_API_all_active_courses();

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let course_data = fs.readFileSync('all_courses_pruned.json');
let json_course_data = JSON.parse(course_data);
let n = 100;
let new_course_codes = [];
for (let start = 4640; start < 4700; start += n) {
    let end = start + n;
    if (end > 4600) {
        end = 4641;
    }

    
    let new_course_data = {};
    let previous_data = fs.readFileSync('all_courses_data4.json');
    let previous_object = JSON.parse(previous_data);
    
    console.log("Writing from " + start + " to " + end + "\n");
    for (let i = start; i < end; i++) {
        //if (i % 2 == 0) {process.stdout.write(".")}   // Generates progress bar
    
        let course_info = await KTH_API_course_fetch(active_courses[i]);
        console.log(active_courses[i]);
        if (json_course_data[active_courses[i]] != undefined) {
            new_course_data[active_courses[i]] = json_course_data[active_courses[i]];
        } else {
            break;
            new_course_data[active_courses[i]] = course_info;
            new_course_codes.push(active_courses[i]);
            console.log("\n NEW COURSE: " + active_courses[i] + "\n");
        }
        new_course_data[active_courses[i]]["prerequisites_text"] = course_info["prerequisites"];
        new_course_data[active_courses[i]]["description"] = course_info["description"];
        new_course_data[active_courses[i]]["learning_outcomes"] = course_info["learning_outcomes"];
    }
    console.log("\n");
    
    let new_object = {...previous_object, ...new_course_data};
    
    const jsonString = JSON.stringify(new_object, null, 4);  // Pretty print with 4 spaces
    
    fs.writeFileSync('all_courses_data4.json', jsonString, (err) => {
        if (err) {
            console.error('\nError writing file\n', err);
        } else {
            console.log('\nFile written successfully\n');
        }
    });
    
    await sleep(5000);
}

console.log(new_course_codes);
