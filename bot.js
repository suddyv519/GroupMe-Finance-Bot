const req = require("request");
const modules = [];
const bot = {
    request: req,
    api_url: "https://api.groupme.com/v3/bots/",
    bot_ID: "",
    group_ID: "",
    sendMessage(text) {
        const toSend = `${bot.api_url}post?bot_id=${bot.bot_ID}&text=${encodeURIComponent(text)}`;
        bot.request.post(toSend, (error, response, body) => {
            if (error) {
                console.log(error);
            }
        });
    }
};

exports.onPost = (req, res) => {
    const message = {
        text: req.body.text,
        user: req.body.sender_id,
        is_bot: req.body.sender_type === "bot"
    };
    modules.forEach((moduleOn) => {
        moduleOn.process(message, bot);
    });
    res.end();
};

exports.initialize = (values) => {
    //Error checking
    let errors = false;
    if (!values.bot_ID) {
        console.log("Please initialize with a bot_ID");
        errors = true;
    }
    if (!values.group_ID) {
        console.log("Please intialize with a group_ID");
        errors = true;
    }
    if (!values.modules || values.modules.length < 1) {
        console.log("Please initialize with at least one module");
        errors = true;
    }
    if (errors)
        return;
    //We didn't have any errors, load the values.
    bot.bot_ID = values.bot_ID;
    bot.group_ID = values.group_ID;
    //Load the modules, if possible.
    let modulesLoaded = "";
    values.modules.forEach((value, index) => {
        try {
            const moduleOn = require(`./modules/${value}.js`);
            modules[index] = moduleOn;
            if (modulesLoaded)
                modulesLoaded += `, ${value}`;
            else modulesLoaded = value;
        } catch (error) {
            console.log(error);
            console.log(`Module ${value} not found.`);
            return;
        }
    });
    
    console.log(`Successfully initialized the bot, with bot_ID: ${bot.bot_ID}, group_ID: ${bot.group_ID}, and modules ${modulesLoaded}`);
};