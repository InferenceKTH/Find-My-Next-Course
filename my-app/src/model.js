import { addCourse, addReviewForCourse, getReviewsForCourse } from "../firebase"; // for reviews


export const model = {
    user: undefined,
    currentSearch: [],
    courses: [],
    favourites: [],

    setUser(user) {
        if (!this.user)
            this.user = user;
    },

    setCurrentSearch(searchResults){
        this.currentSearch = searchResults;
    },

    setCourses(courses){
        this.courses = courses;
    },

    async addCourse(course) {
        try {
            await addCourse(course);
            this.courses = [...this.courses, course];
        } catch (error) {
            console.error("Error adding course:", error);
        }
    },
    setFavourite(favorites){
        this.favourites = favorites;
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

    populateDatabase(data) {
        if (!data || !this) {
            console.log("no model or data");
            return;
        }
        const entries = Object.entries(data);
        entries.forEach(entry => {
            const course = {
                code: entry[1].code,
                name: entry[1]?.name ?? "null",
                location: entry[1]?.location ?? "null",
                department: entry[1]?.department ?? "null",
                language: entry[1]?.language ?? "null",
                description: entry[1]?.description ?? "null",
                academicLevel: entry[1]?.academic_level ?? "null",
                period: entry[1]?.period ?? "null",
                credits: entry[1]?.credits ?? 0,
                prerequisites: entry[1]?.prerequisites ?? "null",
                prerequisites_text: entry[1]?.prerequisites_text ?? "null",
                learning_outcomes: entry[1]?.learning_outcomes ?? "null"
            };
            this.addCourse(course);
        });
    },

    //for reviews
    async addReview(courseCode, review) {
        try {
            await addReviewForCourse(courseCode, review);

        } catch (error) {
            console.error("Error adding review:", error);
        }
    },
    
    async getReviews(courseCode) {
        try {
            return await getReviewsForCourse(courseCode);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            return [];
        }
    },
};
