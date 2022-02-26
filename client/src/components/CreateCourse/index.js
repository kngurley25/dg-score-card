import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_COURSE } from "../../utils/mutations";
import { useNavigate, Link } from "react-router-dom";

const CourseForm = () => {
  const [formState, setFormState] = useState({
    courseName: "",
    location: "",
    holeCount: "",
    isSubmitted: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const [createCourse, { error }] = useMutation(CREATE_COURSE);
  // update state based on form input changes

  const handleChange = (e) => {
    if (!e.target.value.length) {
      setErrorMessage(`All entry fields required.`);
    } else {
      setErrorMessage("");
    }
    if (!errorMessage) {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setFormState({ ...formState, isSubmitted: true });

    // use try/catch instead of promises to handle errors
    try {
      // execute createCourse mutation and pass in variable data from form
      const { data } = await createCourse({
        // variables: { ...formState },
        variables: {
          courseName: formState.courseName,
          location: formState.location,
          holeCount: parseInt(formState.holeCount)
        }
      });
      navigate("/addhole", { state: { ...formState } });
      console.log("createCourse", data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
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
          type="text"
          className="form-input col-10 offset-1"
          onBlur={handleChange}
          onChange={handleChange}
        ></textarea>

        <textarea
          placeholder="Course Location"
          value={formState.location}
          className="form-input col-6 offset-1"
          name="location"
          type="text"
          onBlur={handleChange}
          onChange={handleChange}
        ></textarea>

        <textarea
          placeholder="Hole Count"
          value={formState.holeCount}
          name="holeCount"
          type="number"
          pattern="[0-9]*"
          className="form-input col-4"
          onBlur={handleChange}
          onChange={handleChange}
        ></textarea>
        {errorMessage && (
          <div
            className="alert alert-danger animate__animated animate__shakeX"
            role="alert"
          >
            {errorMessage}
          </div>
        )}
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
