// This model is representing our program logic. 
// A certain model is bound to a specific session. 

import { addCourse } from "../firebase";

export const model = {
    user: undefined,
    currentCourse: undefined,
    currentSearch: {},
    courses: [],
    isReady: false,

    // sets the current user
    setUser(user) {
        if (!this.user)
            this.user = user;
    },
    
    // sets the currently selected course (detail view?) - could be component state
    setCurrentCourse(course){
        this.currentCourse = course;
    },

    // keeps track of the current search / the associated promises.
    setCurrentSearch(search){
        this.currentSearch = search;
    },

    // sets the course array - for example after loading all courses from the DB
    setCourses(courses){
        this.courses = courses;
    },

    // add a single course
    // addCourse(course){
    //     this.courses = [...this.courses, course] // update local copy
    //     addCourse(course); // update firebase
    // },

    async addCourse(course) {
        try {
            await addCourse(course);
            this.courses = [...this.courses, course];
            console.log("Course added successfully.");
        } catch (error) {
            console.error("Error adding course:", error);
        }
    },

    getCourse(courseID) {
        return this.courses.find(course => course.code === courseID);
    },

    populateDatabase(data) {
        if (!data || !this) {
            console.log("no model or data");
            return;
        }
        const entries = Object.entries(data);
        entries.forEach(entry => {
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
            };
            this.addCourse(course);
        });
    }
}

