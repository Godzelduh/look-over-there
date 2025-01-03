import {gql} from 'apollo-server-express';

const typeDefs = gql`
# User type 
type User {
id: ID!
username: String!
email: String!
score: Int
progress: [ChallengeProgress]
saved_locations: [Location]
preferences: Preferences
}

type Location {
type: String
coordinates: [Float]!
name: String
}

type Preferences {
preferred_types: [String]
difficulty: String
}

# Hunt type (for fetching hunts)
type Hunt {
  id: ID! # The unique ID for the hunt
  user_id: ID! # The user associated with this hunt
  challenges: [HuntChallenge!]!
}

type HuntChallenge {
  challenge_id: ID! # Unique ID for the challenge
  name: String
  location: Location
  address: String
  image_url: String
  status: String
  completion_time: String
}

# Challenge type
type Challenge {
id: ID!
type: String!
location: Location!
task: String
image_url: String!
question: String
answer: String
photo_instruction: String
physical_task_info: String
verification_method: String
address: String
name: String
}

# ChallengeProgress type
type ChallengeProgress {
id: ID!
user_id: ID!
challenge_id: Challenge! #was ID! updated to Challenge type to return challenge details
status:String!
completion_time: String
}

# HuntChallenge type  new added in final folder on jan 2
# HuntChallengeInput type (for challenges in HuntInput)
input HuntChallengeInput {
  id: ID!
  name: String
  location: LocationInput
  address: String
  image_url: String!
  status: String
  completion_time: String
}

# Geometry type
type Geometry {
  location: LocationCoordinates!
}

# LocationCoordinates type
type LocationCoordinates {
  lat: Float!
  lng: Float!
}


#for the place in external API
type Place {
name: String!
formatted_address: String!
photos: [String]!
geometry: Geometry!
}

#extend type place to include nearby address
extend type Place {
vicinity: String!
}

# Input types
input LocationInput {
type: String!
coordinates: [Float]!
name: String
}

#inout for Hunt type new added in final folder on jan 2
# HuntInput type
input HuntInput {
  user_id: ID!
  challenges: [HuntChallengeInput!]!
}

input nearbyLocationInput { 
latitude: Float!
longitude: Float!
}

input CreateUserInput {
username: String!
email: String!
password: String!
}

input ChallengeInput {
type: String!
location: LocationInput!
task: String
image_url: String!
question: String
answer: String
photo_instruction: String
physical_task_info: String
verification_method: String
address: String
name: String
}

input UpdateProgressInput {
progressId: ID!
status: String!
}

# Auth Payload
type AuthPayload {
token: String!
user: User!
}

#Queries
type Query {
getUsers: [User]!
getUser(id: ID!): User
getChallenges: [Challenge]!
getChallengeProgress(userId: ID!): [ChallengeProgress]!
me: User
#new for near challenges by me - to be implemented in original folder
getChallengesNear(location: LocationInput!, maxDistance: Float!): [Challenge]

#new for getHuntsByUser - in final folder on jan 2
getHuntsByUser(userId: ID!): Hunt
#new for getAllHunts - in final folder on jan 2
getAllHunts: [Hunt]

}

#for TextSearch in external API
 extend type Query {

 textSearch(query: String!): [Place]!
 }
 
#for NearbySearch in external API
extend type Query {
nearbySearch(location: nearbyLocationInput!, radius: Int!, type: String!, excludedTypes:[String]!): [Place]!
}
 
#Mutations
type Mutation {
createUser(input: CreateUserInput): AuthPayload

#login -> to be implemented
login(email: String!, password: String!): AuthPayload

#addsavedLocation -> to be implemented
addSavedLocation(userId: ID!, location: LocationInput!): User

#createChallenge(input: ChallengeInput): Challenge
createChallenge(input: ChallengeInput!): Challenge

#updateChallengeStatus -> to be implemented
updateChallengeStatus(input: UpdateProgressInput!): ChallengeProgress

#updateChallengeProgress -> to be implemented
updateChallengeProgress(input: UpdateProgressInput!): ChallengeProgress 

#createChallengeProgress -> to be implemented
createChallengeProgress(userId: ID!, challengeId: ID!): ChallengeProgress

#markChallengeCompleted -> to be implemented
markChallengeCompleted(id: ID!): ChallengeProgress!

#markChallengeAsCompleted -> to be implemented new added in final folder on jan 2 - needs to be added to original folder
updateHuntProgress(userId: ID!, challengeId: ID!,status: String!): HuntChallenge!

#addChallengesToHunter -> to be implemented new added in final folder on jan 2
addChallengesToHunt(input: HuntInput!): Hunt
}

`;

export default typeDefs;