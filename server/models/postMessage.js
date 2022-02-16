import mongoose from 'mongoose'


const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

mongoose.pluralize(null)
const Postmessage = mongoose.model('PostMessages', postSchema)

export default Postmessage