exports.process = (message, bot) => {
    const trigger = "@stock ";
    const index = message.text.toLowerCase().indexOf(trigger);
    const key = process.env.API_KEY;

    //If we found the string we're looking for get results and send them
    if (index != -1) {
        //Get the string we are searching for.
        const tickers = message.text.match(/\B[$]\w\w\w\w?\s/g);

        //Get the total, encoded URL we're going to pass to API to search
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(ticker.trim())}&apikey=${key}`;
        
        tickers.forEach(ticker => {
            bot.request.get(stockurl, (error, response, body) => {
                if (error) {
                    bot.sendMessage(`There was an error with the request`);
                } else {
                    const response = body['Global Quote'];
                    if (price === "Unknown symbol") {
                        bot.sendMessage(`No price data for ${ticker.toUpperCase()} found`);
                    } else {
                        // bot.sendMessage(`${ticker.toUpperCase()}: $${price}`);
                        bot.sendMessage(body);
                    }
                }
            });
        });
    }
};
