import { Schema,model,Document } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    score: number;
    progress: Schema.Types.ObjectId[];
    saved_locations: {
        type: string;
        coordinates: [number, number];
        name?: string;
    }[];
    preferences: {
        preferred_type?: string[];
        difficulty?: string;
    };
    isCorrectPassword: (password: string) => Promise<boolean>;
}

//Define the schema
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/,"Must match an email address!"]
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    score: {
        type: Number,
        default: 0
    },
    progress: {
        type: [Schema.Types.ObjectId],
        ref: "ChallengeProgress",
        default: []
    },
    saved_locations: {
        type: [{
            type: {
                type: String,
                enum: ["Point"],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            },
            name: {
                type: String,
                required: false
            }
        }],
        default: []
    },
    preferences: {
        preferred_type: {
            type: [String],
            required: false
        },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: false
        },
    },
    
},
{
    timestamps: true,
    toJSON:{getters: true},
    toObject:{getters: true}
}

);

userSchema.pre<IUser>("save", async function(next){
    if(this.isNew || this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean>{
    return bcrypt.compare(password, this.password);
}

const User = model<IUser>("User", userSchema);

export default User;