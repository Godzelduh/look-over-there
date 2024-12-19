import { Schema, model,Document } from "mongoose";

interface IChallengeProgress extends Document {
    user_id: Schema.Types.ObjectId;
    challenge_id: Schema.Types.ObjectId;
    status: "pending" | "completed";
    completion_time?: Date;

}

const ChallengeProgressSchema = new Schema<IChallengeProgress>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    challenge_id: {
        type: Schema.Types.ObjectId,
        ref: "Challenge",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
        required: true
    },
    completion_time: {
        type: Date,
        required: false
    }
},
{
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
});

const ChallengeProgress = model<IChallengeProgress>("ChallengeProgress", ChallengeProgressSchema);

export default ChallengeProgress;