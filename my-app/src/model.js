import { addCourse } from "../firebase";
import { DateTime } from "luxon"; //reviews
import { generateUsername, generateAvatar } from './utils';// reviews

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
};


// for reviews

export class Comment {
  constructor({ id = null, username = generateUsername(), avatar = generateAvatar(), commentDate = DateTime.now(), commentText, upvotes = 0, parentCommentId = null } = {}) {
    this.id = id;
    this.username = username;
    this.avatar = avatar;
    this.commentDate = commentDate;
    this.commentText = commentText;
    this.upvotes = upvotes;
    this.parentCommentId = parentCommentId;
  }
}

export const getChildComments = (comment, comments) => {
  return comments.filter(c => c.parentCommentId === comment.id);
}
