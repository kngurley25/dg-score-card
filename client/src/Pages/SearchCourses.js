import React, { useState } from "react";

const SearchCourses = () => {
    const [zip, setZip] = useState(0);

    const handleChange = (event) => {
        const { value }  = event.target;
        console.log(value);

        setZip(value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:3001/weather`, {
            method: 'POST',
            body: JSON.stringify({
                searchzip: zip
            }),
            headers: {
                'Content-Type': 'application/json' 
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            const park0 = data[0];
            console.log(park0.name)
        } else {
            console.log(response.statusText);
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