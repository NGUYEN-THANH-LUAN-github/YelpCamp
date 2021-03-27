const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// require the Model
const Campground = require('./models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    // options 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected!");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    // res.send('HELLO from YelpCamp')
    res.render('home')
})

app.get('/campgrounds', async(req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
})

app.get('/campgrounds/:id', async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    //                           hoặc   findById(req.params.id);

    res.render('campgrounds/show', { campground })
})

// app.get('/makecampground', async(req, res) => {
//     const camp = new Campground({ title: 'My Backyard', description: 'cheap camping!' });
//     // vì save() mất tgian nên đổi thành async function
//     await camp.save();
//     res.send(camp);
// })

app.listen(3000, () => {
    console.log('Serving on port 3000')
})