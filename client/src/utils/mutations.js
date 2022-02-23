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

export const ADD_COURSE = gql `
  mutation addCourse($courseName: String!) {
    addCourse(courseName: $courseName) {
      course {
      _id
      courseName
      location
      holes {
        holeNumber
      }
    } 
    }
    }
  `
  ;


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

    export const ADD_SCORE = gql `
    mutation addScore ($roundId: ID!, $holeNumber: Int!, $stroke: Int!) {
      addScore(roundId: $roundId, holeNumber: $holeNumber, stroke: $stroke) {
        totalScore
        scores {
          holeNumber
          stroke
        }
      }
    }`