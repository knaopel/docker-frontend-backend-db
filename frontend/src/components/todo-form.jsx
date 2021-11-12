import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const TodoForm = ({ todo, saveTodo }) => {
  const [title, setTitle] = useState(todo.title || "");
  const [description, setDescription] = useState(todo.description || "");
  const [dueDate, setDueDate] = useState(todo.due_date || "");

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const onSubmit = () => {
    saveTodo({ title, description, due_date: dueDate });
  };

  return (
    <Form>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter a title"
          type="text"
          value={title}
          onChange={onTitleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          id="description"
          name="description"
          placeholder="Enter a Description"
          type="textarea"
          value={description}
          onChange={onDescriptionChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="duedate">Due Date</Label>
        <Input
          id="duedate"
          name="duedate"
          type="date"
          value={dueDate}
          onChange={onDueDateChange}
        />
      </FormGroup>
      <Button color="primary" onClick={onSubmit}>Save</Button>
    </Form>
  );
};
export default TodoForm;
