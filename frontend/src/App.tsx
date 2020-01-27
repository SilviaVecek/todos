import React, { useEffect, useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import { List } from 'antd';
import { getTodos } from './api/todo';
import { Todo } from './types/todo';
const { Search } = Input;

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    (async () => {
      const data = await getTodos()   
      setTodos(data.todos)
    })();
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
        <List
          size="large"
          header={<div>To Do List</div>}
          footer={<div>Add another todo...</div>}
          bordered
          dataSource={todos.map(todo => todo.description)}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </header>
    </div>
  );
}

export default App;
