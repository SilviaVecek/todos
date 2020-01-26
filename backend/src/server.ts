import express from 'express';
import todos from './data';

const Joi = require('@hapi/joi');
const app = express();
app.use(express.json());

app.get('/api/todos', (req, res) => {
    res.status(200).send({
        todos: todos
    })
})

app.get('/api/todos/:id', (req, res) => {
    const todo = todos.find(c => c.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send("No todos with this ID");
    res.send(todo)
})

// Add
app.post('/api/todos', (req, res) => {
    const { error } = validateTodos(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    const todo = {
        id: todos.length + 1,
        category: req.body.category,
        description: req.body.description,
    }
    todos.push(todo);
    res.send(todo);
})

// Delete
app.delete('/api/todos/:id', (req, res) => {
    const todo = todos.find(c => c.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send("No todos with this ID");
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    res.send(todo);
})

//Update
app.put('/api/todos/:id', (req, res) => {
    const todo = todos.find(c => c.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send("No todos with this ID");
    const { error } = validateTodos(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    todo.category = req.body.category
    todo.description = req.body.description
    res.send(todo)
})

// Update Partial
app.patch('/api/todos/:id', (req, res) => {
    const todo = todos.find(c => c.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send("No todos with this ID");
    if ('category' in req.body) todo.category = req.body.category
    if ('description' in req.body) todo.description = req.body.description
    res.send(todo)
})


function validateTodos(todo) {
    const schema = Joi.object({
        category: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
    });
    return schema.validate(todo)
}

const PORT = process.env.port || 3000;

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

