import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id : _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send({ message : 'No post with that id', id: _id });

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id : _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send({ message : 'No post with that id', id: _id });

    const deletedPost = await PostMessage.findByIdAndRemove(_id);

    // res.json(deletedPost);
    res.json({ message: 'Post Deleted Successfully' , _id });
}



export const likePost = async (req, res) => {
    const { id : _id } = req.params; 

    // req.userId #populated in the middleware
    if( !req.userId ) return res.status(400).json({ message: 'Unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send({ message : 'No post with that id', id: _id });

    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex((_id) => _id == String(req.userId));

    if(index === -1) {
        //like the post
        post.likes.push(req.userId);
    } else {
        //dislike the post
        post.likes = post.likes.filter((_id) => _id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost);
}