import { Schema,model,Document} from "mongoose";

interface IChallenge extends Document {
    type: string;
    location: {
        type: string;
        coordinates: [number, number];
      };
      task?: string;
      image_url: string;
      question?: string;
      answer?: string;
      photo_instruction?: string;
      physical_task_info?: string;
      verification_method?: string;
      address?: string;
      name: string;
}

const ChallengeSchema = new Schema<IChallenge>({
    type: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: false
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    task: {
        type: String,
        required: false
    },
    image_url: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: false
    },
    answer: {
        type: String,
        required: false
    },
    photo_instruction: {
        type: String,
        required: false
    },
    physical_task_info: {
        type: String,
        required: false
    },
    verification_method: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    }

},
{
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
}
);

//added index for geolocation
ChallengeSchema.index({ location: '2dsphere' });
const Challenge = model<IChallenge>("Challenge", ChallengeSchema);

export default Challenge;