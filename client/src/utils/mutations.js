import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;


export const CREATE_COURSE = gql `
mutation createCourse($courseName: String!, $location: String!, $holeCount: Int!) {
  createCourse(courseName: $courseName, location: $location, holeCount: $holeCount) {
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

export const ADD_HOLE = gql `
mutation addHole($courseId: ID!, $holeNumber: Int!, $par: Int!) {
  addHole(courseId: $courseId, holeNumber: $holeNumber, par: $par) {
    _id
    holeCount
    holes {
      _id
      holeNumber
      par
    }
  }
}
`

  export const ADD_ROUND = gql `
    mutation addRound ($username: String!) {
      addRound(username: $username) {
        _id
        courseName
        createAt
        scores {
          holeNumber
          stroke
        }
      }
    }`