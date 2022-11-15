const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const router = express.Router();

app.use(express.json());


const db = [
    {
        id: 1,
        title: 'hello1',
        body: 'hello2 world body blablabla',
        creat_at: new Date(),
        update_at: new Date(), 
    },
    {
        id: 2,
        title: 'hello2',
        body: 'hello2 world body blablabla',
        creat_at: new Date(),
        update_at: new Date(), 
    },
    {
        id: 3,
        title: 'hello3',
        body: 'hello3 world body blablabla',
        creat_at: new Date(),
        update_at: new Date(), 
    }
]

app.get('/posts', function (req, res) {
    res.send(db)
})
app.post('/posts', function(req, res) {
    db.push(req.body);

    res.status(201);
    res.json(req.body)

    
app.get('/posts/:id', function(req, res) {
    const { id } = req.params;
    const ret = db.find( e => e.id == id);

    if (!ret) return res.status(404).json();

    res.status(201);
    res.json(ret);
});
});
app.put('/posts/:id', function(req, res) {
    const { id } = req.params;
    const ret = db.find( e => e.id == id);

    if (!ret) return res.status(404).json();
    
    const { title } = req.body;

    ret.title = title;

    res.status(201);
    res.json(ret);
});
app.delete('/posts/:id', function(req, res) {
    const { id } = req.params;
    const ret = db.filter( e => e.id != id);
    
    res.status(200);
    res.json(ret);
});

app.listen(3000, function() {
    console.log('Server listen on http://localhost:3000')
})