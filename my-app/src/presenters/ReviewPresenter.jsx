import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ReviewView } from '../views/ReviewView.jsx';


export const ReviewPresenter = observer(({ model, course }) => {
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
            const review = {
                userName: model.user?.name || "Anonymous",
                text: newReview,
                timestamp: Date.now(), //timestamp
            };
            await model.addReview(course.code, review);
            //fetch and update the reviews after submitting
            const updatedReviews = await model.getReviews(course.code);
            setReviews(updatedReviews);
            setNewReview(""); //clear text bar
        }
    };
    

    return (
        <ReviewView
            course={course}
            reviews={reviews}
            newReview={newReview}
            setNewReview={setNewReview}
            handleReviewSubmit={handleReviewSubmit}
        />
    );
});

