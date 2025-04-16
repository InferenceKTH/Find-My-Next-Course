import { addCourse, addReviewForCourse, getReviewsForCourse } from "../firebase";


export const model = {
    user: undefined,
    currentSearch: [],
    currentSearchText: "",
    scrollPosition: 0,
    courses: [],
    favourites: [],

    setUser(user) {
        if (!this.user)
            this.user = user;
    },

    setCurrentSearch(searchResults){
        this.currentSearch = searchResults;
    },

    setCurrentSearchText(text){
        this.currentSearchText = text;
    },
    
    setScrollPosition(position) {
        this.scrollPosition = position; // This method updates the scroll position
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
                name: entry[1]?.name ?? "",
                location: entry[1]?.location ?? "",
                department: entry[1]?.department ?? "",
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
