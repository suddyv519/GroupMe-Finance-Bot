exports.process = (message, bot) => {
    const key = process.env.API_KEY;
    const tickers = message.text.match(/\B[$]\w{1,4}\s?/g);

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
                    let resp = JSON.stringify(JSON.parse(body)['Global Quote']).replace(/"([^"]+)":/g, '$1:');
                    resp = resp.slice(1, resp.length - 1);
                    bot.sendMessage(resp);
                }
            });
        });
    }
};
