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
      name
      address
      location {
        type
        coordinates
        name
      }
      image_url
      task
    }
  } 
`
export const MARK_CHALLENGE_COMPLETE = gql`
  mutation MarkChallengeComplete($id: ID!) {
    markChallengeComplete(id: $id) {
      id
      status
      completion_time
    }
  }
`;

export const ADD_CHALLENGES_TO_HUNT = gql`
  mutation addChallengesToHunt($input: HuntInput!) {
    addChallengesToHunt(input: $input) {
      id 
      user_id
      challenges {
        challenge_id
        name
        address
        location {
          type
          coordinates
          name
        }
        image_url
        
      }
    }
  }
`

export const UPDATE_HUNT_PROGRESS = gql`
  mutation updateHuntProgress($huntId: ID!, $challengeId: ID!, $status: String!) {
    updateHuntProgress(huntId: $huntId, challengeId: $challengeId, status: $status) {
      challenge_id
      name
      status
      completion_time
    }
  }
`;