import { gql } from '@apollo/client';

//for a specific user's courses
export const QUERY_COURSES = gql `
    query courses($username: String) {
        courses(username: $username) {
            _id
            courseName
            location
            holes {
                holeNumber
                par
            }
        }
    }`

//for all courses
export const QUERY_ALL_COURSES = gql `
query allCourses{
    courses {
      _id
    courseName
    location
    holeCount
    holes {
      _id
      holeNumber
      par
    }
  }
}
`
//to get a single course by ID
export const QUERY_COURSE = gql `
query course($courseId: String!) {
    course(courseId: $courseId) {
        _id
        courseName
        location
        holeCount
        holes {
            holeNumber
            par
        }
    }
}
`

export const QUERY_USER = gql `
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            courses {
                _id
                courseName
                location
                holeCount
                holes {
                  _id
                  holeNumber
                  par
                }
            }
            rounds {
                courseName
                createAt
                username
                scores {
                    holeNumber
                    stroke
                }
            }
        }
    }`

