import React, {useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COURSE } from '../../utils/mutations';
import { QUERY_COURSES, QUERY_ME } from '../../utils/queries';

const CourseForm = () => {
    const [addCourse, { error }] = useMutation(ADD_COURSE, {
      update(cache, { data: { addCourse } }) {
        try {
          // could potentially not exist yet, so wrap in a try...catch
          const { courses } = cache.readQuery({ query: QUERY_COURSES});
          cache.writeQuery({
            query: QUERY_COURSES,
            data: { courses: [addCourse, ...courses] }
          });
        } catch (e) {
          console.error(e);
        }
    
        // update me object's cache, appending new thought to the end of the array
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, courses: [...me.courses, addCourse] } }
        });
      }
    });
  
    const [{courseName, location, holes}, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
  
  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };
  
  const handleFormSubmit = async event => {
    event.preventDefault();
  
    try {
      // add thought to database
      await addCourse({
        variables: { courseName, location, holes }
      });
  
      // clear form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };
  
    return (
    <div className="">
      <div className="d-flex justify-content-center">
    <p className={` ${characterCount === 280 || error ? 'text-error' : 'too many letters'}`}>
    <h1>Create a new course:</h1>
    {error && <span className="ml-2">Something went wrong...</span>}
    </p>
    </div>
    <div className="d-flex justify-content-center">
    <form
    className="col-12 col-md-6 justify-content-center"
    onSubmit={handleFormSubmit}
  >

        <textarea
    placeholder="Course Name"
    value={courseName}
    className="form-input col-9 col-md-9 col-sd-9"
    onChange={handleChange}
  ></textarea>

          <textarea
    placeholder="Course Location"
    value={location}
    className="form-input col-6 col-md-6 col-sd-3"
    onChange={handleChange}
  ></textarea>

  <textarea
    placeholder="Number of holes"
    value={holes}
    className="form-input col-3 col-md-3 col-sd-3"
    onChange={handleChange}
  ></textarea>

  <div className="d-flex justify-content-center">
          <button className="btn btn-primary d-flex justify-content-center" type="submit">
            Submit
          </button>
          </div>
        </form>
        </div>
    </div>
    );
  };
  
  export default CourseForm;
