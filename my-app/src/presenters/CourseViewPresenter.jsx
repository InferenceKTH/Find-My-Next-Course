import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import CourseView from "../views/CourseView.jsx";

import { model } from "../model"; //for reviews



const CourseViewPresenter = observer(({ model, course }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");

    //fetch reviews when the course code changes
    useEffect(() => {
        async function fetchReviews() {
            const data = await model.getReviews(course.code);
            setReviews(data);
        }
        fetchReviews();
    }, [course.code, model]);

    
    const handleReviewSubmit = async () => {
        if (newReview.trim()) {
            await model.addReview(course.code, {
                userName: model.user?.name || "Anonymous",
                text: newReview,
                timestamp: Date.now(), //timestamp
            });
            //fetch and update the reviews after submitting
            const updatedReviews = await model.getReviews(course.code);
            setReviews(updatedReviews);
            setNewReview(""); //clear text bar
        }
    };
    

    return (
        <CourseView
            course={course}
            reviews={reviews}
            newReview={newReview}
            setNewReview={setNewReview}
            handleReviewSubmit={handleReviewSubmit}
        />
    );
});

export { CourseViewPresenter };

