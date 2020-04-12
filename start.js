const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bot = require("./bot.js");
const path = require("path");
const port = process.env.PORT || 3000;
const schedule = require('node-schedule');


bot.initialize({
    bot_ID: process.env.BOT_ID,
    group_ID: process.env.GROUP_ID,
    modules: ["stocks"]
});

app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

let job = schedule.scheduleJob('0 30 9 ? * 1-5', () => {
    bot.sendMessage('Good morning!');
    const indices = ['INX', 'DJIA'];
    indices.forEach(ticker => {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.API_KEY}`;
        bot.request.get(url, (error, response, body) => {
            if (error) {
                bot.sendMessage(`There was an error with the request`);
                console.log(error);
            } else {
                console.log(body);
                let resp = JSON.stringify(JSON.parse(body)['Global Quote']).replace(/"([^"]+)":/g, '$1:');
                resp = resp.slice(1, resp.length - 1);
                bot.sendMessage(resp);
            }
        });
    })
});
console.log(job);

app.post("/", (req, res) => {
    bot.onPost(req, res);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});