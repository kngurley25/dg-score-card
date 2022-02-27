import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_COURSES, QUERY_ME } from "../utils/queries";
import CourseList from "../components/CourseList";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const ViewCourses = () => {
  const courseQuery = useQuery(QUERY_ALL_COURSES);
  const courses = courseQuery.data?.courses || [];
  const userQuery = useQuery(QUERY_ME);
  const user = userQuery.data?.me || {}
  // const length = user.courses.length;

  return (
    <main>
      {courseQuery.loading || userQuery.loading ? (
        <div>Loading. . .</div>
      ) : (
        <div className="d-flex justify-content-center">
          <CourseList
            // length={length}
            user={user}
            courses={courses}
            className="heading"
            title="Courses:"
          ></CourseList>
        </div>
      )}
      {Auth.loggedIn() && (
        <div className="d-flex justify-content-center mb-1">
          <Link to="/courseform" style={{ textDecoration: "none" }}>
            <button
              type="button"
              className="button d-flex justify-content-center m-4"
            >
              Create a Course
            </button>
          </Link>
        </div>
      )}
    </main>
  );
};

export default ViewCourses;
