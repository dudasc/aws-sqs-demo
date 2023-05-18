# aws-sqs-demo
Example of sending and receiving messages and queues in AWS SQS.

**Steps to install**

1 - Install using yarn

    yarn install 

2 - Configure the enviroment variables in .env file

    AWS_REGION=sa-east-1
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_KEY=
    AWS_QUEUE_URL=https://sqs.sa-east-1.amazonaws.com/680251201371/queue-demo

**How to use?**

1 - Run application

Send message:

    yarn send

Receive message

    yarn receive