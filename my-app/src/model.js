import { addCourse } from "../firebase";

export const model = {
    user: undefined,
    currentSearch: [],
    courses: [],
    favourites: [],
    isReady: false,
    filtersChange: false,
    filteredCourses: [],
    filterOptions: {
        applyTranscriptFilter: false,
        applyLevelFilter:false,
        level: [], //the possible values for the array are: "PREPARATORY", "BASIC", "ADVANCED", "RESEARCH"
        applyLanguageFilter: false,
        language: [], //the possible values for the array are: "none"/"english"/"swedish"/"both"
        applyLocationFilter:false,
        location: [], //the possible values for the array are: 'KTH Campus', 'KTH Kista', 'AlbaNova', 'KTH Flemingsberg', 'KTH Solna', 'KTH Södertälje', 'Handelshögskolan', 'KI Solna', 'Stockholms universitet', 'KONSTFACK'
        applyCreditsFilter:false,
        creditMin: 0,
        creditMax: 45,
        //applyDepartmentFilter:false,
    },

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

    updateFilter(filters) {
        this.filterOptions.creditMax = filters.creditMax;
        this.filterOptions.creditMin = filters.creditMin;
    },

    updateLanguage(languages) {
        this.filterOptions.language = languages;
    },
    updateLevel(level) {
        this.filterOptions.level = level;
    },
    updateLocation(location) {
        this.filterOptions.location = location;
    }

};
