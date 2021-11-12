import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import TodoForm from "./todo-form";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTodo, setNewTodo] = useState({});
  useEffect(() => {
    const getData = async () => {
      getTodos();
    };
    getData();
  }, []);

  const getTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/todos");
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (id) => {
    console.log("clickety-click");
    try {
      await axios.patch(`http://localhost:3001/api/todos/${id}`, {
        is_complete: true,
      });
      await getTodos();
    } catch (err) {
      console.log("epic fail", err);
    }
  };

  const handleNewTodo = async (todo) => {
    debugger;
    console.log("in handleNewTodo()");
    console.log(todo);
    setNewTodo(todo);
    try {
      await axios.post("http://localhost:3001/api/todos", { newTodo });
      await getTodos();
      setModalOpen(false);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h1">Todos</CardTitle>
          <ListGroup>
            {todos.map((todo) => {
              return (
                <ListGroupItem
                  title="Click this to complete."
                  key={todo._id}
                  action
                  tag="a"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={() => handleClick(todo._id)}
                        value="foobar"
                        defaultChecked={todo.is_complete}
                      />
                    </div>
                    <h5>{todo.title}</h5>
                    <small>Due: {todo.due_date}</small>
                  </div>
                  <p className="mb-1">{todo.description}</p>
                </ListGroupItem>
              );
            })}
          </ListGroup>
          <Button onClick={() => setModalOpen(true)} color="primary">
            Add Todo
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={modalOpen} toggle={() => console.log("toggle, toggle")}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          Add new Todo
        </ModalHeader>
        <ModalBody>
          <TodoForm todo={newTodo} saveTodo={handleNewTodo} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Home;
