import express from 'express';
import todos from './data';

const Joi = require('@hapi/joi');
const app = express();
app.use(express.json());

// Get all todos
app.get('/api/todos', (req, res) => {
    res.status(200).send({
        todos: todos
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


function validateTodos(todo) {
    const schema = Joi.object({
        description: Joi.string().min(3).required(),
        complete: Joi.boolean()
    });
    return schema.validate(todo)
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

