require("dotenv").config();

const AWS = require('aws-sdk');

AWS.config.update({
	region: 'us-east-1',
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_KEY
})

const sqs = new AWS.SQS();

(async () => {
	try {
		const queueURL = process.env.AWS_QUEUE_URL;
		const params = {
			DelaySeconds: 1,
			MessageAttributes: {
				id: {
					DataType: "String",
					StringValue: "5"
				},
				name: {
					DataType: "String",
					StringValue: "Eduardo Soprana Coelho"
				}
			},
			MessageBody: "Test...",
			// MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
			// MessageGroupId: "Group1",  // Required for FIFO queues
			QueueUrl: queueURL
		};

		const { MessageId } = await sqs.sendMessage(params).promise();

		console.log("Success: ", MessageId);
	} catch (err) {
		console.log("Error send message: ", err);
	}
})();
