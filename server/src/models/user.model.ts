import mongoose, { Schema, Document } from "mongoose";

// Interface representing a document in MongoDB.
// This interface defines the shape of the user document, 
// including the fields and their types.
interface IUser extends Document {
    name: {
        firstName: string;
        lastName: string;
    };
    username: string;
    email: string;
    password: string;
}

// Creating a Schema corresponding to the document interface.
// This schema defines the structure of the User collection in MongoDB.
// It ensures that each document will adhere to the structure defined by the IUser interface.
const userSchema: Schema = new Schema(
    {
        name: {
            type: Object as () => { firstName: string; lastName: string },
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        email: {
            type: String,
            unique: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

// Creating and exporting the User model based on the userSchema.
// This model will be used to interact with the "User" collection in MongoDB.
export const User = mongoose.model<IUser>('User', userSchema);
