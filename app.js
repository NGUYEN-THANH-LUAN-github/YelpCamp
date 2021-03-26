// 1
const express = require('express');
const app = express();
// 4 
const path = require('path');

// 4
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// 3
app.get('/', (req, res) => {
    // res.send('HELLO from YelpCamp')
    res.render('home')
})

// 2
app.listen(3000, () => {
    console.log('Serving on port 3000')
})