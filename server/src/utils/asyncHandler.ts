import { Request, Response, NextFunction, RequestHandler } from 'express';

// Type definition for the request handler function.
type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

// asyncHandler function that wraps a request handler to catch errors.
// It ensures that any unhandled promise rejections are passed to the next middleware (error handler).
const asyncHandler = (requestHandler: AsyncRequestHandler): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        // Wrap the request handler in a promise, and catch any errors that occur.
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

export { asyncHandler };
