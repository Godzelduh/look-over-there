// import {User,Challenge,ChallengeProgress} from "../models/index.js";
import User from "../models/User.js";
import ChallengeProgress from "../models/ChallengeProgress.js";
import Challenge from "../models/Challenge.js";
import {signToken,AuthenticationError} from "../utils/auth.js";

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
    };
  }

  interface UpdateChallengeProgressArgs {
    input: {
      progressId: string;
      status: string;
    };
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
    },

    Mutation: {
        //Create a new user
        createUser: async (_:any,{input}:AddUserArgs) => {
            const user = await User.create(input);
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
