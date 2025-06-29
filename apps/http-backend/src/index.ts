import express from 'express'
import { userRouter } from './routes/user.routes';

const app = express();
app.use(express.json());

app.use('/api/v1/user',userRouter);

app.listen(8000,()=>{
    console.log("server is running on port 8000");
});