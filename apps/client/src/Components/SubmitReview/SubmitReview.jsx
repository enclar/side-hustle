import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../App";
import "./SubmitReview.css";

const SubmitReview = () => {
    // setting up variables
    const ratings = ["1", "2", "3", "4", "5"];

    // setting up context
    const { state, setState } = useContext(DataContext);
    const reviewing = state.currReviewing;

    // setting up navigate
    const navigate = useNavigate();

    // setting up state
    const poster = JSON.parse(localStorage.getItem("currUser"));

    const [review, setReview] = useState({
        postedBy: poster._id,
        postedFor: reviewing.acceptedBy._id,
        job: reviewing._id,
        message: "",
        rating: 0
    });

    // function to detect change
    const handleChange = (event) => {
        setReview({...review, message: event.target.value});
    };

    return (
        <div id="review-page">
            <img src="https://storage.googleapis.com/gd-wagtail-prod-assets/original_images/design_reviews_going_beyond_the_surface_2x1.jpg" />
            <h1>LEAVE A REVIEW</h1>
            <p>
                We're glad you found someone suitable for the job! <br />
                Let them know how they did so that they'll do even better next time!
                <br />
                <br />
                Your review will be displayed on their public profile. <br />
                Please only leave a review if the job has been completed.
            </p>

            <form id="review-form">
                <div id="review-info">
                    <p>
                        <span>Currently Reviewing: </span>
                        {reviewing?.acceptedBy?.username.toUpperCase()}
                    </p>
                    <p>
                        <span>Job Done: </span>
                        {reviewing?.jobTitle.toUpperCase()}
                    </p>
                </div>
                <section>
                    <p>RATING:</p>
                    <div id="score-options">
                        {
                            ratings.map((rating, index) => {
                                return (
                                    <label key={index} className="score" for={rating}>
                                        <input type="radio" name="rating" value={rating} />
                                        {rating}
                                    </label>
                                )
                            })
                        }
                    </div>
                </section>
                <section>
                        <p>COMMENTS/FEEDBACK:</p>
                        <textarea
                            name="message"
                            value={review.message}
                            onChange={handleChange}
                        ></textarea>
                </section>
                <button>SUBMIT REVIEW</button>
            </form>
            <button onClick={() => navigate("/user/postedjobs")}>BACK TO JOBS</button>
        </div>
    );
};

export default SubmitReview;