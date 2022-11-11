const express = require('express');
const session = require("express-session");
const bodyparser = require("body-parser");
const path = require("path");
const ejs = require("ejs");
const passport = require("passport");
const { Strategy } = require("passport-discord");
const { clientID, clientSecret, callbackURL, token, mongo_url, errors, invite_link } = require("./settings.js")
const { render, authenticate } = require("./tools/functions.js")
const { Intents, Client, Permissions, Options, MessageEmbed, Collection } = require("discord.js")
const app = express();
const { readFileSync } = require('fs');
const { Users, Guilds, Heist, HeistConfig, Reports, DonationConfig, Donations, Events, EventsConfig, GuildItems } = require("./tools/schemas.js")
const mongoose = require('mongoose');
const prettyMilliseconds = require('pretty-ms');
const io = require("socket.io-client");
let topHeist = [] || [{ name : 'test', timeStamp : Number(Date.now() - (10 * 60 * 1000)) }, { name : 'test', timeStamp : Number(Date.now() - (30 * 60 * 1000)) }]
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS
    ],
    shards : 'auto',
    failIfNotExists: false,
})
client.cookies = new Collection()

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res => {
    console.log("Connected to the database.")
})

client.on("ready", () => console.log("Bot is connected to discord. "))
client.on("shardReady", id => console.log(`Connected to shard ${id}. ${client.user.tag}`))

client.login(token)

app.use(bodyparser.json())
    .use(bodyparser.urlencoded({ extended: true }))
    .engine("html", ejs.renderFile)
    .set('view engine', 'ejs')
    .use(express.static(path.join(__dirname, "/public")))
    .use(session({
        secret: "life_is_shot_so_live_like_you_gonna_die_trmmrow",
        resave: false,
        saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session());

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((obj, done) => { done(null, obj); });

passport.use(new Strategy({
    clientID,
    clientSecret,
    callbackURL,
    scope: ["identify", "guilds"],
}, function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        return done(null, profile);
    });
}))

const ioClient = io.connect("http://107.152.41.246:8000");

ioClient.on("heist", (msg) => topHeist.unshift(msg));

app.get('/', function (req, res) {
    render(req, res, "index.ejs", { invite_link })
});

app.get("/error", function (req, res) {
    let status = req.query.status
    if (!status || !errors[status]) status = 404
    render(req, res, "error.ejs", { status, message: errors[status] });
})

app.get("/login", passport.authenticate("discord", { failureRedirect: "/" }), async function (req, res) {
    if (!req.user.id || !req.user.guilds) {
        res.redirect("/");
    } else {
        client.cookies.set(req.session.id, req.user.id)
        res.redirect("/");
    }
});

app.get("/heists", function (req, res) {
    if(topHeist.length > 50) {
        topHeist = topHeist.slice(0, 50)
    }
    return render(req, res, "heists.ejs", { topHeist });
});
app.get('/partnersearch', async function (req, res) {
    return render(req, res, "partnersearch.ejs", { bot: client, Permissions, user: req.user });
});

app.get('/partnersearch/:id', async function (req, res) {
    return render(req, res, "partnerInfo.ejs", { bot: client, Permissions, user: req.user, guildId: req.params.id, query: req.query });
});

app.get("/dashboard", async function (req, res) {
    if (!req.user) return res.redirect("/login")
    const userData = await Users.findOne({ userId: req.user.id })
    if (userData?.blacklist.state) return res.redirect("/error?status=403")

    render(req, res, "dashboard.ejs", { bot: client, Permissions, invite_link });
});

