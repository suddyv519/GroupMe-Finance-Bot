exports.process = (message, bot) => {
    if (message.is_bot) {
        return;
    }
    const is_arbys = message.text.toLowerCase().indexOf("@arbys") != -1;
    if (!is_arbys) {
        return;
    }
    bot.sendMessage("All I heard was medium drink and large curly fries.");
};