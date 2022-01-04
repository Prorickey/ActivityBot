const { Client, Intents, MessageEmbed } = require('discord.js')
const fetch = require("node-fetch")
require('dotenv').config()

const bot = new Client({
    presence:{
        status:"online",
        activities:[
            {
                name:"Starting Activities for you",
                type:"PLAYING"
            }
        ]
    },
    intents:[
        Intents.FLAGS.GUILDS
    ]
});

const applications = {
    "youtube_together": "880218394199220334",
    "fishington": "814288819477020702",
    "chess_in_the_park": "832012774040141894",
    "checkers_in_the_park": "832013003968348200",
    "betrayal": "773336526917861400",
    "doodlecrew": "878067389634314250",
    "wordsnacks": "879863976006127627",
    "lettertile": "879863686565621790",
    "poker_night": "755827207812677713",
    "spell_cast": "852509694341283871"
}

bot.on("ready", () => {
    console.log(bot.user.tag + " is now online.")
})

bot.on("interactionCreate", async (data) => {
    if(!data.isApplicationCommand()) return;
    if(data.commandName == "activity") {
        const ch = bot.channels.cache.get(data.options.get("ch", true).value)
        let inviteData = await fetch(`https://discord.com/api/v8/channels/${ch.id}/invites`, {
            method: 'POST',
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: applications[data.options.get("type", true).value],
                target_type: 2,
                temporary: false
            }),
            headers: {
                "Authorization": `Bot ${process.env.TOKEN}`,
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
        let invite = `https://discord.gg/${inviteData.code}`
        const embed = new MessageEmbed()
        embed.setThumbnail(`https://cdn.discordapp.com/app-icons/${inviteData.target_application.id}/${inviteData.target_application.icon}.png`)
        switch(data.options.get("type", true).value) {
            case "youtube_together": {
                embed.setTitle("Watch Together")
                embed.setDescription(`Hop into a voice channel and watch the funniest compilations, listen to the best songs or sit back with some popcorn and watch a movie.\n\n[Click to join](${invite})`)
                embed.setColor("#FF2E2E")
                break
            }

            case "poker_night": {
                embed.setTitle("Poker Night")
                embed.setColor("#4034FD")
                embed.setDescription(`Join the game and go against up to 7 other players in a game of Poker.\n\n[Click to join](${invite})`)
                break
            }
            case "betrayal": {
                embed.setTitle("Betrayal.io")
                embed.setColor("#FDE534")
                embed.setDescription(`You and your friends as crewmates must complete your duties but among you there is a betrayer, get rid of them before they kill you.\n\n[Click to join](${invite})`)
                break
            }
            case "fishington": {
                embed.setTitle("Fishington")
                embed.setColor("#34C5FD")
                embed.setDescription(`After a long day, go out and cast your line to catch fish with your friends. Complete quests and level up.\n\n[Click to join](${invite})`)
                break
            }
            case "chess_in_the_park": {
                embed.setTitle("Chess in the Park")
                embed.setColor("#735330")
                embed.setDescription(`Come play a relaxing game of chess with your friend in a totally *real* park.\n\n[Click to join](${invite})`)
                break
            }
            case "checkers_in_the_park": {
                embed.setTitle("Checkers in the Park")
                embed.setColor("#FFE2B9")
                embed.setDescription(`Come play a relaxing game of checkers with your friend in a totally *real* park.\n\n[Click to join](${invite})`)
                break
            }
            case "doodlecrew": {
                embed.setTitle("Doodle Crew")
                embed.setColor("WHITE")
                embed.setDescription(`Test your drawing skills while your friends guess what your drawing.\n\n[Click to join](${invite})`)
                break
            }
            case "wordsnacks": {
                embed.setTitle("World Snacks")
                embed.setColor("#FDDE5D")
                embed.setDescription(`Team up with your friends to make as many words as possible with just a few letters.\n\n[Click to join](${invite})`)
                break
            }
            case "lettertile": {
                embed.setTitle("Letter Tile")
                embed.setColor("#FDA45D")
                embed.setDescription(`Go up against your friends and take turns placing letters on a board to make words.\n\n[Click to join](${invite})`)
                break
            }
            case "spell_cast": {
                embed.setTitle("Spell Cast")
                embed.setColor("#5D75FD")
                embed.setDescription(`Take turns on trying to find words in sequences of adjacent letters, certain letters will give you more points and some even have gems.\n\n[Click to join](${invite})`)
                break
            }
        }
        data.reply({embeds:[embed]})
    } else if(data.commandName == "invite") {
        const embed = new MessageEmbed()
            .setTitle("Click to add to your server")
            .setDescription()
            .setColor("#FF4B4B")
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENTID}&permissions=0&scope=applications.commands%20bot`)
        data.reply({embeds:[embed]})
    }
})

bot.login(process.env.TOKEN);