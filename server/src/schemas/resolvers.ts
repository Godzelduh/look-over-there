// import {User,Challenge,ChallengeProgress} from "../models/index.js";
import User from "../models/User.js";
import ChallengeProgress from "../models/ChallengeProgress.js";
import Challenge from "../models/Challenge.js";
import {signToken, AuthenticationError} from "../utils/auth.js";
import Hunt from "../models/Hunt.js";
import mongoose from 'mongoose';

interface AddUserArgs {
    input: {
      username: string;
      email: string;
      password: string;
    };
  }

  interface LoginUserArgs {
    email: string;
    password: string;
  }

  interface AddSavedLocationArgs {
    userId: string;
    location: {
      type: string;
      coordinates: [number, number];
      name?: string;
    };
  }

  interface AddChallengeArgs {
    input: {
      type: string;
      location: {
        type: string;
        coordinates: [number, number];
        name?: string;
      };
      task?: string;
      image_url: string; // Required
      question?: string;
      answer?: string;
      photo_instruction?: string;
      physical_task_info?: string;
      verification_method?: string;
      address?: string;
      name: string;
    };
  }

  interface UpdateChallengeProgressArgs {
    input: {
      progressId: string;
      status: string;
    };
  }

  //for TextSearch in external API
  interface TextSearchArgs {
    query: string;
  }

  //new for near challenges by me - to be implemented in original folder
  interface LocationInput {
    type: string;
    coordinates: [number, number];
    name?: string;
  }

  //for NearbySearch in external API
interface NearbySearchArgs {
    location: {
        latitude: number;
        longitude: number;
        }
    radius: number;
    type: string;
    excludedTypes?: string[];
    }
