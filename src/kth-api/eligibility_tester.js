import fs from "fs";

let data = fs.readFileSync('all_courses_pruned.json');
let data_object = JSON.parse(data);

let test_courses_taken = ["SF1543", "SF1544", "DD1321"]
let prereqs = data_object["IK1203"]["prerequisites"];
let prereq_string = JSON.stringify(prereqs, null, 4)
console.log(prereq_string);

//function recursive_check

function eligibility_check(courses_taken, current_object, original_object, previous_key) {
    if (!Array.isArray(current_object)) {
        let keys = Object.keys(current_object);
        console.log(keys)
        for (let i = 0; i < keys.length; i++) {
            eligibility_check(courses_taken, current_object[keys[i]], original_object, keys[i]);
        }
    }
}

console.log("Eligible: " + eligibility_check(test_courses_taken, prereqs, prereqs, null));