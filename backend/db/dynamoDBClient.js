// db/dynamoDBClient.js

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

const dynamoDBClient = new DynamoDBClient({
    region: 'us-east-1',
    // Credentials are not needed when running on AWS, only for local DynamoDB.
    // This is because the AWS SDK will automatically use aws credentials from shell environment variables.
    // credentials: {
    //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    // },
    // endpoint: 'http://host.docker.internal:8000' No need to specify endpoint in AWS, only for local DynamoDB.
    // It will determine the endpoint based on the region.
})

module.exports = { dynamoDBClient };
