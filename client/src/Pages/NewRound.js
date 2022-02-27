import React, { useState } from "react";
import { QUERY_COURSE } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_ROUND } from "../utils/mutations";
import { useParams, useNavigate, Link } from "react-router-dom";

const NewRound = () => {
  const navigate = useNavigate();
  const { courseId: courseParam } = useParams();

  const { loading, data } = useQuery(QUERY_COURSE, {
    variables: { _id: courseParam },
  });
  const course = data?.course || {};
  const courseName = course.courseName;

  const [addRound, { error }] = useMutation(ADD_ROUND);

  const handleStartRound = async () => {
    try {
      const round = await addRound({
        variables: { courseName },
      });
      const roundId = round.data.addRound._id;
      navigate(`/score/${roundId}`);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!course?.courseName) {
    return (
      <h4 className="heading">
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  return (
    <main>
      <div className="heading d-flex flex-column align-items-center">
        <h5>Play a round at {course.courseName} ?</h5>

        <button onClick={handleStartRound} className="button">
          Start Round
        </button>
        {error && <div>Go back and login or signup</div>}

        <Link to="/viewcourses" style={{ textDecoration: "none" }}>
          <div className="d-flex justify-content-center">
            <button type="button" className="button justify-content-center">
              Go Back
            </button>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default NewRound;
