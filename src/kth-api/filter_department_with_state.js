// Fetch all courses and filter by department AND state
async function KTH_API_courses_from_department_and_state(departmentName, targetState) {
    try {
        const response = await fetch("https://api.kth.se/api/kopps/v2/courses");
        const data = await response.json();

        const filtered_courses = data.filter(course =>
            course.department?.trim().toLowerCase() === departmentName.trim().toLowerCase() &&
            course.state?.toLowerCase() === targetState.toLowerCase()
        );

        return filtered_courses;
    } catch (err) {
        console.error("Failed to fetch or filter courses:", err);
        return [];
    }
}

// Test function
async function test_department_and_state_filter() {
    const department = "SF (SCI/Matematik) ";
    const state = "CANCELLED"; //  or "ESTABLISHED"

    const courses = await KTH_API_courses_from_department_and_state(department, state);

    console.log(`Courses from department "${department}" with state "${state}":`);
    if (courses.length === 0) {
        console.log("No matching courses found.");
    }

    for (const course of courses) {
        console.log("-------------");
        console.log("Code: ", course.courseCode || course.code);
        console.log("Name: ", course.title || course.name);
        console.log("Department:", course.department);
        console.log("State: ", course.state);
    }
}

// Run the test
test_department_and_state_filter();
