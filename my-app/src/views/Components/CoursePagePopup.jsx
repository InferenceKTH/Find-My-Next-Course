import React from 'react';

function CoursePagePopup({ isOpen, onClose, course, prerequisiteTree }) {
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
          <div className="px-10 py-10 md:px-20 md:py-16 text-slate-900 space-y-12 font-sans">
            {/* Course Title Section */}
            <div>
              <h2 className="text-5xl font-extrabold text-[#2e2e4f]">
                {course.code} - {course.name}
                <span className="ml-4 text-lg text-violet-900">({course.credits} Credits)</span> {/* Display Credits */}
              </h2>
            </div>
            <div>
              <button
                className="text-yellow-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // prevent popup from opening
                  PaymentResponse.handleFavouriteClick(course.code);
                }}
              >
                {/* {model.favouriteCourses.includes(course.code)
                        ? 'Remove from Favourites'
                        : 'Add to Favourites'} */}
              </button>
            </div>

            {/* Description Section */}
            <div>
              <h3 className="text-2xl font-bold text-[#3d3d68] mb-4">Course Description</h3>
              <div
                className="text-lg leading-8 text-[#2c2c2c] tracking-wide prose prose-slate max-w-full"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </div>

            {/* Prerequisite Graph Tree Section */}
            <div>
              <h3 className="text-2xl font-semibold text-[#2e2e4f]">Prerequisite Graph Tree</h3>
              <p className="text-lg text-slate-700 leading-7">Graph tree or prerequisite info will go here...</p>
            </div>
            {/* Reviews Section */}
            <div>
              <h3 className="text-2xl font-semibold text-[#2e2e4f]">Reviews</h3>
              <p className="text-lg text-slate-700 leading-7">Here would be some reviews of the course...</p>
            </div>

            {/* Prerequisite Graph Tree Section */}
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'Courier New, monospace', fontSize: '24px' }}>Prerequisite Graph Tree</h3>
              {/* Placeholder for graph tree */}
              {prerequisiteTree}
            </div>
          </div>
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
