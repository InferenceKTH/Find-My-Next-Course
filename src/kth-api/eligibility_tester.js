import fs from "fs";

let data = fs.readFileSync('all_courses_pruned.json');
let data_object = JSON.parse(data);

let test_courses_taken = ["SF1543", "DD1380", "DD1321"]
let prereqs = data_object["IK1203"]["prerequisites"];
let prereq_string = JSON.stringify(prereqs, null, 4)
console.log(prereq_string);

//function recursive_check

function eligibility_check(courses_taken, current_object, original_object, previous_key) {
    if (!Array.isArray(current_object)) {
        let keys = Object.keys(current_object);
        //console.log(keys)
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] == "or" || keys[i] == "and") {
                eligibility_check(courses_taken, current_object[keys[i]], original_object, keys[i]);
            } 
        }

    } else {    // Is an array
        for (let i = 0; i < current_object.length; i++) {
            if (typeof current_object[i] == "string") {
                if (courses_taken.includes(current_object[i])) {
                    current_object[i] = true;
                } else {
                    current_object[i] = false;
                }
            }
            else if (!Array.isArray(current_object[i])) {
                eligibility_check(courses_taken, current_object[i], original_object, previous_key);
                //console.log(current_object[i])
            }
        }
    }
    if (previous_key == "or" && current_object.includes(true)) {
        console.log("Hei")
    }
}

console.log("Eligible: " + eligibility_check(test_courses_taken, prereqs, prereqs, null));

prereq_string = JSON.stringify(prereqs, null, 4)
console.log(prereq_string);