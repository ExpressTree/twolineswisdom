const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Pearl Mind Webhook OK"));

app.post("/tv-alert", async (req, res) => {
  try {
    const { symbol, price, signal, time } = req.body;

    const ts = time ? new Date(Number(time)) : new Date();
    const timeText = isNaN(ts.getTime()) ? String(time) : ts.toLocaleString();

    const message =
`🧠 *Pearl Mind Alert*
📊 ${symbol}
📍 Signal: *${signal}*
💰 Price: ${price}
🕒 ${timeText}

⚠️ Educational only. Not financial advice.`;

    await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHANNEL_ID,
        text: message,
        parse_mode: "Markdown"
      }
    );

    res.status(200).send("OK");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("ERROR");
  }
});

app.listen(3000, () => console.log("Pearl Mind Webhook LIVE"));
