const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
    const posts = await loadClientPosts();
    res.send(await posts.find({}).toArray());
});

router.post('/', async (req, res) => {
    const posts = await loadClientPosts();
    await posts.insertOne({
        title : req.body.title, 
        createdAt : new Date()
    });
    res.status(201).send();
});

router.delete("/:id", async (req,res) => {
    const posts = await loadClientPosts();
    await posts.deleteOne({
        "_id" : new mongodb.ObjectID(req.params.id)
    });
    res.status(200).send();
})

async function loadClientPosts() {
    const client = await mongodb.MongoClient.connect('mongodb://root:root12345@ds033056.mlab.com:33056/vue_express',{
        useNewUrlParser:true
    });
    return  client.db('vue_express').collection('posts');
}

module.exports = router;