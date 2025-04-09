import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBckVI9nhAP62u5jZJW3F4SLulUv7znis",
    authDomain: "findmynextcourse.firebaseapp.com",
    databaseURL: "https://findmynextcourse-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "findmynextcourse",
    storageBucket: "findmynextcourse.firebasestorage.app",
    messagingSenderId: "893484115963",
    appId: "1:893484115963:web:59ac087d280dec919ccd5e"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");

// fetches all relevant information to create the model
async function firebaseToModel(model) {
    // Load metadata from localStorage
    const cachedMetadata = JSON.parse(localStorage.getItem("coursesMetadata"));
    const firebaseTimestamp = await fetchLastUpdatedTimestamp();
    // check if up to date
    if (cachedMetadata && cachedMetadata.timestamp === firebaseTimestamp) {
        console.log("Using cached courses...");
        let mergedCourses = [];
        for (let i = 0; i < cachedMetadata.parts; i++) {
            const part = JSON.parse(localStorage.getItem(`coursesPart${i}`));
            if (part) 
                mergedCourses = mergedCourses.concat(part);
        }
        model.setCourses(mergedCourses);
        return;
    }

    // Fetch if outdated or missing
    console.log("Fetching courses from Firebase...");
    const courses = await fetchAllCourses();
    model.setCourses(courses);
    saveCoursesInChunks(courses, firebaseTimestamp);
}

function saveCoursesInChunks(courses, timestamp) {
    const parts = 3; // Adjust this based on course size
    const chunkSize = Math.ceil(courses.length / parts);

    for (let i = 0; i < parts; i++) {
        const chunk = courses.slice(i * chunkSize, (i + 1) * chunkSize);
        localStorage.setItem(`coursesPart${i}`, JSON.stringify(chunk));
    }
    localStorage.setItem("coursesMetadata", JSON.stringify({ parts, timestamp }));
}

async function updateLastUpdatedTimestamp() {
    const timestampRef = ref(db, "metadata/lastUpdated");
    await set(timestampRef, Date.now());
}

async function fetchLastUpdatedTimestamp() {
    const timestampRef = ref(db, "metadata/lastUpdated");
    const snapshot = await get(timestampRef);
    return snapshot.exists() ? snapshot.val() : 0;
}

export function connectToFirebase(model) {
    onAuthStateChanged(auth, (user) => {
      model.setUser(user);
    });
    firebaseToModel(model);
}

export async function addCourse(course){
    if(!course?.code)
        return;
    const myRef = ref(db, `courses/${course.code}`);
    await set(myRef, course);
    updateLastUpdatedTimestamp();
}

export async function fetchAllCourses() {
    const myRef = ref(db, `courses`);
    const snapshot = await get(myRef);

    if (!snapshot.exists()) return [];

    const value = snapshot.val(); // Firebase returns an object where keys are course IDs
    const courses = [];

    for (const id of Object.keys(value)) {
        courses.push({ id, ...value[id] });
    }

    return courses;
}

// Before: [ {courseCode: "CS101", name: "Intro to CS"}, {...} ]
// After: { "CS101": { name: "Intro to CS" }, "CS102": {...} }


export async function fetchCoursesSnapshot() {
    const myRef = ref(db, `courses`);
    const snapshot = await get(myRef);
    if (!snapshot.exists()) return {};  // Return empty object instead of array

    return snapshot.val();  // Return the object directly
}

export async function saveJSONCoursesToFirebase(model, data){
    if(!data || !model){
        console.log("no model or data")
        return;
    }
    const entries = Object.entries(data);
    entries.forEach(entry => {
        const course = {
            code : entry[1].code ,
            name: entry[1]?.name ?? "",
            location: entry[1]?.location ?? "",
            department: entry[1]?.department ?? "",
            language: entry[1]?.language ?? "",
            description: entry[1]?.description ?? "",
            academicLevel: entry[1]?.academic_level ?? "",
            period: entry[1]?.period ?? "",
            credits: entry[1]?.credits ?? 0,
            //lectureCount:entry[1].courseLectureCount,
            //prerequisites:entry.coursePrerequisites
            }
            model.addCourse(course);
            
    });
}

