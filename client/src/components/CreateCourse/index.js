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
    <div className="">
      <div className="d-flex justify-content-center">
  
    <h1>Create a new course:</h1> 
    </div>
    <div className="d-flex justify-content-center">
    <form
    className="col-12 col-md-6 justify-content-center"
    onSubmit={handleFormSubmit}
  >

        <textarea
    placeholder="Course Name"
    value={formState.courseName}
    name='courseName'
    type='courseName'
    className="form-input col-9 col-md-9 col-sd-9"
    onChange={handleChange}
  ></textarea>

          <textarea
    placeholder="Course Location"
    value={formState.location}
    className="form-input col-6 col-md-6 col-sd-3"
    name='location'
    type='location'
    onChange={handleChange}
  ></textarea>

  <textarea
    placeholder="# of holes"
    value={formState.holes}
    name='holes'
    type='holes'
    className="form-input col-3 col-md-3 col-sd-3"
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
    </div>
    
    );
  
  };
  
  export default CourseForm;
