import mongoose, { model, Schema,models } from "mongoose";
import bcrypt from "bcryptjs";

export const VIDEO_DIMENSION = {
    width: 1080,
    height: 1920
} as const;

export interface IVideo{
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thubmnailUrl: string;
    controls?: boolean; 
    transformation?: {
        height: number;
        width: number;
        quality?: number;
    }
    createdAt?: Date;
    updatedAt?: Date;
}

const videoSchema = new Schema<IVideo>({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    videoUrl: {
        type: String,
        required: [true, "videoUrl is required"]
    },
    thubmnailUrl: {
        type: String,
        required: [true, "thubmnailUrl is required"]
    },
    controls: {
        type: Boolean,
        default: true
    },
    transformation: {
        height: {
            type: Number,
            default: VIDEO_DIMENSION.height
        },
        width: {
            type: Number,
            default: VIDEO_DIMENSION.width
        },
        quality: {
            type: Number,
            min: 1,
            max: 100
        }
    },
},
{
    timestamps: true
}
);

const Video = models?.Video || model<IVideo>("Video", videoSchema);

export default Video;

