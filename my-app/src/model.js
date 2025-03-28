// This model is representing our program logic. 
// A certain model is bound to a specific session. 

import { addCourse } from "../firebase";

export const model = {
	user: undefined,
	currentCourse: undefined,
	currentSearch: {},
	courses: [], // Initialize as an array

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
    populateDatabase(){

    },
    // add a singular course
    addCourse(course){
        this.courses = [...this.courses, course] // update local copy
        addCourse(course); // update firebase
    },
    // gets a single course
    getCourse(courseID){
        return courses[courseID]; //? 
    },
    // get courses, but appy a filter
    getCoursesForFilter(filter){

    },
    // get the prerequisite for a certain courses (returns course ids?)
    getPrerequisiteForCourse(course){

    }, // etc.
}

