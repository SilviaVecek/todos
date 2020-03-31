import express from 'express';
import { todos, loginDatabase } from './data';
import cookieParser from 'cookie-parser';

const Joi = require('@hapi/joi');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cookieParser());

const verifyToken = ( req, res ) => {
    if (!req.cookies.ILOVEZENNY) {
        res.sendStatus(403);
    };
}

// Get all todos
app.get('/api/todos', verifyToken, (req, res) => {
    jwt.verify(req.cookies.ILOVEZENNY, 'privatekey', (err, authorizedData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.status(200).send({
                todos: todos
            })
        }
    })
})

// Get specific todo
app.get('/api/todos/:id', (req, res) => {
    const todo = todos.find(c => c.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send("No todos with this ID");
    res.send(todo);
})

// Add todo
app.post('/api/todos', (req, res) => {
    const { error } = validateTodos(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    const todo = {
        id: todos.length + 1,
        complete: req.body.complete,
        description: req.body.description,
    }
    todos.push(todo);
    res.send(todo);
})

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
    const todo = todos.find(c => c.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send("No todos with this ID");
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    res.send(todo);
})

//Update todo
app.put('/api/todos/:id', (req, res) => {
    const todo = todos.find(c => c.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send("No todos with this ID");
    const { error } = validateTodos(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    todo.complete = req.body.complete;
    todo.description = req.body.description;
    res.send(todo);
})

// Update todo partially
app.patch('/api/todos/:id', (req, res) => {
    const todo = todos.find(c => c.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send("No todos with this ID");
    if ('complete' in req.body) todo.complete = req.body.complete;
    if ('description' in req.body) todo.description = req.body.description;
    res.send(todo)
})

// user login
app.post('/api/login/', (req, res) => {
    const { error } = validateLogin(req.body);
    const { email, password } = req.body;
    if (error) return res.status(400).send(error.details[0].message);
    const validUser = loginDatabase.find(data => {
        return (data.email === email && data.password === password) 
    })
    if (validUser) {
        jwt.sign({ email } , 'privatekey', { expiresIn: '10h' },(err, token) => {
            if(err) { console.log(err) } 
            res.cookie('ILOVEZENNY', token, { httpOnly: true });   
            res.send({success: true, JWT: token});
        });
    } else {
        res.send({success: false})
    }
});

function validateTodos(todo) {
    const schema = Joi.object({
        description: Joi.string().min(3).required(),
        complete: Joi.boolean()
    });
    return schema.validate(todo)
}

function validateLogin(details) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
    return schema.validate(details)
}

const PORT = process.env.port || 8080;

app.listen(PORT, () => {
    console.log(`server running on port http://localhost:${PORT}`)
})

// Methods
// app.get();
// app.post();
// app.put();
// app.delete();

/* 
app.get("/api/customers/:id", (req, res) => {
    res.send(req.params.id) // this will send the id to the client
})

app.get("/api/posts/:year/:month", (req, res) => {
    res.send(req.params) // this will send the the year and month as an object
    // eg localhost:3000/api/posts/2018/1 {year: "2018", month: "1"}
    // the above is called route parameters (required values)
        // query string parameters (optional)
})

app.get("/api/posts/:year/:month", (req, res) => {
    res.send(req.query)
    // eg localhost:3000/api/posts/2018/1?sortBy=name {sortBy: "name"}
    // query string parameters (optional)
})
*/

