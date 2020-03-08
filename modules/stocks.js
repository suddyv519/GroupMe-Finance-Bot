exports.process = (message, bot) => {
    const key = process.env.API_KEY;

    if (index != -1) {
        const tickers = message.text.match(/\B[$]\w\w\w\w?\s/g);
        console.log(tickers);
        
        tickers.forEach(t => {
            const ticker = encodeURIComponent(t.trim());
            const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${key}`;
            bot.request.get(url, (error, response, body) => {
                if (error) {
                    bot.sendMessage(`There was an error with the request`);
                    console.log(error);
                } else {
                    const resp = body['Global Quote'];
                    console.log(resp);
                    if (price === "Unknown symbol") {
                        bot.sendMessage(`No price data for ${ticker.toUpperCase()} found`);
                    } else {
                        // bot.sendMessage(`${ticker.toUpperCase()}: $${price}`);
                        bot.sendMessage(resp);
                    }
                }
            });
        });
    }
};
