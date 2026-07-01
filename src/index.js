const express = require('express');
const amqplib = require('amqplib');
const {EmailService} = require('./services');
async function connectQueue() {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();

        await channel.assertQueue('noti-queue');

        channel.consume('noti-queue', async (data) => {
    if (!data) return;

    console.log("MESSAGE RECEIVED");

    const object = JSON.parse(data.content.toString());
    console.log("DATA:", object);

    try {
        await EmailService.sendEmail(
            'test@gmail.com',
            object.recepientEmail,
            object.subject,
            object.content
        );

        console.log("EMAIL SENT SUCCESSFULLY");

    } catch (err) {
        console.log("EMAIL ERROR:", err.message);
    }

    channel.ack(data);
});

        console.log("RabbitMQ Consumer Connected");

    } catch (error) {
        console.error("RabbitMQ Connection Error:", error);
        throw error;
    }
}
const apiroutes = require('./routes');
const app = express();
const { ServerConfig, logger } = require('./config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiroutes);
app.listen(ServerConfig.PORT, async () => {
  console.log(`Server is Listening to Port ${ServerConfig.PORT}`);
  await connectQueue();
});