/* New version of Node can use Import, more modern and easier to use */
/* to enable it, package.json, add "type" : "module" */
import express from 'express' 
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express()
dotenv.config()

/* You might not need to install the additional body-parser package to your application if you are using Express 4.16+ */
app.use(express.json({limit: "30mb", extended : true})) /* "limit":when sending large file size like images */
app.use(express.urlencoded({limit: "30mb", extended : true}))

app.use(cors())

const PORT = process.env.PORT || 5000

/* useFindAndModify : Able use `findOneAndUpdate()`. Option is `true` by default 
By default, the returned document does not include the modifications made on the update. 
To return the document with the modifications made on the update, use the new option. */
mongoose
    .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => { 
            console.log('Dbase Mongo Connected ')
            try {
                app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
            } catch (error) { console.log('Cannot Start Server ') } 
        })
    .catch((error) => console.log('Unable Connect to Dbase Mongo', error)) 

    
app.use('/posts', postRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello to Memories API')
})