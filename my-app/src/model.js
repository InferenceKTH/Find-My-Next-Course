import { addCourse, addReviewForCourse, getReviewsForCourse } from "../firebase";


export const model = {
    user: undefined,
    //add searchChange: false,   //this is for reworking the searchbar presenter, so that it triggers as a model, 
    //instead of passing searchcouses lambda function down into the searchbarview.
    currentSearch: [],
    courses: [],
    favourites: [],
    isReady: false,
    filtersChange: false,
    filtersCalculated: false,
    filteredCourses: [],
    filterOptions: {
        applyTranscriptFilter: true,
        eligibility: "weak",  //the possible values for the string are: "weak"/"moderate"/"strong"
        applyLevelFilter: true,
        level: [], //the possible values for the array are: "PREPARATORY", "BASIC", "ADVANCED", "RESEARCH"
        applyLanguageFilter: true,
        language: "none", //the possible values for the string are: "none"/"english"/"swedish"/"both"
        applyLocationFilter:true,
        location: [], //the possible values for the array are: 'KTH Campus', 'KTH Kista', 'AlbaNova', 'KTH Flemingsberg', 'KTH Solna', 'KTH Södertälje', 'Handelshögskolan', 'KI Solna', 'Stockholms universitet', 'KONSTFACK'
        applyCreditsFilter:true,
        creditMin: 0,
        creditMax: 45,
        applyDepartmentFilter:false,
        department: []
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
    //for filters

    setFiltersChange() {
        this.filtersChange = true;
    },

    setFiltersCalculated() {
        this.filtersCalculated = true;
    },
    
    updateLevelFilter(level) {
        this.filterOptions.level = level;
    },
    updateLanguageFilter(languages) {
        this.filterOptions.language = languages;
    },
    updateLocationFilter(location) {
        this.filterOptions.location = location;
    },
    updateCreditsFilter(creditLimits) {
        this.filterOptions.creditMin = creditLimits[0];
        this.filterOptions.creditMax = creditLimits[1];
    },
    updateTranscriptElegibilityFilter(eligibility) {
        this.filterOptions.eligibility = eligibility;
    },

    //setters for the filter options
    setApplyTranscriptFilter(transcriptFilterState) {
        this.filterOptions.applyTranscriptFilter = transcriptFilterState;
    },
    setApplyLevelFilter(levelFilterState) {
        this.filterOptions.applyLevelFilter = levelFilterState;
    },
    setApplyLanguageFilter(languageFilterState) {
        this.filterOptions.applyLanguageFilter = languageFilterState;
    },
    setApplyLocationFilter(locationFilterState) {
        this.filterOptions.applyLocationFilter = locationFilterState;
    },
    setApplyCreditsFilter(creditsFilterState) {
        this.filterOptions.applyCreditsFilter = creditsFilterState;
    },
    // setApplyDepartmentFilter(departmentFilterState) {
    //     this.filterOptions.applyDepartmentFilter = departmentFilterState;
    // },



};
