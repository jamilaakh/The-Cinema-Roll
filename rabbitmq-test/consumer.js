const amqp = require('amqplib');

async function consumeMessages() {
  try {
    const connection = await amqp.connect('amqp://user:password@localhost');
    const channel = await connection.createChannel();
    const queue = 'test_queue';
    await channel.assertQueue(queue, { durable: false });

    console.log("En attente de messages sur:", queue);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString());
        console.log("Message reçu:", content);

        
        setTimeout(() => {
          console.log("Traitement terminé pour:", content);
          channel.ack(msg);
        }, 2000); 
      }
    });
  } catch (error) {
    console.error("Erreur lors de la réception:", error);
  }
}

consumeMessages();
