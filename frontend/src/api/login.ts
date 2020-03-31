import { API } from "../constants";
import { Login } from "../types/login";

// Get all todos
export async function getLoginResponse(login): Promise<Login> {
    try {
        let response = await fetch(`${API}/login`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
            email: login.email,
            password: login.password,
          })
        })
        return await response.json();
      } catch(err) {
        return err
      }
}