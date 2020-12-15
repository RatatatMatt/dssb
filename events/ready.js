module.exports = bot => {
    bot.users.fetch("323504127449759746").then(matt => { 
        matt.send(`${bot.user.username} is online!`);
    });
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("over the Dictionary Support Server", {type: "WATCHING"});
    
}