import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Filter settings – just change these values!
const targetDepartment = 'EECS/Decision and Control Systems'; // Set to null if not filtering by department
const minCredits = null; // Set to null if not filtering by credits
const maxCredits = 5;    // Set to null if not filtering by credits

// File loading
const folderPath = path.join(__dirname);
const filePrefix = 'all_courses_data';
let allCoursesMerged = [];

// Read all matching course JSON files
fs.readdirSync(folderPath).forEach(file => {
    if (file.startsWith(filePrefix) && file.endsWith('.json')) {
        const fullPath = path.join(folderPath, file);
        try {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const data = JSON.parse(content);
            allCoursesMerged.push(...Object.values(data));
        } catch (err) {
            console.warn(`Skipping ${file}: ${err.message}`);
        }
    }
});

// Apply filters
let filtered = allCoursesMerged;

if (targetDepartment) {
    filtered = filtered.filter(course =>
        course.department?.trim().toLowerCase() === targetDepartment.trim().toLowerCase()
    );
}

if (minCredits !== null) {
    filtered = filtered.filter(course =>
        typeof course.credits === 'number' && course.credits >= minCredits
    );
}

if (maxCredits !== null) {
    filtered = filtered.filter(course =>
        typeof course.credits === 'number' && course.credits <= maxCredits
    );
}

// Deduplicate by course code
const seen = new Set();
const deduplicated = filtered.filter(course => {
    if (seen.has(course.code)) return false;
    seen.add(course.code);
    return true;
});

// Output header
console.log(
    `\nCourses` +
    (targetDepartment ? ` from "${targetDepartment}"` : '') +
    (minCredits !== null ? ` with credits ≥ ${minCredits}` : '') +
    (maxCredits !== null ? ` and ≤ ${maxCredits}` : '') +
    `:\n`
);

// Output results
if (deduplicated.length === 0) {
    console.log("No matching courses found.");
} else {
    for (const course of deduplicated) {
        console.log("-------------");
        console.log("Code:        ", course.code);
        console.log("Name:        ", course.name);
        console.log("Department:  ", course.department);
        console.log("Level:       ", course.academic_level || "N/A");
        console.log("Credits:     ", course.credits ?? "N/A");
        console.log("Grading:     ", course.grading ?? "N/A");
        console.log("Language EN: ", course.language?.english ?? "N/A");
        console.log("Periods:     ", JSON.stringify(course.periods));
        console.log("URL:         ", course.kth_page_url);
        console.log("Description: ", course.description?.replace(/<[^>]*>/g, '').slice(0, 200) || "N/A");
    }
}
