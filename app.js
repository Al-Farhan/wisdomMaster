const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Post = require("./models/post");
const ejsMate = require("ejs-mate");


const MONGO_URL = 'mongodb://127.0.0.1:27017/wisdommaster';

main()
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



app.get("/", async (req, res)=>{

    const allPosts = await Post.find({});
    res.render("posts/index.ejs", {allPosts});
});

// Create new post
app.get("/posts/new", (req, res)=>{
    res.render("posts/new.ejs");
});

app.get("/posts/:id", async (req, res) => {
    let {id} = req.params;
    const post = await Post.findById(id);
    res.render("posts/show.ejs", {post});
});

app.post("/", async (req, res) => {
    
    let newPost = new Post(req.body.post);
    await newPost.save()
    res.redirect("/");
})



app.get("/about", (req, res) => {
    res.render("posts/about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("posts/contact.ejs");
});



app.listen(3030, ()=>{
    console.log(`App is listening at port 8080`);
});