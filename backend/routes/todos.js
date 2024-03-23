// Documentation here: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/example_dynamodb_Query_section.html
// routes/todos.js
const express = require("express");
const {
  ScanCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand
} = require("@aws-sdk/lib-dynamodb");
const { dynamoDBClient } = require("../db/dynamoDBClient.js");
const docClient = DynamoDBDocumentClient.from(dynamoDBClient);
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const TABLE_NAME = "TodosTable";
// GET all todos
router.get("/", async (req, res) => {
  const params = {
    TableName: TABLE_NAME,
  };

  try {
    const data = await docClient.send(new ScanCommand(params))
    res.send(data.Items);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// GET todo based on ID
router.get("/:id", async (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id: req.params.id }
  };
  try {
    const data = await docClient.send(new GetCommand(params));
    res.send(data.Item);
  } catch (err) {
    console.error(err);
    res.status(404).send({ error: "Todo does not exist!" });
  }
});
// POST create new todo
router.post("/", async (req, res) => {
  const item = {
    id: uuidv4(), // Generate a unique UUID
    title: req.body.title,
    description: req.body.description,
    is_complete: req.body.is_complete || false,
    due_date: req.body.due_date || new Date().toISOString(),
  };
  const params = {
    TableName: TABLE_NAME,
    Item: item,
  };

  try {
    await docClient.send(new PutCommand(params));
    res.send(item);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
// UPDATE todo
router.patch("/:id", async (req, res) => {
  const updateKeys = Object.keys(req.body);
  const updateExpression = updateKeys.map((key) => `${key} = :${key}`).join(', ');
  const expressionAttributeValues = {};
  updateKeys.forEach((key) => {
    expressionAttributeValues[`:${key}`] = req.body[key];
  });

  const params = {
    TableName: TABLE_NAME,
    Key: { id: req.params.id },
    UpdateExpression: `set ${updateExpression}`,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const data = await docClient.send(new UpdateCommand(params));
    res.send(data.Attributes);
  } catch (err) {
    console.error(err);
    res.status(404).send({ error: "Todo does not exist!" });
  }
});
// DELETE todo
router.delete("/:id", async (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id: req.params.id },
  };

  try {
    await docClient.send(new DeleteCommand(params));
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(404).send({ error: "Todo does not exist!" });
  }
});

module.exports = router;
