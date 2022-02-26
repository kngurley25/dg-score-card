import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_COURSE } from "../../utils/mutations";
import { useNavigate, Link, useParams } from "react-router-dom";

const CourseForm = () => {
  const [formState, setFormState] = useState({
    courseName: "",
    location: "",
    holeCount: 18,
    isSubmitted: false,
  });

  const navigate = useNavigate();

  const [createCourse, { error }] = useMutation(CREATE_COURSE);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(formState);
    setFormState({ ...formState, isSubmitted: true });

    // use try/catch instead of promises to handle errors
    try {
      // execute createCourse mutation and pass in variable data from form
      const { data } = await createCourse({
        variables: { ...formState },
      });
      navigate("/addhole", { state: { ...formState } });
      console.log("createCourse", data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form className="course-form col-12 col-md-6">
        {error && (
          <div className="d-flex justify-content-center">
            Something went wrong...
          </div>
        )}
        <h1 className="heading d-flex justify-content-center">New Course:</h1>

        <textarea
          placeholder="Course Name"
          value={formState.courseName}
          name="courseName"
          type="courseName"
          className="form-input col-10 offset-1"
          onChange={handleChange}
        ></textarea>

        <textarea
          placeholder="Course Location"
          value={formState.location}
          className="form-input col-6 offset-1"
          name="location"
          type="location"
          onChange={handleChange}
        ></textarea>

        <textarea
          placeholder="# of holes"
          value={formState.holeCount}
          name="holeCount"
          type="holeCount"
          className="form-input col-4"
          onChange={handleChange}
        ></textarea>

        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary d-flex justify-content-center"
            onClick={handleFormSubmit}
          >
            Continue
          </button>
        </div>
        <Link to="/viewcourses">
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary d-flex justify-content-center"
            >
              Go Back
            </button>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default CourseForm;
