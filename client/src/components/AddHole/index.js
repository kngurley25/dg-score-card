import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router";
import { ADD_HOLE } from "../../utils/mutations";
import { useLocation } from "react-router-dom";
import { QUERY_ALL_COURSES } from "../../utils/queries";

//holeCount is total number of holes for the course
//holeNumber is a single hole in holeCount
//par is the par for the holeNumber

const AddHole = () => {
  const navigate = useNavigate();

  //information from the createCourse form is stored in [location]
  const location = useLocation();
  useEffect(() => {}, [location]);
  console.log(location);

  //need to get holeCount, courseName out of location

  //getcourseId from query
  const { data, loading } = useQuery(QUERY_ALL_COURSES);
  const courses = data?.courses || [];

  const matchingCourse = courses?.find(
    (course) => course.courseName === location.state.courseName
  );

  //set holeNumber to 1
  const [holeNumber, setHoleNumber] = useState(1);
  const [par, setPar] = useState(3);

  //mutation for addHole
  const [addHole, { error }] = useMutation(ADD_HOLE);

  const handleAddHole = (event) => {
    event.preventDefault();

    try {
      //add holes takes addHole(courseId: $courseId, holeNumber: $holeNumber, par: $par)
      addHole({
        variables: {
          courseId: matchingCourse?._id,
          holeNumber: holeNumber,
          par: parseInt(par),
        },
      });
      //if holeNumber
      if (holeNumber <= matchingCourse?.holeCount - 1) {
        setHoleNumber(holeNumber + 1);
        const par = document.getElementById("par").value
          ? document.getElementById("par").value
          : 3;
        setPar(par);
      } else {
        navigate(`/newround/${matchingCourse?._id}`);
      }
    } catch (e) {
      console.error(e);
    }
  };
    if (loading) {
      return (
        <div className='d-flex justify-content-center'>
          <h1 className='alt-heading animate__animated  animate__bounce'>
            Loading...
          </h1>
        </div>
      );
    }
  return (
    <section>
      <div className='card-heading'>
        <h2 className='alt-heading d-flex justify-content-center'>
          {location && location.state && location.state.courseName}
        </h2>
        <div>
          <h2 className='alt-sub-heading d-flex justify-content-center'>
            Holes: {location && location.state && location.state.holeCount}
          </h2>
          <h2 className=''>
            <label
              htmlFor='par1'
              className='alt-sub-heading d-flex justify-content-center'
            >
              Hole <p className='list-go'>#{holeNumber}</p>
            </label>
          </h2>
        </div>
      </div>
      <form>
        <h3 className='sub-heading d-flex justify-content-center'>
          Enter Pars:
        </h3>

        <div className='col d-flex justify-content-center'>
          <input
            type='text'
            required
            className='hole-form col col-form-label m-4 p-4'
            id='par'
            placeholder='Par'
            onChange={() => {}}
          />
        </div>

        <div className='d-flex justify-content-center'>
          <button
            className='button-go d-flex justify-content-center m-4'
            onClick={handleAddHole}
          >
            Next Hole!
          </button>
        </div>
      </form>
      {error && <div>Something went wrong...</div>}
    </section>
  );
};

export default AddHole;
