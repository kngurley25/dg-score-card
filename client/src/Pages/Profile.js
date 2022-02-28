import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { QUERY_ME, QUERY_ALL_COURSES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import HistoryModal from "../components/HistoryModal";
import CoursesPlayed from "../components/CoursesPlayed";
import HistoryTable from "../components/HistoryTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Auth from "../utils/auth";

function Profile() {
  const [show, setShow] = useState(false);
  const { loading, data } = useQuery(QUERY_ME, {});
  const { data: allCorseData } = useQuery(QUERY_ALL_COURSES);
  const user = data?.me || {};
  const allCourses = allCorseData?.courses || [];

  if (loading) {
    return <div>Loading...</div>;
  }
  if (Auth.loggedIn() === false) {
    return (
      <div className='d-flex flex-column align-items-center'>
        <h4 className='loginMsg fw-bold'>
          You need to be logged in to see this page. Use the navigation links
          above to sign up or log in!
        </h4>
        <Link to={"/login"} className='my-2'>
          <button className='button'>Login</button>
        </Link>
      </div>
    );
  }

  const toggleModal = () => {
    setShow(!show);
  };

  const FindParTotal = (cntCourseName) => {
    for (let i = 0; i < allCourses.length; i++) {
      const course = allCourses[i];
      if (cntCourseName === course.courseName) {
        const holesArr = course.holes;
        let total = 0;
        for (let j = 0; j < holesArr.length; j++) {
          total += holesArr[j].par;
        }
        return total;
      }
    }
  };
  return (
    <section className='d-flex justify-content-center'>
      <HistoryModal
        show={show}
        handleClose={toggleModal}
        user={user}
        allCourses={allCourses}
        FindParTotal={FindParTotal}
      />
      <div className='flex-column'>
        <div className='card-heading d-flex flex-column align-items-center'>
          <h1 className='alt-heading'>🥏 Welcome {user.username}!</h1>

          <Link to={"/viewcourses"}>
            <button className='button-go' as={NavLink} to={"/"}>
              Find a New Course
            </button>
          </Link>

          {user.courses.length === 0 ? (
            <div className='text-center bg-white'>
              <h2>
                <FontAwesomeIcon icon={faArrowUp} /> start playing now{" "}
                <FontAwesomeIcon icon={faArrowUp} />
              </h2>
            </div>
          ) : (
            <div className='alt-sub-heading'>
              <h2 className='text-center'>
                <FontAwesomeIcon icon={faArrowDown} /> replay a recent course{" "}
                <FontAwesomeIcon icon={faArrowDown} />
              </h2>
              <div className='list-go'>
                <CoursesPlayed courses={user.coursesPlayed} />
              </div>
            </div>
          )}
        </div>
        <div>
          {user.rounds.length === 0 ? (
            <div></div>
          ) : (
            <div className='card-heading'>
              <HistoryTable user={user} FindParTotal={FindParTotal} />
              <h3
                className='launch-history'
                style={{ textDecoration: "none" }}
                onClick={() => toggleModal()}
              >
                View more history
              </h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;
