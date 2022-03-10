import React, { useState } from "react";

const SearchCourses = () => {
    const [zip, setZip] = useState();

    const handleChange = (event) => {
        const { value } = event.target;

        setZip({ value })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const courseData = await fetch(`/weather`, {
            method: 'POST',
            body: JSON.stringify({
                zip
            }),
            headers: {
                'Content-Type': 'application/json' 
            }
        });
        if (courseData.ok) {
            console.log(courseData)
        } else {
            console.log(courseData.statusText);
        }
    }
      
    return (
      <div>
        <form onSubmit={handleFormSubmit}>
          <input value={zip} onChange={handleChange}></input>
          <button>Submit</button>
        </form>
      </div>
    );

}

export default SearchCourses;