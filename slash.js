const { REST } = require('@discordjs/rest');
const { Routes, ChannelType } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
require("dotenv").config();

const main = new SlashCommandBuilder()
    .setName("activity")
    .setDescription("To start a voice channel activity")
    .addStringOption(option => 
        option.setName("type")
            .setDescription("The type of activity you want to start")
            .setRequired(true)
            .addChoice("Watch Together", "youtube_together")
            .addChoice("Poker Night", "poker_night")
            .addChoice("Betrayal.io", "betrayal")
            .addChoice("Fishington.io", "fishington")
            .addChoice("Chess In The Park", "chess_in_the_park")
            .addChoice("Checkers In The Park", "checkers_in_the_park")
            .addChoice("Doodle Crew", "doodlecrew")
            .addChoice("Letter Tile", "lettertile")
            .addChoice("Word Snacks", "wordsnacks")
            .addChoice("SpellCast", "spell_cast")
    )
    .addChannelOption(option => 
        option.setName("ch")
            .setDescription("The channel you want to start an activity in")
            .setRequired(true)
            .addChannelType(ChannelType.GuildVoice)    
    )

const invite = new SlashCommandBuilder()
    .setName("invite")
    .setDescription("To invite this bot to your own discord")

const commands = [
    main,
    invite
]

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
(async () => {
	try {
        if(process.argv[2] == "test") {
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENTID, process.env.TESTGUILDID),
                { body: commands },
            );
            console.log("The test commands have now been registered")
        } else {
            await rest.put(
                Routes.applicationCommands(process.env.CLIENTID),
                { body: commands },
            );
            console.log("The global commands have now been registered")
        }
	} catch (error) {
		console.error(error);
	}
})();