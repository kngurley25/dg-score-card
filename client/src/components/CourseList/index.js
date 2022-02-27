import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardHeader,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as starReg } from "@fortawesome/free-regular-svg-icons";
import { faStar as starSolid } from "@fortawesome/free-solid-svg-icons";
import { ADD_COURSE } from "../../utils/mutations";
import { QUERY_ME_COURSES } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const CourseList = ({ courses, title, user }) => {
  const [addCourse, { error }] = useMutation(ADD_COURSE, {
    refetchQueries: [QUERY_ME_COURSES],
  });
  const { loading, data } = useQuery(QUERY_ME_COURSES);
  const myCourses = data?.me || {};

  const courseArr = [];
  if (!loading) {
    for (let i = 0; i < myCourses.courses.length; i++) {
      courseArr.push(myCourses.courses[i]._id);
    }
  }

  const handleAddCourse = (id) => (e) => {
    e.preventDefault();
    try {
      addCourse({
        variables: { courseId: id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!courses.length) {
    return (
      <div className="d-flex flex-column align-items-center">
        <h3 className="bg-white mt-5">No Courses Yet</h3>
        <h3 className="text-center bg-white">
          Login or signup to create a course and start playing!
        </h3>
        <div>
          <Link to={"/login"} className="mx-4">
            <button className="button justify-content-center">Login</button>
          </Link>
          <Link to={"/signup"} className="mx-4">
            <button className="button justify-content-center">Signup</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="d-flex justify-content-center">
            <button type="button" className="button justify-content-center">
              Go Back
            </button>
          </div>
        </Link>
      </div>
      <MDBCard style={{ width: "18rem" }} className="course-list">
        <MDBCardHeader className="text-center">{title}</MDBCardHeader>
        {Auth.loggedIn() ? (
          <MDBListGroup flush>
            {courses &&
              courses.map((course) => (
                <MDBListGroupItem
                  key={course._id}
                  className="list d-flex justify-content-between"
                >
                  {" "}
                  <Link
                    to={`/newround/${course._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {course.courseName}, {course.location}
                  </Link>
                  {courseArr.includes(course._id) ? (
                    <FontAwesomeIcon icon={starSolid} />
                  ) : (
                    // eslint-disable-next-line no-restricted-globals
                    <div onClick={handleAddCourse(course._id)}>
                      <FontAwesomeIcon icon={starReg} />
                    </div>
                  )}
                </MDBListGroupItem>
              ))}
          </MDBListGroup>
        ) : (
          <MDBListGroup flush>
            <Link to="/">
              <h6>Sign up or log in to keep your score!</h6>
            </Link>
            {courses &&
              courses.map((course) => (
                <MDBListGroupItem
                  key={course._id}
                  className="list d-flex justify-content-center"
                >
                  {" "}
                  <input type="checkbox" className="favBtn" />
                  <FontAwesomeIcon icon={starReg} className="emptyStar" />
                  <FontAwesomeIcon icon={starSolid} className="solidStar" />
                  <div>
                    <button className="courseBtn fw-bold">
                      {course.courseName}, {course.location}
                    </button>
                  </div>
                </MDBListGroupItem>
              ))}
          </MDBListGroup>
        )}
      </MDBCard>
      {error && <div>An Error has occurred...</div>}
    </section>
  );
};

export default CourseList;
