import React, { useState } from "react";
import {
    MDBCard,
    MDBCardHeader,
    MDBListGroup,
    MDBListGroupItem,
  } from "mdb-react-ui-kit";
  import Auth from "../utils/auth";
  import { useNavigate } from "react-router-dom";
  import { organizeHoleData } from "../utils/data/organizeHoleData";
  import { useQuery, useMutation } from "@apollo/client";
  import { CREATE_COURSE } from "../utils/mutations";
  import { ADD_HOLE } from "../utils/mutations";
  import { QUERY_ALL_COURSES } from "../utils/queries";

const SearchCourses = () => {
    const [zip, setZip] = useState(0);
    const [searchedCourses, setSearchedCourses] = useState([]);

    const { loading, data } = useQuery(QUERY_ALL_COURSES, {});
    const mongoCourseData = data?.courses;


    const [createCourse, { error }] = useMutation(CREATE_COURSE);

    const navigate = useNavigate();

    const [addHole, { addError }] = useMutation(ADD_HOLE);

    const handleChange = (event) => {
        const { value }  = event.target;
        console.log(value);

        setZip(value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:3001/dgcr_api/zip/`, {
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

            if (Object.keys(data)[0] === "0") {
                setSearchedCourses(data);
            } else {
                setSearchedCourses(["Bad Request"]);
            }
        } else {
            console.log(response.statusText);
        }
    }

    const handleCourseClick = (dgcr_id, holes) => async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3001/dgcr_api/hole/${dgcr_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' 
            }
        });
        if (response.ok) {
            const data = await response.json();
            const holeData= organizeHoleData(data);

            const matchingCourse = mongoCourseData.find(
              (course) => course.courseName === data[0].name.trim()
            );
          
              console.log(matchingCourse)
            if (!matchingCourse) { 

            try {
                // execute createCourse mutation and pass in variable data from form
                const newCourse = await createCourse({
                  variables: {
                    courseName: data[0].name,
                    location: `${data[0].city}, ${data[0].state}`,
                    holeCount: parseInt(holes),
                  },
                });
                  console.log(newCourse.data.createCourse._id);
                for (let i=0;i<holeData.length;i++) {
                    addHole({
                        variables: {
                          courseId: newCourse.data.createCourse._id,
                          holeNumber: holeData[i].holeNumber,
                          par: holeData[i].par,
                          length: holeData[i].length
                        },
                      });
                }
          
                navigate(`/newround/${newCourse.data.createCourse._id}`);
              } catch (e) {
                console.error(e);
              }
            } else {
              navigate(`/newround/${matchingCourse._id}`);
            }

        } else {
            console.log(response.statusText)
        }
    }

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
      <div>
        <form onSubmit={handleFormSubmit}>
          <input value={zip} onChange={handleChange}></input>
          <button>Submit</button>
        </form>
        <MDBCard style={{ width: "18rem" }} className='course-list'>
        <MDBCardHeader className='text-center'>Courses near {zip}</MDBCardHeader>
        {searchedCourses[0] === "Bad Request" ? (<h6 style={{color: "red"}}>No Courses Found</h6>) : (
        <MDBListGroup flush>
            {searchedCourses &&
              searchedCourses.map((course) => (
                <MDBListGroupItem
                  key={course.course_id}
                  className='list d-flex justify-content-between'
                >
                  {" "}
                  {Auth.loggedIn() ? (
                 <h6 onClick={handleCourseClick(course.course_id, course.holes)} className="searched_course_link" >{course.name}</h6>
                 ) : (
                  <h6>{course.name}</h6>
                  )}
                 <div>
                 {course.city}, {course.state} - {course.holes} holes - Rating: <img alt="rating" src={course.rating_img_small} />

                 </div>
                </MDBListGroupItem>
              ))}
          </MDBListGroup>
          )}
        </MDBCard>

      </div>
    );

}

export default SearchCourses;