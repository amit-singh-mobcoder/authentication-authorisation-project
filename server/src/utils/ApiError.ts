class ApiError extends Error {
    // Properties for the error
    public statusCode: number;  // HTTP status code
    public data: any = null;    // Any additional data related to the error
    public success: boolean = false;  // Indicates the success state, always false in case of an error
    public error: any[];        // Array to store additional error details

    constructor(
        statusCode: number,          // The HTTP status code for the error
        message: string = "Something went wrong",  // Error message, with a default value
        errors: any[] = [],          // Additional error details, default is an empty array
        stack: string = ""           // Optional stack trace, default is an empty string
    ) {
        super(message);              // Call the base class constructor with the message
        this.statusCode = statusCode; // Set the status code
        this.error = errors;          // Set the error details

        // If a stack trace is provided, use it; otherwise, capture the current stack trace.
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
