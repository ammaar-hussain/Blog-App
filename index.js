
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


let posts = [];


app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.post('/new', (req, res) => {
    const { title, body } = req.body;
    const newPost = { title, body };
    posts.push(newPost);
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const post = posts[id];
    res.render('edit', { id, post });
});

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { title, body } = req.body;
    posts[id] = { title, body };
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    posts.splice(id, 1);
    res.redirect('/');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
