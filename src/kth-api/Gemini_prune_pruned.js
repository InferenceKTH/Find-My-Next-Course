import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBtV0cqLhwXMEnJfFXPnw1hFLzg8Vdrzf8" });

let new_data = fs.readFileSync('all_courses_pruned.json');
let new_data_object = JSON.parse(new_data);

let data = fs.readFileSync('all_courses_data3.json');
let data_object = JSON.parse(data);

let prompt = `Convert the given prerequisite description into a structured JSON format following these rules:

    ### 1. Logical Structure:
    - Use "and" where **all** conditions must be met.
    - Use "or" where **at least one** condition must be met.
    - Nest conditions accordingly to preserve logical meaning.
    
    ### 2. Course Code Recognition:
    - Course codes must start with a capital letter and contain **at least six characters**.
    - If multiple course codes are separated by "/" or listed in a range (e.g., 'DD1310-DD1319'), treat them as an **OR** condition.
    
    ### 3. General Prerequisites:
    - Non-course prerequisites should be prefixed with "#" (e.g., "Bachelor degree or equivalent" → "#Bachelor degree or equivalent").
    - **General prerequisites must be stored as plain strings** inside "and" or "or" arrays.
    - **They must not be wrapped in {} brackets.**
    - If there are **no specific prerequisites**, the "prerequisites" key should have an empty array.
    
    ### 4. Final JSON Structure:
    - All prerequisites must be included under a single "prerequisites" key.
    - The output must maintain correct nesting and avoid unnecessary object wrappers for general prerequisites, especially this format is not correct: [{"STRING HERE"}].
    
    #### Example Input:
    Knowledge and skills in Java programming, 6 credits, corresponding to completed course ID1018/DD1337 alternatively a completed course in basic programming such as DD1310-DD1319/DD1321/DD1331/DD100N combined with a completed course in Java programming corresponding to DD1380.
    
    Knowledge in Boolean algebra, 1,5 credits, corresponding to completed course IE1204/IE1205, alternatively IS1500.
    
    PhD student in chemistry, chemical engineering and materials science.
    
    #### Expected JSON Output:
    {
      "prerequisites": {
        "and": [
          {
            "or": [
              ["ID1018", "DD1337"],
              {
                "and": [
                  {
                    "or": ["DD1310", "DD1311", "DD1312", "DD1313", "DD1314", "DD1315", "DD1316", "DD1317", "DD1318", "DD1319", "DD1321", "DD1331", "DD100N"]
                  },
                  "DD1380"
                ]
              }
            ]
          },
          {
            "or": [
              ["IE1204", "IE1205", "IS1500"]
            ]
          },
          "#PhD student in chemistry, chemical engineering and materials science."
        ]
      }
    } 
    This is the info: ` 

async function course_prereqs_interpreter(course_code) { 
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-thinking-exp-01-21",
        contents: prompt + data_object[course_code]["prerequisites"]
    });
    //console.log(response.text.slice(8, -4));
    return response.text.slice(8, -4);
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


let i = 0;
let saved_object = {};
for (let course of Object.keys(new_data_object)) {
    //if (i < 381) {i++; continue;}
    //if (!new_data_object[course]["prerequisites"]) {continue;} 
    if (new_data_object[course]["prerequisites"] != "RERUNTHIS") {continue;}

    if (data_object[course]["prerequisites"]) {
        try {
            let pruned_prereqs = await course_prereqs_interpreter(course);
            console.log(data_object[course]["prerequisites"]);
            await sleep(5000);
            //console.log(pruned_prereqs);
            new_data_object[course]["prerequisites"] = JSON.parse(pruned_prereqs)["prerequisites"];
        } catch(err) {
            console.log(err);
            new_data_object[course]["prerequisites"] = "RERUNTHIS";
        }
    } 
    saved_object[course] = new_data_object[course];
    console.log(saved_object[course]);
    
    let previous_saved = fs.readFileSync('all_courses_pruned.json');
    let previous_saved_object = JSON.parse(previous_saved);
    let new_object = {...previous_saved_object, ...saved_object}

    const jsonString = JSON.stringify(new_object, null, 4);  // Pretty print with 4 spaces

    fs.writeFileSync('all_courses_pruned.json', jsonString, (err) => {
        if (err) {
            console.error('\nError writing file\n', err);
        } 
    });
    
    i++;
    console.log("Course number " + i + " is done which is named " + course);
}

