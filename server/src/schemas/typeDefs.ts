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
type: String!
coordinates: [Float]!
name: String
}

type Preferences {
preferred_types: [String]
difficulty: String
}

# Challenge type
type Challenge {
id: ID!
type: String!
location: Location!
task: String!
image_url: String!
question: String
answer: String
photo_instruction: String
physical_task_info: String
verification_method: String
}

# ChallengeProgress type
type ChallengeProgress {
id: ID!
user_id: ID!
challenge_id: Challenge! #was ID! updated to Challenge type to return challenge details
status:String!
completion_time: String
}

#for the place in external API
type Place {
name: String!
formatted_address: String!
photos: [String]!
}

# Input types
input LocationInput {
type: String!
coordinates: [Float]!
name: String
}

input CreateUserInput {
username: String!
email: String!
password: String!
}

input ChallengeInput {
type: String!
location: LocationInput!
task: String!
image_url: String!
question: String
answer: String
photo_instruction: String
physical_task_info: String
verification_method: String
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
}

#for TextSearch in external API
 extend type Query {

 textSearch(query: String!): [Place]!
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
}
`;

export default typeDefs;