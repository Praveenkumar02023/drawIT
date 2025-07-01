import express from 'express'
import { userRouter } from './routes/user.routes';
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/user',userRouter);

app.listen(8000,()=>{
    console.log("server is running on port 8000");
});