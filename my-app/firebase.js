import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { get, getDatabase, ref, set, onValue, push } from "firebase/database";
import { reaction, toJS } from "mobx";
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCBckVI9nhAP62u5jZJW3F4SLulUv7znis",
	authDomain: "findmynextcourse.firebaseapp.com",
	databaseURL:
		"https://findmynextcourse-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "findmynextcourse",
	storageBucket: "findmynextcourse.firebasestorage.app",
	messagingSenderId: "893484115963",
	appId: "1:893484115963:web:59ac087d280dec919ccd5e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");
let noUpload = false;

export function connectToFirebase(model) {
    loadCoursesFromCacheOrFirebase(model);
	onAuthStateChanged(auth, (user) => {
		if (user) {
			model.setUser(user); // Set the user ID once authenticated
			firebaseToModel(model);  // Set up listeners for user-specific data
			syncModelToFirebase(model);  // Start syncing changes to Firebase
			syncScrollPositionToFirebase(model);
		} else {
			model.setUser(null);  // If no user, clear user-specific data
		}
	});
}

// fetches all relevant information to create the model
async function firebaseToModel(model) {
	if (!model.user) 
        return;
	const userRef = ref(db, `users/${model.user.uid}`);
	onValue(userRef, (snapshot) => {
		if (!snapshot.exists()) 
            return;
		const data = snapshot.val();
		noUpload = true;
		if (data.favourites) 
            model.setFavourite(data.favourites);
		if(data.currentSearchText)
			model.setCurrentSearchText(data.currentSearchText);
		// if (data.currentSearch) 
        //     model.setCurrentSearch(data.currentSearch);
		noUpload = false;
	});
}


export function syncModelToFirebase(model) {
	reaction(
		() => ({
			userId: model?.user.uid,
			favourites: toJS(model.favourites),
			currentSearchText : toJS(model.currentSearchText),
			// currentSearch: toJS(model.currentSearch),
			// Add more per-user attributes here
		}),
		// eslint-disable-next-line no-unused-vars
		({ userId, favourites, currentSearchText }) => {
			if (noUpload || !userId) 
                return;
			const userRef = ref(db, `users/${userId}`);
			const dataToSync = {
				favourites,
				currentSearchText,
			};

			set(userRef, dataToSync)
				.then(() => console.log("User model synced to Firebase"))
				.catch(console.error);
		}
	);
}

function syncScrollPositionToFirebase(model) {
    reaction(
        () => ({
            // Here we calculate a percentage based on window.scrollY and total scrollable height.
            scrollPercentage: window.scrollY / document.documentElement.scrollHeight,
        }),
        ({ scrollPercentage }) => {
            if (model?.user?.uid) {
                const userRef = ref(db, `users/${model.user.uid}/scrollPosition`);
                set(userRef, { scrollPercentage })
                    .catch(console.error);
            }
        }
    );
}

export async function getScrollPositionFromFirebase(userId) {
    const scrollRef = ref(db, `users/${userId}/scrollPosition`);
    const snapshot = await get(scrollRef);
    if (snapshot.exists()) {
        return snapshot.val().scrollPercentage || 0;
    }
    return 0;
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

export async function addCourse(course) {
	if (!course?.code) return;
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

async function loadCoursesFromCacheOrFirebase(model) {
	// Load metadata from localStorage
	const cachedMetadata = JSON.parse(localStorage.getItem("coursesMetadata"));
	const firebaseTimestamp = await fetchLastUpdatedTimestamp();
	// check if up to date
	if (cachedMetadata && cachedMetadata.timestamp === firebaseTimestamp) {
		console.log("Using cached courses...");
		let mergedCourses = [];
		for (let i = 0; i < cachedMetadata.parts; i++) {
			const part = JSON.parse(localStorage.getItem(`coursesPart${i}`));
			if (part) mergedCourses = mergedCourses.concat(part);
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

export async function saveJSONCoursesToFirebase(model, data) {
	if (!data || !model) {
		console.log("no model or data");
		return;
	}
	const entries = Object.entries(data);
	entries.forEach((entry) => {
		const course = {
			code: entry[1].code,
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
		};
		model.addCourse(course);
	});
}


export async function addReviewForCourse(courseCode, review) {
    try {
        const reviewsRef = ref(db, `reviews/${courseCode}`);
        const newReviewRef = push(reviewsRef);
        await set(newReviewRef, review);
    } catch (error) {
        console.error("Error when adding a course to firebase:", error);
	}
}


export async function getReviewsForCourse(courseCode) {
    const reviewsRef = ref(db, `reviews/${courseCode}`);
    const snapshot = await get(reviewsRef);
    if (!snapshot.exists()) return [];

    const reviews = [];
    snapshot.forEach(childSnapshot => {
        reviews.push({
            id: childSnapshot.key,  // Firebase-generated unique key
            userName: childSnapshot.val().userName,
            text: childSnapshot.val().text
        });
    });
    return reviews;
}