app.get("/dashboard/:id", async function (req, res) {
    if (!req.user) return res.redirect("/")
    const userData = await Users.findOne({ userId: req.user.id })
    if (userData?.blacklist.state) return res.redirect("/error?status=403")

    const guildData = await Guilds.findOne({ guildId: req.params.id })
    if (guildData?.blacklist.state) return res.redirect("/error?status=01")

    let server = req.user.guilds.find(x => x.id === req.params.id)

    if (!client.guilds.cache.get(req.params.id) || !server || !(new Permissions(server.permissions.toString())).toArray().includes("MANAGE_GUILD")) return res.redirect("/error?status=404")

    let heistConf = await HeistConfig.findOne({ guildId: req.params.id })
    if (!heistConf) heistConf = await (new HeistConfig({ guildId: req.params.id })).save()

    const partnersList = await Heist.find({ guildId: req.params.id })
    return render(req, res, "heist_menu.ejs", { bot: client, guild_id: req.params.id, partnersList, prettyMilliseconds, heistConf: heistConf, route : 'dashboard', guildId: req.params.id, action : 'heistSettings' });
});

app.get("/dashboard/:id/:action", async function (req, res) {
    if (!req.user) return res.redirect("/")
    const userData = await Users.findOne({ userId: req.user.id })
    const action = req.params.action
    if (userData?.blacklist.state) return res.redirect("/error?status=403")

    let guildData = await Guilds.findOne({ guildId: req.params.id })
    if(!guildData) guildData = await new Guilds({ guildId: req.params.id }).save()
    if (guildData?.blacklist.state) return res.redirect("/error?status=01")

    let server = req.user.guilds.find(x => x.id === req.params.id)

    if (!client.guilds.cache.get(req.params.id) || !server || !(new Permissions(server.permissions.toString())).toArray().includes("MANAGE_GUILD")) return res.redirect("/error?status=404")

    let heistConf = await HeistConfig.findOne({ guildId: req.params.id })
    if (!heistConf) heistConf = await (new HeistConfig({ guildId: req.params.id })).save()

    const partnersList = await Heist.find({ guildId: req.params.id })
    
    try {
        switch(action) {
            case 'donoSettings':
                handleDonoSettings()
                break;
            case 'donoLb' :
                handleDonoLb()
                break;
            case 'donoItems' :
                handleDonoItems()
                break;
            default :
                render(req, res, "heist_menu.ejs", { bot: client, guild_id: req.params.id, partnersList, prettyMilliseconds, heistConf: heistConf, route : 'dashboard', guildId: req.params.id, action, guildData });
                break;
        }
    }
    catch(e) {
        console.log(e)
        let status = req.query.status
        if (!status || !errors[status]) status = 404
        return render(req, res, "error.ejs", { status, message: errors[status] });
    }
    async function handleDonoItems() {
        let items = await GuildItems.findOne({ guildId: req.params.id })
        if(!items) items = await new GuildItems({ guildId: req.params.id }).save()
        render(req, res, "heist_menu.ejs", { items, bot: client, guild_id: req.params.id, prettyMilliseconds, route : 'dashboard', action });
    }
    async function handleDonoLb() {
        const members = await client.guilds.cache.get(req.params.id).members.fetch(0)
        let dono = await Donations.find({ guildId: req.params.id }).limit(500)
        render(req, res, "heist_menu.ejs", { dono, members, bot: client, guild_id: req.params.id, prettyMilliseconds, route : 'dashboard', action });
    }
    async function handleDonoSettings() {
        let donoconfig = await DonationConfig.findOne({ guildId: req.params.id });
        if(!donoconfig) donoconfig = await new DonationConfig({ guildId: req.params.id }).save()
        render(req, res, "heist_menu.ejs", { bot: client, guild_id: req.params.id, prettyMilliseconds, route : 'dashboard', action, donoconfig });
    }
    // return render(req, res, "heist_menu.ejs", { members, bot: client, guild_id: req.params.id, partnersList, prettyMilliseconds, heistConf: heistConf, route : 'dashboard', guildId: req.params.id, action, guildData });
});

app.get("/commands", function (req, res) {
    render(req, res, "commands.ejs", { commands: require("./tools/commands.js") });
});

const middleWare = async (req, res, next) => {
    if(!await getUser(client, req, res)) return
    next()
}

