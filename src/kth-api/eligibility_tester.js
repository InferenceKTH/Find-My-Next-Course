import fs from "fs";

let data = fs.readFileSync('all_courses_pruned.json');
let data_object = JSON.parse(data);

let test_courses_taken = []
let prereqs = data_object["IK1203"]["prerequisites"];
let prereq_string = JSON.stringify(prereqs, null, 4)
//console.log(prereq_string);


function prereq_convert(courses_taken, current_object, previous_key, hash_bool) {
    if (current_object == undefined) {return}
    /* STEP 1: Sets courses taken to true, and not taken to false */
    if (!Array.isArray(current_object)) {   // Is object
        let key = Object.keys(current_object)[0];
        prereq_convert(courses_taken, current_object[key], key, hash_bool);      
    } else {    // Is an array
        for (let i = 0; i < current_object.length; i++) {
            if (typeof current_object[i] == "string") {
                if (current_object[i][0] == '#') {
                    current_object[i] = hash_bool;
                    //console.log(JSON.stringify(prereqs, null, 4)); 
                } else if (courses_taken.includes(current_object[i])) {
                    current_object[i] = true;
                } else {
                    current_object[i] = false;
                }
            } else {
                prereq_convert(courses_taken, current_object[i], previous_key, hash_bool);
            }
        }
    }
    
    /* STEP 2: Check if an object is true or false based on content of the inner object */
    if (typeof current_object == "object" && !Array.isArray(current_object)) {
        let key = Object.keys(current_object)[0];
        let object_array = current_object[key];
        //console.log(key);
        //console.log(object_array);
        let num_of_matches = 0;
        for (let i = 0; i < object_array.length; i++) {
            //console.log(current_object[i])
            if (Array.isArray(object_array[i])) {
                let num_of_inner_matches = 0;
                for (let j = 0; j < object_array[i].length; j++) {
                    if (object_array[i][j]) {
                        num_of_inner_matches ++;
                    }
                }
                //console.log("key: " + key + " num of matc ")
                if (key == "or" && num_of_inner_matches > 0) {object_array[i] = true; num_of_matches++; continue;}
                if (key == "and" && num_of_inner_matches == object_array[i].length) {object_array[i] = true; num_of_matches++; continue;}
                object_array[i] = false;
            } else if (typeof object_array[i] == "object") {
                let inner_key = Object.keys(object_array[i])[0];
                if (object_array[i][inner_key]) {num_of_matches++;}
            } else if(object_array[i]) {num_of_matches++}
        }
        //console.log(num_of_matches);
        if (key == "or" && num_of_matches > 0) {current_object[key] = true}
        else if (key == "and" && num_of_matches == object_array.length) {current_object[key] = true}
        else {current_object[key] = false}


        
        //console.log(JSON.stringify(prereqs, null, 4)); 

    }

}


function eligibility_check(courses_taken, prereqs_object, hash_bool) {
    prereq_convert(courses_taken, prereqs_object, null, hash_bool);
    let key = Object.keys(prereqs_object);
    return prereqs_object[key];
}

function eligibility(courses_taken, prereqs_object) {
    let prereqs_object1 = structuredClone(prereqs_object);
    let prereqs_object2 = structuredClone(prereqs_object);
    let return_object = {strong: false, weak: false};
    
    if (eligibility_check(courses_taken, prereqs_object1, false)) {
        return_object["strong"] = true; 
    } else if (eligibility_check(courses_taken, prereqs_object2, true)) {
        return_object["weak"] = true;
    }
    return return_object;
}



/* BENCHMARK */
function benchmark(courses) {
    let count = 0;
    const start = Date.now();
    for (let i = 0; i < courses.length; i++) {
        //console.log(courses[i] + " : " + data_object[courses[i]]["prerequisites"])
        let prereqs = data_object[courses[i]]["prerequisites"];
        if (prereqs && prereqs != "RERUNTHIS") {
            //console.log(courses[i]);
            let eli = eligibility(test_courses_taken, data_object[courses[i]]["prerequisites"]);
            if (eli["strong"]) {
                console.log(courses[i]);
                count++;
            }
        }
    }
    const end = Date.now();

    console.log(end - start);
    console.log(count);
}

let all_course_codes = Object.keys(data_object);

benchmark(all_course_codes);
//let ret = eligibility(test_courses_taken, data_object["FDD3024"]["prerequisites"]);

//console.log("Eligibility: " + JSON.stringify(ret, null, 4));

/*


function prereq_check(courses_taken, current_object, previous_key) {
    if (!Array.isArray(current_object)) {   // Is object
        let key = Object.keys(current_object)[0];
        prereq_check(courses_taken, current_object[key], key);      
    } else {    // Is an array
        for (let i = 0; i < current_object.length; i++) {
            if (typeof current_object[i] == "boolean") {
                if (courses_taken.includes(current_object[i])) {
                    current_object[i] = true;
                } else {
                    current_object[i] = false;
                }
            } else {
                prereq_convert(courses_taken, current_object[i], previous_key);
            }
        }
    }

    // STEP 2: Check if an object is true or false based on content of the inner object 
    if (typeof current_object == "object" && !Array.isArray(current_object)) {
        let key = Object.keys(current_object)[0];
        console.log(key);
        let inner_object = current_object[key];
        if (Array.isArray(inner_object)) {
            for (let i = 0; i < inner_object.length; i++) {
                if (inner_object[i] && key == "or") {
                    current_object[key] = true;
                }
            }
        }
        prereq_string = JSON.stringify(prereqs, null, 4)
        console.log(prereq_string); 

    }
}

*/