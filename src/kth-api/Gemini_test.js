import { GoogleGenAI } from "@google/genai";
import { KTH_API_course_fetch, KTH_API_all_active_courses } from "./api_data_fetching.js";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBtV0cqLhwXMEnJfFXPnw1hFLzg8Vdrzf8" });

async function course_prereqs_interpreter(course) {
    let course_info = await KTH_API_course_fetch(course);
    console.log(course_info);
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
    - The output must maintain correct nesting and avoid unnecessary object wrappers for general prerequisites.
    
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
    } This is the info: ` + course_info["prerequisites"] 
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-thinking-exp-01-21",
        contents: prompt
  });
    console.log(response.text.slice(8, -4));
}

await course_prereqs_interpreter("AL1130");