import React from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardHeader,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

const CourseList = ({ courses, title }) => {
  if (!courses.length) {
    return <h3 className="d-flex justify-content-center">No Courses Yet</h3>;
  }

  return (
    <section>
      <div>
        <Link to="/">
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary d-flex justify-content-center"
            >
              Go Back
            </button>
          </div>
        </Link>
      </div>

      <MDBCard style={{ width: "18rem" }}>
        <MDBCardHeader>{title}</MDBCardHeader>
        <MDBListGroup flush>
          {courses &&
            courses.map((course) => (
              <MDBListGroupItem
                key={course._id}
                className="list d-flex justify-content-center"
              >
                {course.courseName}, {course.location}
              </MDBListGroupItem>
            ))}
        </MDBListGroup>
      </MDBCard>
    </section>
  );
};

export default CourseList;
