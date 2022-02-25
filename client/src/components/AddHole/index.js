import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { QUERY_COURSE } from "../../utils/queries";
import { ADD_HOLE } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useLocation } from "react-router-dom";

const AddHole = () => {
  // //use state from CreateCourse to get courseName and holeCount
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);

  const { id: courseId } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <section>
      <h2 className="heading d-flex justify-content-center">
        {location && location.state && location.state.courseName}
        <div className="sub-heading d-flex justify-content-center">
          Hole Count: {location && location.state && location.state.holeCount}
        </div>
      </h2>
      <form>
        <h3 className="sub-heading d-flex justify-content-center">
          Enter Pars:
        </h3>
        <div className="form-group row m-4 p-4">
          <label
            htmlFor="par1"
            className="hole-form col col-form-label m-4 p-4"
          >
            Hole #1
          </label>
          <div className="col">
            <input
              type="par"
              className="form-control hole-form m-4 p-4"
              id="par1"
              placeholder="Par"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary d-flex justify-content-center m-4"
            type="submit"
            onSubmit={() => {}}
          >
            Next Hole!
          </button>
        </div>

        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary d-flex justify-content-center m-4"
            type="submit"
            onSubmit={handleFormSubmit}
          >
            Add Course!
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddHole;
