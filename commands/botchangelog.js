const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    let dVersion = args[1];
    args.shift();
    args.shift();
    let changelogInfo = args.join(" ");
    let changelogItems = changelogInfo.split("|");

    let updateCount = changelogItems.length;
    let chEmbedBody = "";
    var count = 0;

    function createEmbed() {
        while (count < updateCount) {
            let chEmbedAdd = `**>** ${changelogItems[count]}\n`;
            chEmbedBody += chEmbedAdd;
            count++;
        }
        setTimeout(sendEmbed, 250, chEmbedBody);
    }

    function sendEmbed(chEmbedBody) {

        let chEmbed = new Discord.MessageEmbed()
            .setColor("ACE7FF")
            .setAuthor(`Updates to Dictionary: ${dVersion}`)
            .setTimestamp()
            .setDescription(chEmbedBody)
            .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);
        
            message.guild.channels.cache.get('123456789123456789').send(chEmbed);
            message.delete();
    }
    
    createEmbed();
}

module.exports.config = {
    name: "botchangelog"
}