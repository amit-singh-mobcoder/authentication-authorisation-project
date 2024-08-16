class ApiResponse<T> {
    // Properties for the response
    public statusCode: number;  // HTTP status code
    public data: T;             // The data returned in the response
    public message: string;     // A message indicating the result of the operation
    public success: boolean;    // A boolean indicating if the operation was successful

    constructor(
        statusCode: number,         // The HTTP status code for the response
        data: T,                    // The data to be returned in the response
        message: string = 'Success' // A message, defaulting to 'Success'
    ) {
        this.statusCode = statusCode; // Set the status code
        this.data = data;             // Set the data
        this.message = message;       // Set the message
        this.success = statusCode < 400; // Set the success status based on the status code
    }
}

export { ApiResponse };