const resolvers = {

    Query: {
        //fetch all users
        getUsers: async () => {
            return User.find().populate("progress");
        },
        //fetch a single user by id
        getUser: async (_: any, { id }: { id: string })=>{
            return User.findById(id).populate("progress");
        },
         //get all hunts new updation for hunt JAn2
         getAllHunts: async () => {
          try {
            return await Hunt.find({});
          } catch (error) {
            console.error("Error fetching hunts:", error);
            throw new Error("Unable to fetch hunts.");
          }
        },
         //fetch all hunts  by a user --> new in final folder jan 2 
         getHuntsByUser: async (_: any, { userId }: { userId: string }) => {
          const hunt = await Hunt.findOne({ user_id: userId })//.populate("challenges.challenge_id");
          if (!hunt) {
            throw new Error("No hunt found for the user.");
          }
        
          // Validate challenges
          hunt.challenges = hunt.challenges.filter((challenge: any) => challenge.challenge_id);
        
          return hunt;
        },
        //fetch all challenges
        getChallenges: async () => {
            const challenges = await Challenge.find({});
            console.log("Fetched Challenges:", challenges); 
            return challenges.map((challenge) => ({
              id: challenge._id,
              name: challenge.name || "Unnamed Challenge",
              location: challenge.location || { type: "Point", coordinates: [] }, 
              image_url: challenge.image_url || "default-placeholder.jpg", 
              task: challenge.task || "No task specified", 
              address: challenge.address || "Address not available", 
              question: challenge.question || "No question provided", 
              answer: challenge.answer || "No answer provided", 
              photo_instruction: challenge.photo_instruction || "No instructions provided", 
              physical_task_info: challenge.physical_task_info || "No physical task info", 
              verification_method: challenge.verification_method || "No verification method", 
            }));
        },
         //fetch challenges from db near a location within a certain distance
         getChallengesNear: async (_: any, { location, maxDistance }: { location: LocationInput; maxDistance: number }) => {
          const { type, coordinates } = location;
        
          if (!type || !coordinates || coordinates.length !== 2) {
            throw new Error('Invalid location input');
          }
        
          return await Challenge.find({
            location: {
              $near: {
                $geometry: {
                  type: 'Point',
                  coordinates: location.coordinates,
                  name: location.name || 'Unnamed Location',
                },
                $maxDistance: maxDistance,
              },
            },
          }).select("address image_url location name task");
        },
        //fetch all challenges for a user
        getChallengeProgress: async (_:any, {userId}: {userId: string}) => {
            return ChallengeProgress.find({user_id: userId}).populate("challenge_id");
        },
        //fetch the authenticated user
        me: async (_:any,_args:any,context:any) => {
            if(context.user){
                return User.findById(context.user._id).populate("progress");
            }
            throw new AuthenticationError("You need to be logged in!");
        },
         //fetch places from external API
         textSearch: async (_: any, { query }: TextSearchArgs) => {
            const apiKey = process.env.GOOGLE_MAP_API_KEY;

            try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`
            );
            const data = await response.json();
    
            if (data.status !== 'OK') {
              throw new Error(`Google Places API Error: ${data.status}`);
            }
    
            return data.results.slice(0, 5).map((result: any) => ({
              name: result.name,
              formatted_address: result.formatted_address,
              photos: result.photos?.map((photo: any) =>
                  `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`
              )  || [],
                geometry: {
                    location: {
                        lat: result.geometry.location.lat,
                        lng: result.geometry.location.lng
                    }
                }
            }));
          } catch (error) {
            console.error('Error fetching data from Google Places API:', error);
            throw new Error('Failed to fetch data');
          }
        },
        nearbySearch: async (_: any, { location, radius, type, excludedTypes }: NearbySearchArgs) => {
            const { latitude, longitude } = location;
            const apiKey = process.env.GOOGLE_MAP_API_KEY;

            try {
                 const response = await fetch(
                     `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&excludedTypes=${excludedTypes}&key=${apiKey}`
                 );
                 const data = await response.json();
                console.log(latitude,latitude,radius,type, excludedTypes)
                 if (data.status !== 'OK') {
                     throw new Error(`Google Places API Error: ${data.status}`);
                 }

                 return data.results.slice(0, 5).map((result: any) => ({
                     name: result.name,
                     vicinity: result.vicinity,
                     photos: result.photos?.map((photo: any) =>
                         `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`
                     )  || [],
                     geometry: {
                         location: {
                             lat: result.geometry.location.lat,
                             lng: result.geometry.location.lng
                         }
                     }
                 }));
             } catch (error) {
                 console.error('Error fetching data from Google Places API:', error);

                 throw new Error('Failed to fetch data111');
             }
         },
    },



    Mutation: {
            // Create a new hunt new in final folder jan 2
            addChallengesToHunt: async (_: any, { input }: any) => {
              const { user_id, challenges } = input;
            
              // Validate user_id
              if (!mongoose.Types.ObjectId.isValid(user_id)) {
                throw new Error("Invalid user_id. Must be a valid ObjectId.");
              }
            
              // Validate and convert challenge_id for all challenges
              const validatedChallenges = challenges.map((challenge: any) => {
                if (!mongoose.Types.ObjectId.isValid(challenge.challenge_id)) {
                  throw new Error(`Invalid challenge_id: ${challenge.challenge_id}. Must be a valid ObjectId.`);
                }
            
                return {
                  ...challenge,
                  challenge_id: new mongoose.Types.ObjectId(challenge.challenge_id), // Convert to ObjectId
                };
              });
            
              // Check if the hunt already exists for the user
              let hunt = await Hunt.findOne({ user_id: new mongoose.Types.ObjectId(user_id) });
            
              // Handle the case where `hunt` is null
              if (!hunt) {
                console.log("No hunt found for the user. Creating a new one.");
                hunt = new Hunt({ 
                  user_id: new mongoose.Types.ObjectId(user_id), 
                  challenges: validatedChallenges 
                });
              } else {
                console.log("Existing hunt found. Adding new challenges if not duplicates.");
                
                // Add only unique challenges to the existing hunt
                validatedChallenges.forEach((challenge: any) => {
                  if (!hunt!.challenges.some((c: any) => c.challenge_id.toString() === challenge.challenge_id.toString())) {
                    hunt!.challenges.push(challenge);
                  }
                });
              }
            
              // Save the updated or newly created hunt
              try {
                await hunt.save();
                console.log("Hunt saved successfully.");
                return hunt;
              } catch (error) {
                console.error("Error saving hunt:", error);
                throw new Error("Failed to save the hunt.");
              }
            },

            //mark hunt as completed new in final folder jan 2    
updateHuntProgress: async (_: any, { userId, challengeId, status }: any) => {
  // Find the hunt for the user
  const hunt = await Hunt.findOne({ user_id: userId });

  if (!hunt) {
    throw new Error("Hunt not found for the user.");
  }

  // Find the specific challenge in the user's hunt
  const challenge = hunt.challenges.find((c) => c.challenge_id.toString() === challengeId);

  if (!challenge) {
    throw new Error("Challenge not found in user's hunt.");
  }

  // Update the status and set completion time if the status is 'completed'
  challenge.status = status;
  if (status === "completed") {
    challenge.completion_time = new Date();
  }

  // Save the updated hunt
  await hunt.save();
  return challenge;
},
      //mark a challenge as completed 
      markChallengeCompleted: async (_: any, { challengeId }: { challengeId: string }, context: any) => {
        const userId = context.user.id;
      
        let progress = await ChallengeProgress.findOne({ user_id: userId, challenge_id: challengeId });
      
        if (progress) {
          if (progress.status === 'completed') {
            throw new Error('Challenge already completed.');
          }
      
          progress.status = 'completed';
          progress.completion_time = new Date();
          await progress.save();
          return progress;
        }
      
        const newProgress = new ChallengeProgress({
          user_id: userId,
          challenge_id: challengeId,
          status: 'completed',
          completion_time: new Date(),
        });
      
        await newProgress.save();
        return newProgress;
      },
        //Create a new user
        createUser: async (_:any, {input}:AddUserArgs) => {
            const user = await User.create({ ...input});
            console.log(user, "HIT")
            const token = signToken(user.username,user.email,user._id);
            return {token,user};
        },
        //Login user who has an account
        login: async (_:any,{email,password}:LoginUserArgs) => {
            const user = await User.findOne({email});
            if(!user){
                throw new AuthenticationError("Incorrect credentials -email");// need to remove -email later
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw){
                throw new AuthenticationError("Incorrect credentials -password");// need to remove -password later
            }
            const token = signToken(user.username,user.email,user._id);
            console.log("logged In!")
            return {token,user};
        },
        //Add a saved location to a user's profile
        addSavedLocation: async (_:any,{ userId, location}:AddSavedLocationArgs) => {
            const user = await User.findById(userId);
            if(!user){
                throw new AuthenticationError("User not found!");
            }
            user.saved_locations.push(location);
            await user.save();
            return user;
        },
        //Create a new Challenge
        createChallenge: async (_:any,{input}:AddChallengeArgs) => {
            const challenge = new Challenge(input);
            return await challenge.save();
        },

        //Update a challenge progress
        updateChallengeProgress: async (_:any,{input}:UpdateChallengeProgressArgs) => {
            const {progressId,status} = input;
            const updatedProgress = await ChallengeProgress.findByIdAndUpdate(
                progressId,
                {status,completion_time: new Date()},
                {new:true}
            );
            return updatedProgress;
            
        },
        createChallengeProgress: async (_: any, { userId,challengeId }: any) => {
            // const { userId, challengeId } = input;

            const newProgress = new ChallengeProgress({
            user_id : userId,
            challenge_id : challengeId,
            status : "pending",
            completion_time: null,
         });

        return await newProgress.save();
    },
    },

};

export default resolvers;