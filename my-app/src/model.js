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
    filteredCourses: [],
     // ✅ NEW: holds filter settings in a flat format for URL sharing
     activeFilters: {},

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
        //applyDepartmentFilter:false,
    },
    
    setFiltersChange() { this.filtersChange = true; },

    // 🟣 Update internal filters
    updateLevelFilter(level) { this.filterOptions.level = level; },
    updateLanguageFilter(lang) { this.filterOptions.language = lang; },
    updateLocationFilter(loc) { this.filterOptions.location = loc; },
    updateCreditsFilter([min, max]) {
        this.filterOptions.creditMin = min;
        this.filterOptions.creditMax = max;
    },
    updateTranscriptElegibilityFilter(val) { this.filterOptions.eligibility = val; },

    setApplyTranscriptFilter(state) { this.filterOptions.applyTranscriptFilter = state; },
    setApplyLevelFilter(state) { this.filterOptions.applyLevelFilter = state; },
    setApplyLanguageFilter(state) { this.filterOptions.applyLanguageFilter = state; },
    setApplyLocationFilter(state) { this.filterOptions.applyLocationFilter = state; },
    setApplyCreditsFilter(state) { this.filterOptions.applyCreditsFilter = state; },

    // ✅ NEW: Called by presenters when user changes a filter
    updateFilter(name, value) {
        this.activeFilters[name] = value;
    },

    // ✅ NEW: Called when loading from a shared filter URL
    setFiltersFromObject(obj) {
        this.activeFilters = { ...obj };

        if (obj.language) this.updateLanguageFilter(obj.language);
        if (obj.level) this.updateLevelFilter([obj.level]);
        if (obj.location) this.updateLocationFilter([obj.location]);
        if (obj.creditMin && obj.creditMax) {
            this.updateCreditsFilter([
                parseFloat(obj.creditMin),
                parseFloat(obj.creditMax)
            ]);
        }
        if (obj.location) {
            this.updateLocationFilter([obj.location]); // use .split(',') if supporting multiple
        }
        
        if (obj.transcript) this.updateTranscriptElegibilityFilter(obj.transcript);

        this.setApplyLanguageFilter(true);
        this.setApplyLevelFilter(true);
        this.setApplyLocationFilter(true);
        this.setApplyCreditsFilter(true);
        this.setApplyTranscriptFilter(true);
    },
    getActiveFiltersFromOptions() {
        const af = {};
        const fo = this.filterOptions;
        
    
        if (fo.applyLanguageFilter && fo.language !== "none") {
            af.language = fo.language;
        }
    
        if (fo.applyLevelFilter && fo.level.length > 0) {
            af.level = fo.level[0]; // or join if you support multiple
        }
    
        if (fo.applyLocationFilter && fo.location.length > 0) {
            af.location = fo.location[0]; // or join
        }
    
        if (fo.applyCreditsFilter) {
            af.creditMin = fo.creditMin.toString();
            af.creditMax = fo.creditMax.toString();
        }
    
        if (fo.applyTranscriptFilter) {
            af.transcript = fo.eligibility;
        }
    
        return af;
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
   
    applyFilters() {
        const fo = this.filterOptions;
    
        this.filteredCourses = this.courses.filter(course => {
            // Language
            if (fo.applyLanguageFilter && fo.language !== "none") {
                const cl = course.language; // TODO to lower case
                if (fo.language === "english" && cl !== "english") return false;
                if (fo.language === "swedish" && cl !== "swedish") return false;
                if (fo.language === "both" && !(cl === "english" || cl === "swedish")) return false;
            }
    
            // Level
            if (fo.applyLevelFilter && fo.level.length > 0) {
                if (!fo.level.includes(course.academicLevel)) return false;
            }
    
            // Location
            if (fo.applyLocationFilter && fo.location.length > 0) {
                if (!fo.location.includes(course.location)) return false;
            }
    
            // Credits
            if (fo.applyCreditsFilter) {
                const c = parseFloat(course.credits);
                if (c < fo.creditMin || c > fo.creditMax) return false;
            }
    
            // Transcript eligibility (if you ever want to use it for filtering directly)
            // Can be added here if needed
    
            return true;
        });
    
        this.setFiltersChange(); // Let the UI know filtering occurred
    }
    
   



};
