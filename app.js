const express = require('express')
const bodyParser = require('body-parser')


const app = express()
const port = 3000

// Set public folder as static folder for static files
app.use(express.static(__dirname + '/public'));

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// Set EJS as templating engine
app.set('view engine', 'ejs');


var items = [];

app.get('/', (req, res) => {
    let today = new Date();
    let options = { weekday: 'long', day : 'numeric', month: 'long'}
    let day = today.toLocaleString('en-US',options);

    res.render('list', {
        kindOfDay: day,
        newListItem : items
    });
})

app.post('/', (req, res) => {
    let item = req.body.newItem;
    if(item == ""){
        console.log("Empty item");
    }
    else items.push(item);

    res.redirect('/');
})


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})