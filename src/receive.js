require("dotenv").config();

const AWS = require('aws-sdk');

AWS.config.update({
	region: 'us-east-1',
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_KEY
})

const sqs = new AWS.SQS();

(async () => {
	const queueURL = process.env.AWS_QUEUE_URL;
	const params = {
		AttributeNames: [
			"SentTimestamp"
		],
		MaxNumberOfMessages: 10,
		MessageAttributeNames: [
			"All"
		],
		QueueUrl: queueURL,
		VisibilityTimeout: 1,
		WaitTimeSeconds: 1
	};

	const response = await sqs.receiveMessage(params).promise();

	if (!response.hasOwnProperty("Messages")) {
		console.log("There are no messages");

		return;
	}

	for (const item of response.Messages) {

		console.log(item.Body)

		const deleteParams = {
			QueueUrl: queueURL,
			ReceiptHandle: item.ReceiptHandle
		};

		await sqs.deleteMessage(deleteParams).promise();
	}
})();