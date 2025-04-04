import fs from "fs";

let data = fs.readFileSync('all_courses_pruned.json');
let data_object = JSON.parse(data);

let test_courses_taken = ["SF1543", "DD1380", "DD1321", "EP2720"]
let prereqs = data_object["IK1203"]["prerequisites"];
let prereq_string = JSON.stringify(prereqs, null, 4)
console.log(prereq_string);

//function recursive_check

function eligibility_check(courses_taken, current_object, previous_key) {
    /* STEP 1: Sets courses taken to true, and not taken to false */
    if (!Array.isArray(current_object)) {   // Is object
        let key = Object.keys(current_object)[0];
        eligibility_check(courses_taken, current_object[key], key);      
    } else {    // Is an array
        for (let i = 0; i < current_object.length; i++) {
            if (typeof current_object[i] == "string") {
                if (courses_taken.includes(current_object[i])) {
                    current_object[i] = true;
                } else {
                    current_object[i] = false;
                }
            } else {
                eligibility_check(courses_taken, current_object[i], previous_key);
            }
        }
    }
    
    /* STEP 2: Check if an object is true or false based on content of the inner object */
    if (typeof current_object == "object" && !Array.isArray(current_object)) {
        let key = Object.keys(current_object)[0];
        console.log(key);

        

    }



}

console.log("Eligible: " + eligibility_check(test_courses_taken, prereqs, null));
prereq_string = JSON.stringify(prereqs, null, 4)
console.log(prereq_string);