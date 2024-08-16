import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from 'dotenv'
dotenv.config();

const uri : string | undefined = process.env.MONGODB_URI;

class Database {
    private uri : string;

    constructor(uri : string) {
        if(!uri) {
            throw new Error('MongoDB uri is missing');
        }

        this.uri = uri;
    }

    async connect() {
        try {
            const connectionInstance = await mongoose.connect(`${this.uri}/${DB_NAME}`);
            console.log('MongoDB connection sucessfull DB-HOST :',connectionInstance.connection.host);
        } catch (error) {
            console.error('MongoDB connection failed Error : ',error);
            process.exit(1);
        }
    }
}

export default new Database(uri!);
