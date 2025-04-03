import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// === FILTER SETTINGS (edit freely below) ===
const targetDepartment = "ITM/Learning in Engineering Sciences";
const minCredits = null;
const maxCredits = 15;

const languageFilter = {
    english: null, // true, false or null (no constraint)
    swedish: null
};

const periodFilter = { //as long as the p2 'true' matches, so the output will be counted even p1 is false
    P1: false,
    P2: true,
    P3: null,
    P4: null
};

const academicLevelFilter = null; // "BASIC", "ADVANCED", "RESEARCH"
const gradingFilter = null;       // "AF", "PF"
const locationFilter = null;      // e.g. "KTH Kista"

// === Utility: Remove courses with any null in periods or language ===
function isNullishCourse(course) {
    const periods = course.periods || {};
    const language = course.language || {};

    return (
        Object.values(periods).some(v => v === null) ||
        Object.values(language).some(v => v === null)
    );
}

// === Load and parse JSON data ===
const filePath = path.join(__dirname, 'all_courses_pruned.json');
let allCoursesMerged = [];

try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    allCoursesMerged = Object.values(data);
} catch (err) {
    console.error(`Failed to load all_courses_pruned.json: ${err.message}`);
}

// === Start filtering ===
let filtered = allCoursesMerged.filter(course => !isNullishCourse(course));

// Filter by department
if (targetDepartment) {
    filtered = filtered.filter(course =>
        course.department?.trim().toLowerCase() === targetDepartment.trim().toLowerCase()
    );
}

// Filter by credits
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

// Filter by academic level
if (academicLevelFilter !== null) {
    filtered = filtered.filter(course =>
        course.academic_level?.toUpperCase() === academicLevelFilter.toUpperCase()
    );
}

// Filter by grading scheme
if (gradingFilter !== null) {
    filtered = filtered.filter(course =>
        course.grading?.toUpperCase() === gradingFilter.toUpperCase()
    );
}

// Filter by location
if (locationFilter !== null) {
    filtered = filtered.filter(course =>
        course.location?.toLowerCase() === locationFilter.toLowerCase()
    );
}

// Filter by language
const languageConstraints = Object.entries(languageFilter).filter(([_, val]) => val !== null);
if (languageConstraints.length > 0) {
    filtered = filtered.filter(course => {
        const lang = course.language || {};
        return languageConstraints.some(([key, val]) => lang[key] === val);
    });
}

// Filter by period (improved logic)
const activePeriod = Object.entries(periodFilter).filter(([_, val]) => val === true);
filtered = filtered.filter(course => {
    const periods = course.periods || {};

    // If no specific periods are selected, skip filtering
    if (activePeriod.length === 0) return true;

    // Keep course if any desired period is present
    return activePeriod.some(([key]) => periods[key] === true);
});

// Deduplicate by course code
const seen = new Set();
const deduplicated = filtered.filter(course => {
    if (seen.has(course.code)) return false;
    seen.add(course.code);
    return true;
});

// Output result summary
console.log(
    `\nCourses` +
    (targetDepartment ? ` from "${targetDepartment}"` : '') +
    `\nLanguage filter: ${Object.entries(languageFilter).filter(([_, v]) => v !== null).map(([k, v]) => `${k}=${v}`).join(', ') || 'none'}` +
    `\nPeriod filter: ${Object.entries(periodFilter).filter(([_, v]) => v !== null).map(([k, v]) => `${k}=${v}`).join(', ') || 'none'}` +
    `\nLevel filter: ${academicLevelFilter || 'none'}` +
    `\nGrading filter: ${gradingFilter || 'none'}` +
    `\nLocation filter: ${locationFilter || 'none'}\n`
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
        console.log("Location:    ", course.location ?? "N/A");
        console.log("Language EN: ", course.language?.english ?? "N/A");
        console.log("Language SV: ", course.language?.swedish ?? "N/A");
        console.log("Periods:     ", JSON.stringify(course.periods));
        console.log("URL:         ", course.kth_page_url);
        const desc = course.description?.replace(/<[^>]*>/g, '') || "N/A";
        console.log("Description: ", desc.length > 300 ? desc.slice(0, 300) + "..." : desc);
    }
}
