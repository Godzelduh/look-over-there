import { gql } from '@apollo/client';
//import { useQuery } from '@apollo/client';
//import { GET_USERS } from './queries';

// GraphQL queries that will be used thus far in the app
export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      username
      email
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
    }
  }
`;

export const GET_CHALLENGES = gql`
  query GetChallenges {
    getChallenges {
     id
     name
     location {
      type
      coordinates
      name
     }
     image_url
     task
     address
     question
     answer
     photo_instruction
     physical_task_info
     verification_method
    }
  }
`;

export const GET_CHALLENGE_PROGRESS = gql`
  query GetChallengeProgress($userId: ID!) {
    getChallengeProgress(userId: $userId) {
      id
      userId
      challengeId
      progress
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      id
      username
      email
      savedLocation {
        type
        coordinates
        name
      }
    }
  }
`;

export const GET_LOCATION = gql`
  query Location {
    location {
      id
      location
      coordinates
    }
  }
`;

export const GET_PLACES = gql`
  query textSearch($query: String!) {
    textSearch(query: $query) {
      name
      formatted_address
      photos
      geometry {
        location {
          lat
          lng
        }
      }
    }
  }
`;

export const GET_NEARBY_PLACES = gql`
  query nearbySearch($location: nearbyLocationInput!, $radius: Int!, $type: String!, $excludedTypes: [String]!) {
    nearbySearch(location: $location, radius: $radius, type: $type, excludedTypes: $excludedTypes) {
      name
      vicinity
      photos
      geometry {
        location {
          lat
          lng
        }
      }
    }
  }
`;

// getting challenges near a location  - added by me to be implemented in original folder
export const GET_CHALLENGES_NEAR = gql`
  query GetChallengesNear($location: LocationInput!, $maxDistance: Float!) {
    getChallengesNear(location: $location, maxDistance: $maxDistance) {
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
`;

// getting hunts by user - added to final as new on jan 2
export const GET_HUNTS_BY_USER = gql`
query getHuntsByUser($userId: ID!) {
  getHuntsByUser(userId: $userId) {
    id
    city
    challenges {
      challenge_id
      name
      location {
        type
        coordinates
      }
      address
      image_url
      status
      completion_time
    }
  }
}
`;