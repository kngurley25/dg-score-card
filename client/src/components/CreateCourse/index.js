import React, {useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COURSE } from '../../utils/mutations';


const CourseForm = () => {
  const [formState, setFormState] = useState({ courseName: '', location: '', holes: '' });
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
    
    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await createCourse({
        variables: { ...formState }
      });

  
    } catch (e) {
      console.error(e);
    }
  };
  
    return (
   
    <div className="d-flex justify-content-center">
    <form
    className="course-form col-12 col-md-6"
    onSubmit={handleFormSubmit}
  >
    <h1 className="heading d-flex justify-content-center">New Course:</h1> 

        <textarea
    placeholder="Course Name"
    value={formState.courseName}
    name='courseName'
    type='courseName'
    className="form-input col-10 offset-1"
    onChange={handleChange}
  ></textarea>

          <textarea
    placeholder="Course Location"
    value={formState.location}
    className="form-input col-6 offset-1"
    name='location'
    type='location'
    onChange={handleChange}
  ></textarea>

  <textarea
    placeholder="# of holes"
    value={formState.holes}
    name='holes'
    type='holes'
    className="form-input col-4"
    onChange={handleChange}
  ></textarea>

  <div className="d-flex justify-content-center">
          <button className="btn btn-primary d-flex justify-content-center" type="submit">
            Submit
          </button>
          </div>
        </form>
        {error && <span className="ml-2">Something went wrong...</span>}
        </div>
    );
  
  };
  
  export default CourseForm;
