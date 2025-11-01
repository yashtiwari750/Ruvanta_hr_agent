import express from "express";
import dotenv from "dotenv";
import userRoute from './routes/userRoutes.js';
import mongoose from "mongoose";

dotenv.config();
import Cors from "cors";


const app = express();

<<<<<<< HEAD
// added cors access point so that our backend allow our frontend website 
=======

>>>>>>> 14631c8 (Fix CORS to allow vercel frontend)
const allowedOrigins = [
  "http://localhost:5173",
  "https://ruvanta-hr-agent.vercel.app"
];

app.use(cors({
<<<<<<< HEAD
  origin: allowedOrigins,
  credentials: true
}));



=======
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
>>>>>>> 14631c8 (Fix CORS to allow vercel frontend)
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT  = process.env.PORT 
const MONGODB_URI = process.env.MONGODB_URI

app.use('/api/users', userRoute)

// try {
//     mongoose.connect(URI).then(() => {
//         console.log('Connected to MongoDB')
//     })
// } catch (error) {

//     console.log(`Mongodb not connected: ${error.message}`);
    
// }
try {
    mongoose.connect(MONGODB_URI)
.then(
    console.log("mongodb connection")
)
} catch (error) {
    console.log(`Mongodb not connected: ${error.message}`);
    
}


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server is listening on port  ${PORT}`)
})
