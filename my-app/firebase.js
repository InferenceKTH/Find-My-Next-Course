import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { get, getDatabase, ref, set, serverTimestamp } from "firebase/database";

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
// export const googleProvider = new GoogleAuthProvider();
// googleProvider.addScope("profile");
// googleProvider.addScope("email");

// fetches all relevant information to create the model
async function firebaseToModel(model) {
    const courses = await fetchAllCourses();
    model.setCourses(courses);
}

export function connectToFirebase(model) {
    // onAuthStateChanged(auth, (user) => {
    //  model.setUser(user);
    // }); !can be used for auth! 

    firebaseToModel(model);
}

export async function addCourse(course){
    if(!course?.code)
        return;
    const myRef = ref(db, `courses/${course.code}`);
    await set(myRef, course);
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

