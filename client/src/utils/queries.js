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

export const QUERY_COURSE = gql `
query course($_id: ID!) {
    course(_id: $_id) {
        _id
        courseName
        location
        holes {
            holeNumber
            par
        }
    }
}`

export const QUERY_ROUND = gql `
query round($roundId: ID!) {
    round(roundId: $roundId) {
        _id
        totalScore
        courseName
        username
        scores {
            holeNumber
            stroke
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
      }
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
`;