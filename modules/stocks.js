exports.process = (message, bot) => {
    const trigger = "@stock ";
    const index = message.text.toLowerCase().indexOf(trigger);

    //If we found the string we're looking for get results and send them
    if (index != -1) {
        //Get the string we are searching for.
        const ticker = message.text.substring(index + trigger.length);
        //Get the total, encoded URL we're going to pass to IEX to search
        const stockurl = `https://api.iextrading.com/1.0/stock/${encodeURIComponent(ticker)}/price`;
        
        //only send request if ticker is a proper length
        if (ticker.length <= 5) {
            //Get the IEX result, and send it, if found
            bot.request.get(stockurl, (error, response, body) => {
                if (error) {
                    bot.sendMessage(`There was an error with the request`);
                } else {
                    const price = body;
                    if (price === "Unknown symbol") {
                        bot.sendMessage(`No price data for ${ticker.toUpperCase()} found`);
                    } else {
                        bot.sendMessage(`${ticker.toUpperCase()}: $${price}`);
                    }
                }
            });
        }
    }
};
