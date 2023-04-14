const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://nishujangra27:4cdd0509fxnx@todo.awuyguz.mongodb.net/?retryWrites=true&w=majority')


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

const itemsSchema = {
    name: String
}

const items = mongoose.model('items', itemsSchema);


// Routing for home page
app.get('/', (req, res) => {
    items.find().then((itemlist) => {
        res.render('list', {
            listTitle: "Today",
            newListItem: itemlist
        });
    })
})


app.post('/', (req, res) => {
    const item = new items({
        name: req.body.newItem
    })
    if (item.name == "") {
        console.log("Empty item");
    }
    else item.save();
    res.redirect('/');
})


app.post('/delete', (req, res) => {
    const checkedItemId = req.body.checkbox;
    items.findByIdAndRemove(checkedItemId).then((err) => {
        if (err) console.log(err);
        else console.log("Deleted");
    })
    res.redirect('/');
})



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})