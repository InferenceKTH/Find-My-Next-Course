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
            />
            <TextInputView
                label="Course Name"
                value={courseName}
                onTextChanged={e => setCourseName(e.target.value)}
            />
            <TextInputView
                label="Course Location"
                value={courseLocation}
                onTextChanged={e => setCourseLocation(e.target.value)}
            />
            <TextInputView
                label="Course Department"
                value={courseDepartment}
                onTextChanged={e => setCourseDepartment(e.target.value)}
            />
            <TextInputView
                label="Course Language"
                value={courseLanguage}
                onTextChanged={e => setCourseLanguage(e.target.value)}
            />
            <TextInputView
                label="Course Description"
                value={courseDescription}
                onTextChanged={e => setCourseDescription(e.target.value)}
            />
            <TextInputView
                label="Course Professors"
                value={courseProfessors}
                onTextChanged={e => setCourseProfessors(e.target.value)}
            />
            <TextInputView
                label="Course Academic Level"
                value={courseAcademicLevel}
                onTextChanged={e => setCourseAcademicLevel(e.target.value)}
            />
            <TextInputView
                label="Course Lecture Count"
                value={courseLectureCount}
                onTextChanged={e => setCourseLectureCount(e.target.value)}
            />
            <TextInputView
                label="Course Period of Delivery"
                value={coursePeriodOfDelivery}
                onTextChanged={e => setCoursePeriodOfDelivery(e.target.value)}
            />
            <TextInputView
                label="Course Credits"
                value={courseCredits}
                onTextChanged={e => setCourseCredits(e.target.value)}
            />
            <TextInputView
                label="Course Prerequisites"
                value={coursePrerequisites}
                onTextChanged={e => setCoursePrerequisites(e.target.value)}
            />

            <button className="btn btn-primary" onClick={onSubmit}>Submit</button>
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
        const course = {courseCode : "some code here", 
                        // data : "A course"
                        courseName: "name",
                        courseLocation:"location",
                        courseDepartment:"some department",
                        courseLanguage:"language",
                        courseDescription:"lorem ipsum",
                        courseProfessors:"professors here",
                        courseAcademicLevel:"level",
                        courseLectureCount:"count",
                        coursePeriodOfDelivery:"period 2",
                        courseCredits:"credits num",
                        coursePrerequisites:"p1,p2,pre3, etc",
            
            };
        model.addCourse(course);
    }

});


