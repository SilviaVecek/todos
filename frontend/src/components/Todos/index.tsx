import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Input, List, Row, Col, Button } from 'antd';
import { PlusCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { getTodos, newTodo, removeTodo, updateTodo } from '../../api/todo';
import { Todo } from '../../types/todo';
const ButtonGroup = Button.Group;

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState(false);
  useEffect(() => {
    (async () => {
      const data = await getTodos()   
      setTodos(data.todos)
    })();
  }, [])

  const addTodo = async e => {
    const response = await newTodo({description: e.target.value});
    let spreadTodos = [...todos, response];
    setTodos(spreadTodos);
    setInput(false);
  };

  const deleteTodo = () => {
    const completedTodos = todos.filter(todo => todo.complete === true);
    const incompleteTodos = todos.filter(todo => todo.complete === !true)
    completedTodos.map(item => removeTodo({id: item.id, complete: true}));
    setTodos(incompleteTodos);
  }

  const markCompleted = async (id, complete) => {
    const response = await updateTodo({id: id, complete: !complete});
    setTodos([...todos.filter(item => item.id !== id), response])
  }

  const showInput = () => {
    setInput(true)
  }

  const closeInput = () => {
    setInput(false)
  }

  const showComplete = () => {
    setTodos(todos.filter(item => item.complete))
  }

  const showIncomplete = () => {
    setTodos(todos.filter(item => !item.complete))
  }

  const sortedTodos = [...todos].sort((a, b) => a.id > b.id ? 1 : -1)
  const blue = '#1890ff'
  return (
    <div className="App">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col md={12}>
          <List
            size="large"
            header={<div className="App-header">To Do List</div>}
            bordered
            dataSource={sortedTodos}
            renderItem={item => 
            <List.Item style={{display: 'flex', textDecoration: item.complete ? 'line-through' : 'none', justifyContent: 'flex-start'}}>
              <Button
                icon={item.complete && <CloseOutlined style={{color: '#d9d9d9'}}/>}
                type="default"
                style={{visibility: 'visible', fontSize: '10px', padding: '0px', height: '18px', width: '18px', marginRight: '10px'}} 
                onClick={() => markCompleted(item.id, item.complete)}>
              </Button>
              {item.description}
            </List.Item>}
          />
          {input &&
          <>
            <Input autoFocus size="large" placeholder="create a todo..." allowClear onPressEnter={addTodo}/>
            <CloseCircleOutlined style={{position: 'absolute', fontSize: '25px', marginLeft: '10px', marginTop: '7px', color: blue}} 
              onClick={closeInput} />
          </>}
          <PlusCircleOutlined onClick={showInput} 
          style={{fontSize: '30px', display: 'flex', margin: '20px auto 0px auto', color: blue, justifyContent: 'center'}}/>
          <ButtonGroup style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <Button onClick={showIncomplete}>Show incomplete</Button>
            <Button onClick={showComplete}>Show complete</Button>
            <Button onClick={deleteTodo}>Remove All Completed Todos</Button>
          </ButtonGroup>        
        </Col>  
      </Row>  
    </div>
  );
}

export default Todos;
