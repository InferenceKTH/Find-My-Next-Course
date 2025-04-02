import { observer } from "mobx-react-lite";
import { useState } from "react";
import { TextInputView } from "../views/TextInputView";

// A dummy presenter, which adds the course supplied in the text field to the db.
export const AddToDB = observer(function AddToDB({ model }) {


    // const [text, setText] = useState("");
    // return <TextInputView text={text} onTextChanged={onTextChanged} onSubmit={onSubmit}/>;


    const [courseCode, setCourseCode] = useState("");
    const [courseName, setCourseName] = useState("");
    const [courseLocation, setCourseLocation] = useState("");
    const [courseDepartment, setCourseDepartment] = useState("");
    const [courseLanguage, setCourseLanguage] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseProfessors, setCourseProfessors] = useState("");
    const [courseAcademicLevel, setCourseAcademicLevel] = useState("");
    const [courseLectureCount, setCourseLectureCount] = useState("");
    const [coursePeriodOfDelivery, setCoursePeriodOfDelivery] = useState("");
    const [courseCredits, setCourseCredits] = useState("");
    const [coursePrerequisites, setCoursePrerequisites] = useState("");

    return (
        <>
            {/* Render input fields for each state */}
            <TextInputView
                label="Course Code"
                value={courseCode}
                onTextChanged={e => setCourseCode(e.target.value)}
                onSubmit={onSubmit}
            />
            <TextInputView
                label="Course Name"
                value={courseName}
                onTextChanged={e => setCourseName(e.target.value)}
                onSubmit={onSubmit}
            />
            <TextInputView
                label="Course Location"
                value={courseLocation}
                onTextChanged={e => setCourseLocation(e.target.value)}
                onSubmit={onSubmit}
            />
            <TextInputView
                label="Course Department"
                value={courseDepartment}
                onTextChanged={e => setCourseDepartment(e.target.value)}
                onSubmit={onSubmit}
            />
            <TextInputView
                label="Course Language"
                value={courseLanguage}
                onTextChanged={e => setCourseLanguage(e.target.value)}
                onSubmit={onSubmit}
            />
            <TextInputView
                label="Course Description"
                value={courseDescription}
                onTextChanged={e => setCourseDescription(e.target.value)}
                onSubmit={onSubmit}
            />
            <TextInputView
                label="Course Professors"
                value={courseProfessors}
                onTextChanged={e => setCourseProfessors(e.target.value)}
                onSubmit={onSubmit}
            />
            <TextInputView
                label="Course Academic Level"
                value={courseAcademicLevel}
                onTextChanged={e => setCourseAcademicLevel(e.target.value)}
                onSubmit={onSubmit}
            />
            <TextInputView
                label="Course Lecture Count"
                value={courseLectureCount}
                onTextChanged={e => setCourseLectureCount(e.target.value)}
                onSubmit={onSubmit}
            />
            <TextInputView
                label="Course Period of Delivery"
                value={coursePeriodOfDelivery}
                onTextChanged={e => setCoursePeriodOfDelivery(e.target.value)}
                onSubmit={onSubmit}
            />
            <TextInputView
                label="Course Credits"
                value={courseCredits}
                onTextChanged={e => setCourseCredits(e.target.value)}
                onSubmit={onSubmit}
            />
            <TextInputView
                label="Course Prerequisites"
                value={coursePrerequisites}
                onTextChanged={e => setCoursePrerequisites(e.target.value)}
                onSubmit={onSubmit}
            />
        </>
    );



    function onTextChanged(e){
        setText(e.target.value);
    }

    // function onSubmit(){
    //     const course = {courseCode : text, data : "A course"};
    //     model.addCourse(course);
    // }

    function onSubmit(){
        const course = {courseCode : courseCode, 
                        // data : "A course"
                        courseName: courseName,
                        courseLocation: courseLocation,
                        courseDepartment:courseDepartment,
                        courseLanguage:courseLanguage,
                        courseDescription:courseDescription,
                        courseProfessors:courseProfessors,
                        courseAcademicLevel:courseAcademicLevel,
                        courseLectureCount:courseLectureCount,
                        coursePeriodOfDelivery:coursePeriodOfDelivery,
                        courseCredits:courseCredits,
                        coursePrerequisites:coursePrerequisites,
            
            };
        model.addCourse(course);
    }

});


