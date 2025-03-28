// This model is representing our program logic. 
// A certain model is bound to a specific session. 

import { addCourse } from "../firebase";
import { fetchCourses } from "../firebase";

export const model = {
    user: undefined,
    currentCourse: undefined,
    currentSearch: {},
    courses: {}, // should this be array instead? courses: [],

    // sets the current user
    setUser(user) {
        if (!user) user = null;
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


    // function to populate the database 
    // populateDatabase(){

    // },
    async populateDatabase() {
        try {
            const coursesData = await fetchCourses();
            this.setCourses(coursesData);
        } catch (error) {
            console.error("Error populating database:", error);
        }
    },



    // add a singular course
    // addCourse(course){
    //     this.courses = [...this.courses, course] // update local copy
    //     addCourse(course); // update firebase
    // },

    async addCourse(course) {
        try {
            await addCourse(course); 
            this.courses[course.courseCode] = course;  // Update local copy (object)
            console.log("Course added successfully.");
        } catch (error) {
            console.error("Error adding course:", error);
        }
    },



    // gets a single course
    // getCourse(courseID){
    //     return courses[courseID]; //? 
    // },
    getCourse(courseID) {
        return this.courses[courseID];  // Corrected access
    },



    // get courses, but appy a filter
    getCoursesForFilter(filter){

    },
    // get the prerequisite for a certain courses (returns course ids?)
    getPrerequisiteForCourse(course){

    }, // etc.
}


