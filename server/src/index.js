import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './routes/users.js'
import { eventsRouter } from './routes/events.js'
import { hobbiesRouter } from './routes/hobbies.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/auth', userRouter)
app.use('/events', eventsRouter)
app.use('/hobbies',hobbiesRouter)

// mongoose.connect(
//   'mongodb+srv://jayparekh:rock123A@cluster0.awazspn.mongodb.net/Cluster0?retryWrites=true&w=majority'
// )
mongoose.connect("mongodb+srv://jayparekh:rock123A@production.074bxra.mongodb.net/?retryWrites=true&w=majority")

app.listen(3001, () => console.log('Server Started'))
