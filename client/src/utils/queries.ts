// import gql from @apollo/client
import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      id
      username
      email
      savedLocaton {
        type
        coordinates
        name
      }
    }
  }
`;