import { addCourse } from "../firebase";

export const model = {
    user: undefined,
    currentCourse: undefined,
    currentSearch: [],
    courses: [],
    favourites: [],
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
    setCurrentSearch(searchResults){
        this.currentSearch = searchResults;
    },

    // sets the course array - for example after loading all courses from the DB
    setCourses(courses){
        this.courses = courses;
    },

    // add a single course
    async addCourse(course) {
        try {
            await addCourse(course);
            this.courses = [...this.courses, course];
        } catch (error) {
            console.error("Error adding course:", error);
        }
    },

    addFavourite(course) {
        this.favourites = [...this.favourites, course];
    },

    removeFavourite(course) {
        this.favourites = (this.favourites || []).filter(fav => fav.code !== course.code);
    },

    getCourse(courseID) {
        return this.courses.find(course => course.code === courseID);
    },

        if (!data || !this) {
            conso
                code: entry[1].code,
                name: entry[1]?.name ?? tment: entry[1]?.department ?? "",
                language: entry[1]?.language ?? "",
                description: entry[1]?.description ?? "",
                academicLevel: entry[1]?.academic_level ?? "",
                period: entry[1]?.period ?? "",
                credits: entry[1]?.credits ?? 0,
                prerequisites: entry[1]?.prerequisites ?? "",
            };
            this.addCourse(course);
        });
    },

    searchCourses(query) {
        const searchResults = this.courses.filter(course =>
            course.code.toLowerCase() === query.toLowerCase() ||
            course.name.toLowerCase().includes(query.toLowerCase()) ||
            course.description.toLowerCase().includes(query.toLowerCase())
        );
        this.setCurrentSearch(searchResults);
    }
};