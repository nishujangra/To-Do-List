const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + '/date.js')


const app = express()
const port = 3000

// Set public folder as static folder for static files
app.use(express.static(__dirname + '/public'));

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Set EJS as templating engine
app.set('view engine', 'ejs');


const items = [];
const workItems = [];


// Routing for home page
app.get('/', (req, res) => {
    let day = date.getDate();
    res.render('list', {
        listTitle: day,
        newListItem: items
    });
})

app.post('/', (req, res) => {
    let item = req.body.newItem;
    if (item == "") {
        console.log("Empty item");
    }
    else items.push(item);
    res.redirect('/');
})


// Routing for work page
app.get('/work', (req, res) => {
    res.render('list', {
        listTitle: "Work",
        newListItem: workItems
    });
})

app.post('/work', (req, res) => {
    let item = req.body.newItem;
    if (item == "") {
        console.log("Empty item");
    }
    else workItems.push(item);

    res.redirect('/work');
})


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})