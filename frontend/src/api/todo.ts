import { API } from "../constants";
import { Todo } from "../types/todo";

// Get all todos
export async function getTodos(): Promise<{ todos: Todo[] }> {
    try {
    let response = await fetch(`${API}/todos`)
    return await response.json();
    } catch(err) {
      return err;
    }
  }


// Create new todo
export async function newTodo(todo): Promise<Todo> {
  try {
    let response = await fetch(`${API}/todos`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        description: todo.description,
        complete: false,
      })
    })
    return await response.json();
  } catch(err) {
    return err
  }
}

// Delete todo
export async function removeTodo(todo): Promise<{ todos: Todo[]}> {
  try {
    let response = await fetch(`${API}/todos/${todo.id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "DELETE",
      body: JSON.stringify({
        description: todo.description,
        complete: true,
      })
    })
    return await response.json();
  } catch(err) {
    return err
  }
}

// Update todo
export async function updateTodo(todo): Promise<Todo> {
  try {
    let response = await fetch(`${API}/todos/${todo.id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "PATCH",
      body: JSON.stringify({
        complete: todo.complete,
      })
    })
    return await response.json();
  } catch(err) {
    return err
  }
}