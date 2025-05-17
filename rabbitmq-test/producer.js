const amqp = require('amqplib');

async function sendMessages() {
  try {
    const connection = await amqp.connect('amqp://user:password@localhost');
    const channel = await connection.createChannel();
    const queue = 'test_queue';

    await channel.assertQueue(queue, { durable: false });

    for (let i = 1; i <= 5; i++) {
      const message = { id: i, content: `Message numéro ${i}` };
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      console.log(`Message envoyé: ${JSON.stringify(message)}`);
    }

    setTimeout(() => {
      connection.close();
      console.log("Connexion fermée");
    }, 500);
  } catch (error) {
    console.error("Erreur lors de l'envoi des messages:", error);
  }
}

sendMessages();
