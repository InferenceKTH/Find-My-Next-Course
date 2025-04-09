import React from 'react';
import CourseView from '../CourseView'; 

function CoursePagePopup({ isOpen, onClose, course }) {
  if (!isOpen || !course) return null; // Don't render if not open or course not selected

  return (
    <div
      className="fixed backdrop-blur-sm inset-0 bg-transparent flex justify-end z-50"
      onClick={onClose}
    >
      <div
        className="bg-indigo-400/70 backdrop-blur-sm h-full w-3/4 flex flex-col overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1">
          <CourseView course={course} />
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-violet-500 text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CoursePagePopup;
