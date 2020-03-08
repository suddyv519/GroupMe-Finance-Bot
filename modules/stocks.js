exports.process = (message, bot) => {
    const key = process.env.API_KEY;
    const tickers = message.text.match(/\B[$]\w\w\w\w?\s?/g);

    if (tickers && tickers.length > 0) {
        tickers.forEach(t => {
            const ticker = encodeURIComponent(t.slice(1).trim());
            console.log(ticker);
            const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${key}`;
            bot.request.get(url, (error, response, body) => {
                if (error) {
                    bot.sendMessage(`There was an error with the request`);
                    console.log(error);
                } else {
                    console.log(body);
                    const resp = JSON.parse(body)['Global Quote'];
                    // bot.sendMessage(`${ticker.toUpperCase()}: $${price}`);
                    bot.sendMessage(JSON.stringify(resp));
                }
            });
        });
    }
};
