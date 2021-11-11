import { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    console.log("in useEffect()");
    axios
      .get("http://localhost:3001/api/todos")
      .then((res) => {
        console.log(res);
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function handleClick(id) {
    console.log("clickety-click");
    try {
      await axios.patch(`http://localhost:3001/api/todos/${id}`, {
        is_complete: true,
      });
    } catch (err) {
      console.log("epic fail", err);
    }
  }

  return (
    <>
      <h1>Todos</h1>
      <ListGroup>
        {todos.map((todo) => {
          return (
            <ListGroupItem
              title="Click this to complete."
              key={todo._id}
              action
              onClick={() => handleClick(todo._id)}
              tag="a"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5>{todo.title}</h5>
                <small>Due: {todo.due_date}</small>
              </div>
              <p className="mb-1">{todo.description}</p>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </>
  );
};

export default Home;
