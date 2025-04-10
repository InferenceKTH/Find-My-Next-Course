import { GoogleGenAI } from "@google/genai";
import fs from "fs";

// Next AIzaSyDvLN7i0DVpaONLHI8MRU-nBQA-IkK7aSQ
// First AIzaSyBtV0cqLhwXMEnJfFXPnw1hFLzg8Vdrzf8
const ai = new GoogleGenAI({ apiKey: "AIzaSyBtV0cqLhwXMEnJfFXPnw1hFLzg8Vdrzf8" });


let data = JSON.parse(fs.readFileSync('firebase_data.json'));

let prompt = `
Convert the given course name, course department, course description and course learning outcomes into relevant labels.

### 1. The label structure
- A label should be **MAXIMUM** 30 characters.
- A label should be **MAXIMUM** 2 words. So the label "Front End" would be valid, but the label "Front End Development" would **NOT** be valid.
- A goal is to keep the labels short so more courses will fall under the same labels. For example should "Software Engineering" and "Software Reliability" both get the same label "Software", and all math related courses under the "Math" tag.
- A course with the name engineering in the name for example "Civil Engineering" should not make "Civil Engineering" the label, but rather "Civil" and "Engineering" as two labels. 
- All words (1 or 2) in a tag should start with a capital letter.
- If some of the data provided is **null** ignore and use what is not **null**.
- There are some label exceptions. I also want relevant programing languages as labels. So if a course has one of the following I also want that as a label:
[Java, C, C++, Python, Javascript, Assembly]

### 2. The return format
The return format should **ALWAYS** be an array contaning the labels like this: [Label1,Label2,Label3] **NO** programatic syntax that you use to solve the query. 
No newline characters in the return. No empty spaces before or after label in return. No JSON in the return. No slashes (/ or \) in the return.

### 3. Use previous tags
It should be a priority to use the same tags as the ones given, but if you find it suitable to add a new tag then definitely do so!
The previous tags are:
` ;

 //new Set(["Math", "Front End", "Software", "Hardware", "Security", "Back End", "Network", "Physics", "Communication", "Development", "Sustainability", "Electronics", "Machine Learning", "Management", "Business", "Chemistry", "Data", "Energy", "Engineering", "History", "Materials", "Optimization", "Vehicle", "Environment", "Low Level", "High Level", "Automation", "Web", "Embedded"]);
let current_labels;

async function course_label_interpreter(course_code) { 
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-thinking-exp-01-21",
        contents: prompt + [...current_labels].join(",") + "\nCourse name: " + data[course_code]["name"] + "\nCourse department: " + data[course_code]["department"] + "\nCourse description: " + data[course_code]["description"] + "\nCourse learning outcomes: " + data[course_code]["learning_outcomes"]
    });
    //console.log(response.text.slice(8, -4));
    return response.text.replace(/\n/g, "").replace(/`/g, "").replace(/"/g, "").slice(1, -1).split(",");
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



//let test = await course_label_interpreter("AE1709");
//console.log(test.slice(1, -1).split(","));


let course_codes = Object.keys(data);

for (let i = 0; i < course_codes.length; i++) {
    if (i < 2) {continue;}
    current_labels = new Set(fs.readFileSync('labels.txt', 'utf-8').split(","));
    
    try {
        let resp = await course_label_interpreter(course_codes[i]);
        await sleep(6000);
        
        console.log(i + " : " + course_codes[i] + " gets the labels: ");
        console.log(resp);
        console.log("");

        for (let label of resp) {
            current_labels.add(label);
        }
        let saved_object = {};
        saved_object[course_codes[i]] = data[course_codes[i]];
        saved_object[course_codes[i]]["labels"] = resp;

        let previous_saved = fs.readFileSync('all_courses_with_labels.json');
        let previous_saved_object = JSON.parse(previous_saved);

        //console.log(JSON.stringify(previous_saved_object, null, 4));

        let new_object = {...previous_saved_object, ...saved_object};
        

        const jsonString = JSON.stringify(new_object, null, 4);  // Pretty print with 4 spaces

        fs.writeFileSync('all_courses_with_labels.json', jsonString, (err) => {
            if (err) {
                console.error('\nError writing file\n', err);
            } 
        });


        let labels_string = [...current_labels].join(",")

        fs.writeFileSync('labels.txt', labels_string, (err) => {
            if (err) {
                console.error('\nError writing file\n', err);
            } 
        });

    } catch (err) {
        console.log(err);
        break;
    }
}

