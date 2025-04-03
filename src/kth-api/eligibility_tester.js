import fs from "fs";

let data = fs.readFileSync('all_courses_pruned.json');
let data_object = JSON.parse(data);

let test_courses_taken = ["SF1543", "SF1544", "DD1321"]
let prereqs = data_object["IK1203"]["prerequisites"];
let prereq_string = JSON.stringify(prereqs, null, 4)
console.log(prereq_string);

//function recursive_check
let step = 0;
function eligibility_check(courses_taken, prereq_object, previous_key) {
    try {
        let eligible;
        if (Array.isArray(prereq_object)) {
            let is_course_codes = true;
            for (let i = 0; i < prereq_object.length; i++) {
                let key = Object.keys(prereq_object[i])[0];
                console.log(key);
                if (key == "and" || key == "or") {
                    is_course_codes = false;
                    eligible = eligibility_check(courses_taken, prereq_object[i], key);
                    if (eligible && key == "or") {console.log("hei"); return true;}
                    if (!eligible && key == "and") {return false;}
                    if (i == prereq_object.length - 1) {
                        if (key == "or") {return false;}
                        if (key == "and") {return true;}
                    }
                }
            } 
            
            if (is_course_codes) {
                console.log(previous_key + ": " + prereq_object);
                let num_matches = 0;
                
                for (let i = 0; i < prereq_object.length; i++) {
                    if (courses_taken.includes(prereq_object[i])) {num_matches++;}
                }
                
                if ((previous_key == "or" && num_matches > 0) || (previous_key == "and" && num_matches == prereq_object.length)) {
                    return true
                }
                return false
            }
        } else {
            let key = Object.keys(prereq_object)[0];
            console.log(key);
            eligible = eligibility_check(courses_taken, prereq_object[key], key);
        }
        
        //console.log(previous_key + ": " + eligible);
        return eligible;

    } catch (err) {
        console.log(err);
    }
    
}

console.log("Eligible: " + eligibility_check(test_courses_taken, prereqs, null));