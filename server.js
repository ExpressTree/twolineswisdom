const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/tv-alert", async (req, res) => {
    const data = req.body;

    const message = `
🚨 *${data.signal} SIGNAL*
📊 ${data.symbol}
💰 Price: ${data.price}
🕒 ${data.time}
    `;

    // TELEGRAM
    await axios.post(`https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage`, {
        chat_id: "<YOUR_CHANNEL_ID>",
        text: message,
        parse_mode: "Markdown"
    });

    res.send("OK");
});

app.listen(3000, () => console.log("Webhook running"));
