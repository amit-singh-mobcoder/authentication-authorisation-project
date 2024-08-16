import { User } from '../models/user.model';
import express, { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import bcrypt from 'bcryptjs';

// Handler function for the sign-up route
const sign_up = asyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, username, email, password } = req.body;

    // Check if any required fields are missing
    if ([firstName, lastName, username, email, password].some((field) => field.trim() === '')) {
        throw new ApiError(400, 'All fields are required');
    }

    // Check if a user with the provided email or username already exists
    const existedUser = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (existedUser) {
        throw new ApiError(409, 'User with this email or username already exists');
    }

    // Hash the user's password
    const hashed_password = await bcrypt.hash(password, 10);

    // Create a new user document
    const user = new User({
        name: { firstName, lastName },
        username: username.toLowerCase(),
        email,
        password: hashed_password,
    });

    // Save the user to the database
    await user.save();

    // Retrieve the created user without the password field
    const createdUser = await User.findById(user._id).select('-password');

    if (!createdUser) {
        throw new ApiError(500, 'Something went wrong while registering the user');
    }

    // Return a successful response with the created user data
    return res.status(201).json(
        new ApiResponse(200, createdUser, 'User registered successfully')
    );
});

export { sign_up };
