const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const BotInfo = require("./package.json");

const bot = new Discord.Client({ 
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

require("./util/eventHandler")(bot);

const fs = require("fs-extra");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands", (err, files) => {

    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        return console.log("[LOGS] Couldn't find commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);
    });
});

bot.on("message", async message => {
    //Limited to being only used by myself
    if(message.author.id !== "323504127449759746") return;

    let prefix = botconfig.prefix;
    let args = message.content.split(" ");
    let cmd = args[0].toLowerCase();

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    
    if(commandfile) commandfile.run(bot, message, args);
});

bot.on('messageReactionAdd', async (reaction, user) => {
    let reactionGuild = bot.guilds.cache.get("709844361403301909");
    if (reaction.emoji.name == "👍") {
        if (reaction.message.id !== "709869924696326145") return;
        if (reaction.partial) {
            //If the message this reaction belongs to was removed then fetching might result in an API error
            try {
                await reaction.fetch();
            } catch (error) {
                return console.log('Something went wrong when fetching the message: ', error);
            }
        }
    
        reactionGuild.members.fetch(user.id).then(newMember => {
            newMember.roles.add("123456789123456789");
            newMember.roles.add("987654321987654321");
            let welcEmbed = new Discord.MessageEmbed()
                .setColor("00FF00")
                .setAuthor(`Welcome ${newMember.user.tag}`)
                .setTimestamp()
                .setDescription(`Welcome to the official Dictionary support server! Please make sure to read <#709844592522166433> before chatting so that you follow the rules and chat in the right place.`)
                .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);
            newMember.guild.channels.cache.get('709844569352699904').send(welcEmbed);          
        });
        return;
    } if (reaction.emoji.name == "📣") {
        if (reaction.message.id !== "123456789987654321") return;
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.log('Something went wrong when fetching the message: ', error);
                return;
            }
        }
        reactionGuild.members.fetch(user.id).then(newMember => {
                newMember.roles.add("123456789987654321");
        });
        return;
    } if (reaction.emoji.name == "⏫") {
        if (reaction.message.id !== "123456789987654321") return;
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.log('Something went wrong when fetching the message: ', error);
                return;
            }
        }
        reactionGuild.members.fetch(user.id).then(newMember => {
            newMember.roles.add("123456789987654321");
        });
        return;
    } if (reaction.emoji.name == "🤖") {
        if (reaction.message.id !== "123456789987654321") return;
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.log('Something went wrong when fetching the message: ', error);
                return;
            }
        }
        reactionGuild.members.fetch(user.id).then(newMember => {
            newMember.roles.add("123456789987654321");
        });
        return;
    } else {
        return;
    }
     
});

bot.on('messageReactionRemove', async (reaction, user) => {
    let reactionGuild = bot.guilds.cache.get("123456789987654321");
    if (reaction.emoji.name == "📣") {
        if (reaction.message.id !== "123456789987654321") return;
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.log('Something went wrong when fetching the message: ', error);
                return;
            }
        }
        reactionGuild.members.fetch(user.id).then(newMember => {
                newMember.roles.remove("123456789987654321");
        });
        return;
    } if (reaction.emoji.name == "⏫") {
        if (reaction.message.id !== "123456789987654321") return;
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.log('Something went wrong when fetching the message: ', error);
                return;
            }
        }
        reactionGuild.members.fetch(user.id).then(newMember => {
            newMember.roles.remove("123456789987654321");
        });
        return;
    } if (reaction.emoji.name == "🤖") {
        if (reaction.message.id !== "123456789987654321") return;
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.log('Something went wrong when fetching the message: ', error);
                return;
            }
        }
        reactionGuild.members.fetch(user.id).then(newMember => {
            newMember.roles.remove("123456789987654321");
        });
        return;
    } else {
        return;
    }
     
});

bot.login(botconfig.token);