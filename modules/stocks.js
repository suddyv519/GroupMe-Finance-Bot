exports.process = (message, bot) => {
    const toSearchFor = "@stock ";
    const index = message.text.toLowerCase().indexOf(toSearchFor);

    //If we found the string we're looking for get results and send them
    if (index != -1) {
        //Get the string we are searching for.
        const ticker = message.text.substring(index + toSearchFor.length);
        console.log(ticker);
        //Get the total, encoded URL we're going to pass to IEX to search
        const stockurl = `https://api.iextrading.com/1.0/stock/${encodeURIComponent(ticker)}/price`;
        
        //Get the IEX result, and send it, if found
        bot.request.get(stockurl, (error, response, body) => {
            const price = JSON.parse(body)["data"];
            if (error) {
                bot.sendMessage("No price data found");
            } else {
                console.log(`${ticker}=>${price}`);
                bot.sendMessage(price);
            }
        });
    }
};