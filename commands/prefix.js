const { workingColor, errorColor, successColor, neutralColor, langdb } = require("../config.json");
const Discord = require("discord.js");

module.exports = {
  name: "prefix",
  description: "Gives the author the appropriate prefix for their language(s).",
  aliases: ["langprefix", "languageprefix"],
  usage: "prefix",
  cooldown: 15,
  channelWhiteList: ["549894938712866816", "624881429834366986", "730042612647723058", "749391414600925335"],
  async execute(strings, message) {
    const executedBy = strings.executedBy.replace("%%user%%", message.author.tag)
    //message.delete();
    const embed = new Discord.MessageEmbed()
      .setColor(workingColor)
      .setAuthor(strings.moduleName)
      .setTitle(strings.loading)
      .setDescription(strings.loadingRoles)
      .setFooter(executedBy);
    message.channel.send(embed)
      .then(async msg => {
        var userLangs = []
        var prefixes = ""

        await message.member.roles.cache.forEach(async r => {
          if (r.name.startsWith("Chinese")) { userLangs.push("🇨🇳"); msg.react("🇨🇳"); userLangs.push("🇹🇼"); msg.react("🇹🇼"); userLangs.push("🇭🇰"); msg.react("🇭🇰") }
          if (langdb.includes(r.name.split(" ")[0])) {
            var langdbEntry = langdb[r.name.split(" ")[0]]
            await userLangs.push(langdbEntry.emoji)
            await msg.react(langdbEntry.emoji)
          }
        })

        /*if (message.member.roles.cache.some(r => r.name.startsWith("Bulgarian"))) { userLangs.push("🇧🇬"); msg.react("🇧🇬") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Chinese"))) { userLangs.push("🇨🇳"); msg.react("🇨🇳"); userLangs.push("🇹🇼"); msg.react("🇹🇼"); userLangs.push("🇭🇰"); msg.react("🇭🇰") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Czech"))) { userLangs.push("🇨🇿"); msg.react("🇨🇿") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Danish"))) { userLangs.push("🇩🇰"); msg.react("🇩🇰") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Dutch"))) { userLangs.push("🇳🇱"); msg.react("🇳🇱") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Finnish"))) { userLangs.push("🇫🇮"); msg.react("🇫🇮") }
        if (message.member.roles.cache.some(r => r.name.startsWith("French"))) { userLangs.push("🇫🇷"); msg.react("🇫🇷") }
        if (message.member.roles.cache.some(r => r.name.startsWith("German"))) { userLangs.push("🇩🇪"); msg.react("🇩🇪") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Greek"))) { userLangs.push("🇬🇷"); msg.react("🇬🇷") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Italian"))) { userLangs.push("🇮🇹"); msg.react("🇮🇹") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Japanese"))) { userLangs.push("🇯🇵"); msg.react("🇯🇵") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Korean"))) { userLangs.push("🇰🇷"); msg.react("🇰🇷") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Norwegian"))) { userLangs.push("🇳🇴"); msg.react("🇳🇴") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Polish"))) { userLangs.push("🇵🇱"); msg.react("🇵🇱") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Portuguese"))) { userLangs.push("🇵🇹"); msg.react("🇵🇹") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Brazilian"))) { userLangs.push("🇧🇷"); msg.react("🇧🇷") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Russian"))) { userLangs.push("🇷🇺"); msg.react("🇷🇺") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Spanish"))) { userLangs.push("🇪🇸"); msg.react("🇪🇸") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Swedish"))) { userLangs.push("🇸🇪"); msg.react("🇸🇪") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Thai"))) { userLangs.push("🇹🇭"); msg.react("🇹🇭") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Turkish"))) { userLangs.push("🇹🇷"); msg.react("🇹🇷") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Ukrainian"))) { userLangs.push("🇺🇦"); msg.react("🇺🇦") }
        if (message.member.roles.cache.some(r => r.name.startsWith("Pirate"))) { userLangs.push("☠"); msg.react("☠") }
        if (message.member.roles.cache.some(r => r.name.startsWith("LOLCAT"))) { userLangs.push("🐱"); msg.react("🐱") }*/

        setTimeout(() => {
          msg.react("❎")
          if (userLangs.length < 1) {
            const embed = new Discord.MessageEmbed()
              .setColor(errorColor)
              .setAuthor(strings.moduleName)
              .setTitle(strings.errors.noLanguages)
              .setFooter(executedBy);
            msg.edit(embed)
            return;
          }


          const embed = new Discord.MessageEmbed()
            .setColor(neutralColor)
            .setAuthor(strings.moduleName)
            .setTitle(strings.react)
            .setDescription(strings.reactTimer)
            .addFields({ name: strings.previewT, value: strings.noChanges })
            .setFooter(executedBy);
          msg.edit(embed)

          const filter = (reaction, reacter) => {
            return (userLangs.includes(reaction.emoji.name) || reaction.emoji.name === "✅" || reaction.emoji.name === "❎") && reacter.id === message.author.id;
          };

          const collector = msg.createReactionCollector(filter, { time: 20000 });

          collector.on('collect', (reaction, reacter) => {
            msg.react("✅")
            if (reaction.emoji.name === "✅") {
              msg.reactions.removeAll()
              if (prefixes.length > 0) {
                message.member.setNickname("[" + prefixes + "] " + message.member.user.username)
                  .then(() => {
                    const embed = new Discord.MessageEmbed()
                      .setColor(successColor)
                      .setAuthor(strings.moduleName)
                      .setTitle(strings.saved)
                      .addFields({ name: strings.previewT, value: "\`[" + prefixes + "] " + message.member.user.username + "\`" })
                      .setFooter(executedBy);
                    msg.edit(embed)
                  })
                  .catch(err => {
                    const embed = new Discord.MessageEmbed()
                      .setColor(errorColor)
                      .setAuthor(strings.moduleName)
                      .setTitle(strings.errors.error)
                      .setDescription(err)
                      .addFields({ name: strings.previewT, value: "\`[" + prefixes + "] " + message.member.user.username + "\`" })
                      .setFooter(executedBy);
                    msg.edit(embed)
                  })
              } else {
                const embed = new Discord.MessageEmbed()
                  .setColor(errorColor)
                  .setAuthor(strings.moduleName)
                  .setTitle(strings.errors.confirmedNoFlags + strings.errors.notSaved)
                  .setFooter(executedBy);
                msg.edit(embed)
              }
            } else if (reaction.emoji.name === "❎") {
              msg.reactions.removeAll()
              prefixes = "n"
              const embed = new Discord.MessageEmbed()
                .setColor(successColor)
                .setAuthor(strings.moduleName)
                .setTitle(strings.errors.cancelled + strings.errors.notSaved)
                .addFields({ name: strings.newNickT, value: strings.noChanges })
                .setFooter(executedBy);
              msg.edit(embed)
            } else {
              const valueToRemove = reaction.emoji.name
              userLangs = userLangs.filter(item => item !== valueToRemove)
              if (prefixes.length > 0) { prefixes = (prefixes + "-") }
              prefixes = (prefixes + reaction.emoji.name)
              const embed = new Discord.MessageEmbed()
                .setColor(neutralColor)
                .setAuthor(strings.moduleName)
                .setTitle(strings.react)
                .setDescription(strings.reactTimer2)
                .addFields({ name: strings.previewT, value: "\`[" + prefixes + "] " + message.member.user.username + "\`" })
                .setFooter(executedBy);
              msg.edit(embed)
            }
          });

          collector.on('end', collected => {
            msg.reactions.removeAll()
            if (prefixes === "n") { return; }
            if (prefixes.length > 0) {
              if (message.member.nickname === ("[" + prefixes + "] " + message.member.user.username)) {
                message.member.setNickname("[" + prefixes + "] " + message.member.user.username)
                  .then(() => {
                    const embed = new Discord.MessageEmbed()
                      .setColor(successColor)
                      .setAuthor(strings.moduleName)
                      .setTitle(strings.saved)
                      .addFields({ name: strings.newNickT, value: "\`[" + prefixes + "] " + message.member.user.username + "\`" })
                      .setFooter(executedBy);
                    msg.edit(embed)
                  })
                  .catch(err => {
                    const embed = new Discord.MessageEmbed()
                      .setColor(errorColor)
                      .setAuthor(strings.moduleName)
                      .setTitle(strings.errors.error)
                      .setDescription(err)
                      .addFields({ name: strings.previewT, value: "\`[" + prefixes + "] " + message.member.user.username + "\`" })
                      .setFooter(executedBy);
                    msg.edit(embed)
                    console.log(err)
                  })
              } else {
                const embed = new Discord.MessageEmbed()
                  .setColor(successColor)
                  .setAuthor(strings.moduleName)
                  .setTitle(strings.errors.alreadyThis + strings.errors.notSaved)
                  .addFields({ name: strings.newNickT, value: strings.noChanges })
                  .setFooter(executedBy);
                msg.edit(embed)
              }
            } else {
              const embed = new Discord.MessageEmbed()
                .setColor(errorColor)
                .setAuthor(strings.moduleName)
                .setTitle("Prefix")
                .setDescription(strings.errors.timeOut + strings.errors.notSaved)
                .addFields({ name: strings.newNickT, value: strings.noChanges })
                .setFooter(executedBy);
              msg.edit(embed)
            }
          })
        }, 1000)

      })

  }
}