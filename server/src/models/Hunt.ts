import { Schema, model, Document, Types } from "mongoose";

interface IHuntChallenge {
  challenge_id: Types.ObjectId;
  name?: string;
  location: {
    type: string;
    coordinates: [number, number];
    name?: string;
  };
  address?: string;
  image_url: string;
  status: "pending" | "completed";
  completion_time?: Date;
}

interface IHunt extends Document {
  user_id: Types.ObjectId;
  challenges: IHuntChallenge[];
  city: string;
}

const HuntChallengeSchema = new Schema<IHuntChallenge>({
  challenge_id: {
    type: Schema.Types.ObjectId,
    ref: "Challenge",
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
  },
  address: {
    type: String,
    required: false,
  },
  image_url: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  completion_time: {
    type: Date,
  },
});

const HuntSchema = new Schema<IHunt>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  challenges: {
    type: [HuntChallengeSchema], // Use the HuntChallengeSchema here
    default: [], // Allow an empty array by default
  },
  city: {
    type: String,
    required: true
  },
});

const Hunt = model<IHunt>("Hunt", HuntSchema);

export default Hunt;