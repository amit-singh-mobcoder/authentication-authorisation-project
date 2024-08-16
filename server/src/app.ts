import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app : Application = express();

app.use(express.json());
app.use(cors({
    credentials:  true,
}));
app.use(bodyParser.json())
app.use(cookieParser());


// import routes
import userRoutes from './routes/user.routes.js'

// routes declaration
app.use('/api/v1/users', userRoutes);


app.get('/', (req : Request, res : Response) => {
    res.send(`<h1>Server is running</h1>`)
} )

export {app}