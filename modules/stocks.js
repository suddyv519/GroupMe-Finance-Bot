exports.process = (message, bot) => {
    const key = process.env.API_KEY;
    console.log(message.text);
    const tickers = message.text.match(/\B[$]\w\w\w\w?\s?/g);
    console.log(tickers);

    if (tickers && tickers.length > 0) {
        tickers.forEach(t => {
            const ticker = encodeURIComponent(t.slice(1).trim());
            const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${key}`;
            bot.request.get(url, (error, response, body) => {
                if (error) {
                    bot.sendMessage(`There was an error with the request`);
                    console.log(error);
                } else {
                    const resp = body['Global Quote'];
                    console.log(resp);
                    // bot.sendMessage(`${ticker.toUpperCase()}: $${price}`);
                    bot.sendMessage(resp);
                }
            });
        });
    }
};