app.post('/save_settings', middleWare, async function (req, res) {
    const body = req.body
    const foundGuild = await DonationConfig.findOne({ guildId: body.guild_id })
    foundGuild.manager_roles = body.manager
    foundGuild.logChannel = body.log
    foundGuild.autoroles = (body.data || [])
    await foundGuild.save()
    return res.send({ success: true })
});

app.get("/appeal", async function (req, res) {
    if (!req.user) return res.redirect("/login")
    let foundServer = await Guilds.find({ "blacklist.state" : true })
    let foundUser = await Users.findOne({ userId : req.user?.id })
    let reported = await Reports.find({ reported_user_id : req.user?.id , status : 'verified'})
    let supportBan = await client.guilds.cache.get('826391353277284362')?.bans.fetch(0)
    supportBan?.has(req.user?.id) ? supportBan = true : supportBan = false
    reported.length ? reported = true : reported = false
    foundServer = foundServer.map(a => a.guildId).join(' ');
    render(req, res, "appeal.ejs", { bot: client, banned : foundUser.blacklist.state ,reported ,serverBan : foundServer, supportBan });
})

app.post("/appeal", middleWare, async function (req, res) {
    try {
        let type = null;
        const banType = req.body.banType;
        const banReason = req.body.banReason;
        const appealText = req.body.appealText;
        const futureActions = req.body.futureActions;
        const user = req.user;
        banType.includes('bot') ? type = 'bot' : banType.includes('global') ? type = 'global' : Number(banType) > 0 ? type = 'server' : type = 'invalid';

        const embed = new MessageEmbed().setTitle('Def Appeal');
        embed.setDescription([
            `User : <@${user.id}> - (\`${user.id}\`)`,
            `Tag : ${user.username}#${user.discriminator}`
        ].join('\n')).setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`).setColor("RANDOM");
    
        embed.addField('What are you appealing, a bot ban, server ban or global ban?', banType)
        embed.addField('Why were you banned?', banReason)
        embed.addField('Why you think you should be accepted?', appealText)
        embed.addField('What you will do to prevent a reoccurrence of the behaviour that led up to your ban?', futureActions)

        if(type == 'global') {
            client.channels.cache.get('911649577579446285').send({ embeds : [embed] })
        }
        else {
            client.channels.cache.get('869485804504903700').send({ embeds : [embed] })
        }
        
        let status = 0
        render(req, res, "error.ejs", { status, message: errors[status] });
    }
    catch (e) {
        console.log(e)
        let status = 405
        render(req, res, "error.ejs", { status, message: errors[status] });
    }

})


app.post("/show_guild_form", async function (req, res) {
    let file = readFileSync(path.resolve('views/partials/guild_settings_form.ejs'), 'utf-8');
    let rawhtml = ejs.render(file, { bot: client, guildData: req.body, prettyMilliseconds });

    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(rawhtml));
});

function checkNotif(foundGuild, client) {
    if(!foundGuild.notifs?.status) return false;
    if(!client.channels.cache.get(foundGuild.notifs?.channel)) return false
    return true;
}

function sendEmbed(client, channel, type, guildId, pGuildId, others) {
    try {
        let changes = null
        const chan = client.channels.cache.get(channel);
        const guild = client.guilds.cache.get(guildId);
        const partnerGuild = client.guilds.cache.get(pGuildId);
        if(type == 'reset') {
            changes = `${partnerGuild.name} - (\`${pGuildId}\`) cooldown has been reset.`
        }
        else if(type == 'editPings') {
            changes = [`${guild.name} - (\`${guild.id}\`) has modified the pings.`,
            `**New Changes :**`,
            `Pings : ${others.length ? others.map(a => a.name).join(', ') : '-'}`].join('\n')
        }
        else if(type == 'blacklist') {
            changes = `${partnerGuild.name} - (\`${pGuildId}\`) has been ${others === 'true' ? 'blacklisted' : 'unblacklisted'}.`
        }
        else if(type == 'cooldown') {
            changes = [`${guild.name} - (\`${guild.id}\`) has modified the cooldown.`,
            `**New Changes :**`,
            `Cooldown : ${others}h`].join('\n')
        }
        else if(type == 'remove') {
            changes = `${partnerGuild.name} - (\`${pGuildId}\`) has been removed from partner.`
        }
        else if(type == 'add') {
            changes = `${partnerGuild.name} - (\`${pGuildId}\`) has been added to partner.`
        }
        else if(type == 'channel') {
            changes = [
                `**New Changes :**`,
                `Heist Channel : <#${others}>`
            ].join('\n')
        }
        else if(type == 'amount') {
            changes = [
                `**New Changes :**`,
                `Minimum Heist Amount : ${Number(others).toLocaleString()}`
            ].join('\n')
        }
        else if(type == 'link') {
            changes = [
                `**New Changes :**`,
                `Invite Link : ${others}`
            ].join('\n')
        }
        chan.send({
            embeds: [
                new MessageEmbed()
                    .setAuthor(`${guild.name} notifications`, guild.iconURL({ dynamic: true }))
                    .setThumbnail(guild.iconURL({ dynamic: true }))
                    .setColor('#FEC8D8')
                    .addField('From :', `${guild.name} - (\`${guildId}\`)`)
                    .addField('Info :', changes),
            ],
        }).catch(e => e);
        return;
        
    }
    catch(e) { console.log(e); }
}

function parterList(heistP, client, type, others) {
    if(!heistP.length) return;
    heistP.map(async a => {
        const heistConf = await HeistConfig.findOne({ guildId: a.partnerGuildId })
        if(checkNotif(heistConf, client)) {
            sendEmbed(client, heistConf.notifs.channel, type, a.guildId, a.partnerGuildId, others)
        }
    })
}

async function getUser(client, req, res) {
    const foundUser = client.cookies.get(req.session.id)
    if(!foundUser) {
        res.sendStatus(401)
        return false
    }
    return (await client.users.fetch(foundUser))
}
app.post("/save_guild_form", middleWare, async function (req, res) {
    const body = req.body;
    const guildData = await Heist.findOne({ guildId: body.guild_id, partnerGuildId: body.partnerGuildId })
    const foundGuild = await HeistConfig.findOne({ guildId: body.partnerGuildId })
    let saveData = false;

    //remove partner
    if (body?.delete === "true") {
        guildData.delete();
        if(checkNotif(foundGuild, client)) {
            sendEmbed(client, foundGuild.notifs.channel, 'remove', body.guild_id, body.partnerGuildId);
        }
        return res.send({ success: true })
    }

    //reset cooldown
    if (body.cooldown_left === "0") {
        guildData.cooldownLeft = 0
        if(checkNotif(foundGuild, client)) {
            sendEmbed(client, foundGuild.notifs.channel, 'reset', body.guild_id, body.partnerGuildId);
        }
        saveData = true
    }

    //edit pings
    if (JSON.stringify(body?.pings?.map(x => x.roleId).sort() || []) !== JSON.stringify(guildData.pings.map(x => x.roleId).sort())) {
        const guild = client.guilds.cache.get(body.partnerGuildId)
        guildData.pings = (body.pings || []).map(x => {
            if(x.name === "@everyone") x.totalMembers = guild.memberCount
            else if(x.name === "@here") x.totalMembers = null
            else x.totalMembers = guild.members.cache.filter(member => member.roles.cache.has(x.roleId.match(/\d+/)[0]))?.size || null
            return x
        })
        if(checkNotif(foundGuild, client)) {
            sendEmbed(client, foundGuild.notifs.channel, 'editPings', body.guild_id, body.partnerGuildId, guildData.pings);
        }
        saveData = true
    }

    //blacklist
    if ((body.blacklisted === "false" ? false : true) !== guildData.blacklisted) {
        guildData.blacklisted = (body.blacklisted === "false" ? false : true)
        if(checkNotif(foundGuild, client)) {
            sendEmbed(client, foundGuild.notifs.channel, 'blacklist', body.guild_id, body.partnerGuildId, body.blacklisted);
        }
        saveData = true
    }

    //edit cooldown
    if (Number(body.default_cooldown) !== guildData.postCooldownHours && Number(body.default_cooldown) > 0) {
        guildData.postCooldownHours = Number(body.default_cooldown)
        if(checkNotif(foundGuild, client)) {
            sendEmbed(client, foundGuild.notifs.channel, 'cooldown', body.guild_id, body.partnerGuildId, body.default_cooldown);
        }
        saveData = true
    }

    if (saveData) guildData.save()
    return res.send({ success: true })
});

app.post("/guild_settings", middleWare, async (req, res) => {
    const body = req.body;
    let heistConf = await HeistConfig.findOne({ guildId: body.guild_id })
    const heistP = await Heist.find({ guildId: body.guild_id })
    let saveChanges = false

    // change channel
    if (body.channel && body.channel !== heistConf.settings.heistChannel) {
        heistConf.settings.heistChannel = body.channel
        parterList(heistP, client, 'channel', body.channel)
        saveChanges = true
    }

    //inv link
    if (body.invite_link !== heistConf.settings.inviteLink) {
        heistConf.settings.inviteLink = body.invite_link
        const code = body.invite_link.split('/').pop()
        const links = await client.guilds.cache.get(body.guild_id).invites.fetch(0)
        if(links.has(code)) {
            parterList(heistP, client, 'link', body.invite_link)
            saveChanges = true
        }
    }

    //minimum amount
    if (Number(body.min_heist_amount) !== heistConf.settings.minHeistAmount) {
        heistConf.settings.minHeistAmount = Number(body.min_heist_amount)
        parterList(heistP, client, 'amount', body.min_heist_amount)
        saveChanges = true
    }

    //notifs
    if (body.notifs !== heistConf.notifs.channel) {
        heistConf.notifs.channel = body.notifs
        // parterList(heistP, client, 'amount', body.min_heist_amount)
        heistConf.notifs.status = true 
        saveChanges = true
    }

    if (saveChanges) heistConf.save()
    return res.redirect("/dashboard/" + body.guild_id)
})

app.post("/addserver", middleWare, async (req, res) => {
    const body = req.body
    const guild = client.guilds.cache.get(body.partner_server_id) || await client.guilds.fetch(body.partner_server_id).catch(err => { })
    const foundGuild = await HeistConfig.findOne({ guildId: body.partner_server_id })

    if (!guild) return res.send({ success: false, error: "You can not add this server as partner server." })
    if(body.guild_id == body.partner_server_id ) return res.send({ success: false, error: "You can not add your own server." })
    if (await Heist.findOne({ guildId: body.guild_id, partnerGuildId: body.partner_server_id })) return res.send({ success: false, error: "This server is already in your partner server list." })

    let guildData = (new Heist({
        guildId: body.guild_id,
        partnerGuildId: body.partner_server_id,
        partnerGuildName: guild.name || "Unknown",
        pings: []
    })).save()

    if(checkNotif(foundGuild, client)) {
        sendEmbed(client, foundGuild.notifs.channel, 'add', body.guild_id, body.partner_server_id);
    }

    return res.send({ success: true, data: guildData })
})

app.get("/logout", async (req, res) => {
    req.session.destroy(() => {
        req.logout();
        res.redirect("/");
    });
})

app.get("/invite", (req, res) => {
    return res.redirect(invite_link)
})

app.get("*", function (req, res) {
    let status = req.query.status
    if (!status || !errors[status]) status = 404
    render(req, res, "error.ejs", { status, message: errors[status] });
})

app.post("/test", function (req, res) {
    return res.send("hello")
})
app.listen(8080);
console.log('Server is listening on port 8080');