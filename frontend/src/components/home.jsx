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

const API_URL = process.env.REACT_APP_API_URL;

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const getData = async () => {
      getTodos();
    };
    getData();
  }, []);

  const getTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Hacemos que la variable isComplete sea igual al valor contrario de la variable is_complete
  const handleClick = async (id,isComplete) => {
    try {
      await axios.patch(`${API_URL}/todos/${id}`, {
        is_complete: isComplete,
      });
      await getTodos();
    } catch (err) {
      console.log("epic fail", err);
    }
  };

  const handleNewTodo = async (todo) => {
    try {
      await axios.post(`${API_URL}/todos`, todo);
      await getTodos();
      setModalOpen(false);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      await getTodos();
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h1">Todos</CardTitle>
          <ListGroup>
            {todos.map((todo) => (
                <ListGroupItem key={todo.id} action tag="a">
                  <div className="d-flex w-100 justify-content-between">
                    <div className="form-check">
                      <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={(e) => handleClick(todo.id, e.target.checked)}
                          defaultChecked={todo.is_complete}
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5>{todo.title}</h5>
                      <p className="mb-1">{todo.description}</p>
                      <small>Due: {todo.due_date}</small>
                    </div>
                    <div className="d-flex justify-content-center flex-column">
                      <Button color="danger" size="md" onClick={() => handleDelete(todo.id)}
                              disabled={!todo.is_complete}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </ListGroupItem>
            ))}
          </ListGroup>
          <Button className={"mt-2"} onClick={() => setModalOpen(true)} color="primary">
            Add Todo
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={modalOpen}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          Add new Todo
        </ModalHeader>
        <ModalBody>
          <TodoForm saveTodo={handleNewTodo} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Home;
