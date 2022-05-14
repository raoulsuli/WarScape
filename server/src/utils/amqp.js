const amqplib = require("amqplib");
const nodemailer = require("nodemailer");
const { AMQP_URL, capitalize } = require("./constants");

const processMessage = async (msg, isProduction, queue) => {
  const auth = { user: "warscape53@gmail.com", pass: "Warscape99/" };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: auth,
  });

  let payload = {};
  let itemType = "";
  let action = "";

  if (isProduction) {
    const items = msg.fields.routingKey.split(".");

    itemType = capitalize(items[0]);
    action = items[1];

    payload = JSON.parse(msg.content.toString());
  } else {
    payload = msg;

    const items = queue.split(".");

    itemType = capitalize(items[0]);
    action = items[1];
  }

  const { size, title, address, city, region, date, email } = payload;
  const subject = `${itemType} ${action}`;
  let text = "";

  if (action === "rent") {
    text = `You have just rented a ${itemType} for ${size} people. The ${itemType} name is ${title} and its address is ${address}, ${city}, ${region}. The date for you rental is ${date}`;
  } else {
    text = `You have just unrented a ${itemType}. The ${itemType} name is ${title} and its address is ${address}, ${city}, ${region}.`;
  }

  await transporter.sendMail({
    from: `WarScape ${auth.user}`,
    to: email,
    subject: subject,
    text: text,
  });
};

module.exports = {
  publish: async (queue, task) => {
    if (process.env.NODE_ENV === "production") {
      const connection = await amqplib.connect(AMQP_URL, "heartbeat=60");
      const channel = await connection.createChannel();

      try {
        await channel.assertQueue(queue, { durable: true });

        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(task)), {
          contentType: "application/json",
          persistent: true,
        });
      } finally {
        await channel.close();
        await connection.close();
      }
    } else {
      processMessage(task, false, queue);
    }
  },
  consume: async () => {
    const connection = await amqplib.connect(AMQP_URL, "heartbeat=60");
    const channels = Array(4).fill(await connection.createChannel());
    const queues = [
      "shelter.rent",
      "border.rent",
      "shelter.unrent",
      "border.unrent",
    ];

    channels.forEach((channel) => channel.prefetch(10));

    process.once("SIGINT", async () => {
      channels.forEach(async (channel) => await channel.close());
      await connection.close();
    });

    channels.forEach(async (channel, index) => {
      const queue = queues[index];

      await channel.assertQueue(queue, { durable: true });

      await channel.consume(
        queue,
        async (msg) => {
          await processMessage(msg, true);
          await channel.ack(msg);
        },
        {
          noAck: false,
          consumerTag: `email_${queue}`,
        }
      );
    });
  },
};
