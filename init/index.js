const mongoose = require('mongoose');
const initData = require("./data.js");
const Post = require("../models/post.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wisdommaster';

main()
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
    await Post.deleteMany({});
    // initData.data = initData.data.map((obj)=> ({...obj, owner: "657efdf70e2998ab58cf2002"}));
    await Post.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();