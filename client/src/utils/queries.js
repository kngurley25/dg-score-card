import { gql } from '@apollo/client';

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

export const QUERY_COURSE = gql `
    query course($courseName: String!) {
        course(courseName: $courseName) {
            _id
            courseName
            location
            holes {
                holeNumber
                pad
            }
        }
    }`

export const QUERY_USER = gql `
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            courses {
                _id
                courseName
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

    export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      courses {
        _id
        courseName
        location
        rounds {
          courseName
          createAt
          scores {
              holeNumber
              stroke
          } 
        }
      friends {
        _id
        username
      }
    }
    }
  }
`;