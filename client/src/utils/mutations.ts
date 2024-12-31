import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;



export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const SAVE_LOCATION = gql`
 mutation addSavedLocation($input: LocationInput!) {
    addSavedLocation(input: $input) {
      id
      username
      email
      score
      progress
      saved_locations {
        type
        coordinates
        name
      }
      preferences
    }
  }
`;

export const CREATE_CHALLENGE = gql`
  mutation createChallenge($input: ChallengeInput!) {
    createChallenge(input: $input) {
      id 
      type
      location {
        coordinates
      }
      image_url
      name
    }
  } 
`