// import {User,Challenge,ChallengeProgress} from "../models/index.js";
import User from "../models/User.js";
import ChallengeProgress from "../models/ChallengeProgress.js";
import Challenge from "../models/Challenge.js";
import {signToken, AuthenticationError} from "../utils/auth.js";

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
      task: string;
      image_url: string; // Required
      question?: string;
      answer?: string;
      photo_instruction?: string;
      physical_task_info?: string;
      verification_method?: string;
      address?: string;
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
        //fetch all challenges
        getChallenges: async () => {
            return Challenge.find();
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
