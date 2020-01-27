import { API } from "../constants";
import { Todo } from "../types/todo";

export async function getTodos(): Promise<{ todos: Todo[] }> {
    try {
    let response = await fetch(`${API}/todos`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await response.json();
    } catch(err) {
      return err;
    }
  }