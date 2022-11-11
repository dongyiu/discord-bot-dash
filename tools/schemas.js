const { Schema, model } = require('mongoose');

const Users = new Schema({
	userId: {
		type: String,
		unique: true,
	},
	registeredAt: {
		type: Number,
		default: Date.now(),
	},
	blacklist: {
		state: {
			type: Boolean,
			default: false,
		},
		reason: {
			type: String,
			default: 'N/A',
		},
		blacklistedAt: {
			type: Number,
			default: 0,
		},
	},
	premiumTier: {
		type: Number,
		default: 0,
	},
	vote : {
		points : {
			type :Number,
			default : 0,
		},
		cooldown : {
			type : Number,
			default : 0,
		},
	},
});

const Guilds = new Schema({
	guildId: {
		type: String,
		unique: true,
	},
	registeredAt: {
		type: Number,
		default: Date.now(),
	},
	prefix: {
		type: String,
		default: null,
	},
	blacklist: {
		state: {
			type: Boolean,
			default: false,
		},
		reason: {
			type: String,
			default: 'N/A',
		},
		blacklistedAt: {
			type: Number,
			default: 0,
		},
	},
	premiumTier: {
		type: Number,
		default: 0,
	},
	vote : {
		points : {
			type :Number,
			default : 0,
		},
	},
});

const Heist = new Schema({
	guildId: String,
	partnerGuildId: String,
	partnerGuildName: String,
	postCooldownHours: {
		type: Number,
		default: 12,
	},
	cooldownLeft: {
		type: Number,
		default: 0,
	},
	blacklisted: {
		type: Boolean,
		default: false,
	},
	blacklistedReason: {
		type: String,
		default: null,
	},
	pings: [],
});

const HeistConfig = new Schema({
	guildId: {
		type: String,
		unique: true,
	},
	heistTemplates: [],
	settings: {
		manager_roles: {
			type: [],
			default: [],
		},
		heistChannel: {
			type: String,
			default: null,
		},
		inviteLink: {
			type: String,
			default: null,
		},
		minHeistAmount: {
			type: Number,
			default: 1000000,
		},
	},
	notifs : {
		channel : {
			type : String,
			default : null,
		},
		status : {
			type : Boolean,
			default : false,
		},
	},
});

const Reports = new Schema({
	report_caseId : {
		type: Number,
		unique: true,
	},
	hidden : { type : Boolean, default : false },
	proof : [String],
	reason : String,
	reported_user_id : [String],
	responsible_mod_id : String,
	server_id : String,
	status : String,
	timestamp : Number,
	type : [String],
	appealed_reason : { type:String, default: 'N/A' },
	rejected_reason : { type:String, default: 'N/A' },
});

const DonationConfig = new Schema({
	guildId: {
		type: String,
		unique: true,
	},
	manager_roles: {
		type: [],
		default: [],
	},
	logChannel: {
		type: String,
		default: null,
	},
	unit : {
		type : String,
		default: null,
	},
	autoroles : {
		type : [],
		default : [],
	},
	multi : {
		items : {
			type : Number,
			default : 1,
		},
		coins : {
			type : Number,
			default : 1,
		},
	},
});

const Donations = new Schema({
	userId: {
		type: String,
	},
	guildId: {
		type: String,
	},
	donations: {
		type: Number,
		default: 0,
	},
	giveawayManager: {
		state: {
			type: Boolean,
			default: false,
		},
		logs: {
			logged: {
				type: Number,
				default: 0,
			},
			last_logged: {
				type: Number,
				default: 0,
			},
		},
		onBreak: {
			state: {
				type: Boolean,
				default: false,
			},
			sinceTimestamp: {
				type: Number,
				default: 0,
			},
			Reason: {
				type: String,
				default: 'N/A',
			},
		},
	},

});

const Events = new Schema({
	userId: {
		type: String,
	},
	guildId: {
		type: String,
	},
	donations: {
		type: Number,
		default: 0,
	},
	eventName: {
		type: String,
		required : true,
	},
	giveawayManager: {
		state: {
			type: Boolean,
			default: false,
		},
		logs: {
			logged: {
				type: Number,
				default: 0,
			},
			last_logged: {
				type: Number,
				default: 0,
			},
		},
		onBreak: {
			state: {
				type: Boolean,
				default: false,
			},
			sinceTimestamp: {
				type: Number,
				default: 0,
			},
			Reason: {
				type: String,
				default: 'N/A',
			},
		},
	},

});

const EventsConfig = new Schema({
	eventName : {
		type : String,
		required : true,
	},
	guildId: {
		type: String,
	},
	manager_roles: {
		type: [],
		default: [],
	},
	logChannel: {
		type: String,
		default: null,
	},
	unit : {
		type : String,
		default: null,
	},
	autoroles : {
		type : [],
		default : [],
	},
	multi : {
		items : {
			type : Number,
			default : 1,
		},
		coins : {
			type : Number,
			default : 1,
		},
	},
});

const defaultItems = [
	{ name: 'aetheryxsflower', value: 30000000, aliases: ['flow', 'flower'] },
	{ name: 'alcohol', value: 4500, aliases: ['alc'] },
	{ name: 'ammo', value: 4500000, aliases: [] },
	{ name: 'ant', value: 15000, aliases: [] },
	{ name: 'aplus', value: 2500000, aliases: ['plus'] },
	{ name: 'apple', value: 3500, aliases: [] },
	{ name: 'baby', value: 2000000, aliases: [] },
	{ name: 'banhammer', value: 1000000, aliases: ['hammer'] },
	{ name: 'banknote', value: 95000, aliases: ['bank'] },
	{ name: 'beakerofsusfluid', value: 5000000, aliases: ['beaker', 'sus'] },
	{ name: 'binary', value: 5000000, aliases: ['bin'] },
	{ name: 'blob', value: 1700000000, aliases: [] },
	{ name: 'bluephallicobject', value: 10000, aliases: ['blue'] },
	{ name: 'boar', value: 25000, aliases: [] },
	{ name: 'boltcutters', value: 145000000, aliases: ['bolt'] },
	{ name: 'bottleofwhiskey', value: 3500000, aliases: ['bottle', 'whiskey'] },
	{ name: 'boxofsand', value: 1000, aliases: ['sand'] },
	{ name: 'candy', value: 15000, aliases: [] },
	{ name: 'cellphone', value: 1000, aliases: ['cell', 'phone'] },
	{ name: 'chillpill', value: 15000, aliases: ['pill'] },
	{ name: 'coinbomb', value: 10000, aliases: ['bomb', 'coin'] },
	{ name: 'coins', value: 1000000, aliases: [] },
	{ name: 'commonfish', value: 5000, aliases: ['common', 'fish'] },
	{ name: 'cookie', value: 2500, aliases: ['coo'] },
	{ name: 'corncob', value: 250000, aliases: ['corn'] },
	{ name: 'corndog', value: 250000, aliases: ['dog'] },
	{ name: 'crunchytaco', value: 3500000, aliases: ['taco'] },
	{ name: 'cupidsbigtoe', value: 30000, aliases: ['toe'] },
	{ name: 'dailybox', value: 85000, aliases: ['daily'] },
	{ name: 'dankbox', value: 300000, aliases: ['dank'] },
	{ name: 'deer', value: 12500, aliases: [] },
	{ name: 'dragon', value: 85000, aliases: [] },
	{ name: 'duck', value: 9000, aliases: [] },
	{ name: 'ectoplasm', value: 2500000, aliases: ['ecto'] },
	{ name: 'energydrink', value: 4000000, aliases: ['drink', 'energy'] },
	{ name: 'exoticfish', value: 25000, aliases: ['exo'] },
	{ name: 'fakeid', value: 800, aliases: [] },
	{ name: 'fidgetspinner', value: 5000, aliases: [] },
	{ name: 'fishingbait', value: 4500000, aliases: ['bait'] },
	{ name: 'fishingpole', value: 10000, aliases: ['pole'] },
	{ name: 'flower', value: 28000000, aliases: [] },
	{ name: 'foolsnotif', value: 30000, aliases: ['fool'] },
	{ name: 'freshbread', value: 10000, aliases: ['bread'] },
	{ name: 'friendsgift', value: 250000, aliases: [] },
	{ name: 'garbage', value: 3500, aliases: ['garb'] },
	{ name: 'giftbox', value: 250000, aliases: ['gift'] },
	{ name: 'godbox', value: 8000000, aliases: ['god'] },
	{ name: 'goldenphallicobject', value: 100000, aliases: ['gold', 'golden'] },
	{ name: 'huntingrifle', value: 10000, aliases: [] },
	{ name: 'inventory', value: 1000000, aliases: ['inv'] },
	{ name: 'jackyolanty', value: 4000000, aliases: ['jac', 'jacky'] },
	{ name: 'jellyfish', value: 40000, aliases: ['jelly'] },
	{ name: 'junk', value: 2500, aliases: [] },
	{ name: 'ladybug', value: 25000, aliases: ['lady'] },
	{ name: 'landmine', value: 3500, aliases: [] },
	{ name: 'laptop', value: 1500, aliases: [] },
	{ name: 'lawdegree', value: 5000000, aliases: ['law'] },
	{ name: 'legendaryfish', value: 55000, aliases: ['leg'] },
	{ name: 'lifesaver', value: 8000, aliases: [] },
	{ name: 'likebutton', value: 2000000, aliases: [] },
	{ name: 'luckyhorseshoe', value: 10000, aliases: [] },
	{ name: 'melmsiebeard', value: 35000000, aliases: [] },
	{ name: 'melmsiesbeard', value: 35000000, aliases: ['beard', 'mel'] },
	{ name: 'memebox', value: 150000, aliases: ['meme'] },
	{ name: 'memepills', value: 7000000, aliases: ['pills'] },
	{ name: 'motivationalposter', value: 8000000, aliases: ['poster'] },
	{ name: 'multicoloredphallicobject', value: 4500000, aliases: ['multi'] },
	{ name: 'musicalnote', value: 3500000, aliases: ['music'] },
	{ name: 'normiebox', value: 50000, aliases: ['normie'] },
	{ name: 'oddeye', value: -1000000, aliases: [] },
	{ name: 'orangephallicobject', value: 10000, aliases: ['orange'] },
	{ name: 'padlock', value: 1000, aliases: [] },
	{ name: 'pepecoin', value: 250000, aliases: ['pec', 'pepec'] },
	{ name: 'pepecrown', value: 225000000, aliases: ['cro', 'crown', 'pepecr'] },
	{ name: 'pepemedal', value: 5500000, aliases: ['med', 'pem', 'pepem'] },
	{ name: 'pepestatue', value: 400000, aliases: ['pepes', 'pepest', 'stat', 'statue'] },
	{ name: 'pepetrophy', value: 30000000, aliases: ['pepet', 'tr', 'tro', 'trophy'] },
	{ name: 'petcollar', value: 10000000, aliases: ['collar', 'pet'] },
	{ name: 'pinkphallicobject', value: 5, aliases: ['pink'] },
	{ name: 'pizzaslice', value: 90000, aliases: ['pizza'] },
	{ name: 'policebadge', value: 4000000, aliases: ['badge', 'police'] },
	{ name: 'potato', value: 300000, aliases: ['pot'] },
	{ name: 'purplephallicobject', value: 10000, aliases: ['purp', 'purple'] },
	{ name: 'rabbit', value: 8500, aliases: ['rab'] },
	{ name: 'rarefish', value: 15000, aliases: ['rare', 'raref'] },
	{ name: 'rarepepe', value: 30000, aliases: ['pepe'] },
	{ name: 'reversalcard', value: 2500000, aliases: ['rev', 'reversal'] },
	{ name: 'robbersmask', value: 3500000, aliases: ['mask'] },
	{ name: 'robberswishlist', value: 20000, aliases: ['rob', 'robbers', 'wish', 'wishlist'] },
	{ name: 'santasbag', value: 26000000, aliases: ['sbag'] },
	{ name: 'santashat', value: 30000, aliases: ['hat', 'shat'] },
	{ name: 'seaweed', value: 3000, aliases: ['sea', 'weed'] },
	{ name: 'shopcoupon', value: 6000000, aliases: ['coup', 'coupon', 'shop'] },
	{ name: 'shovel', value: 10000, aliases: ['ovel'] },
	{ name: 'shreddedcheese', value: 10000, aliases: ['cheese', 'eese', 'red', 'shredded'] },
	{ name: 'skunk', value: 6000, aliases: ['sku'] },
	{ name: 'snowball', value: 15000, aliases: ['ball', 'snow'] },
	{ name: 'spider', value: 150000, aliases: ['spid'] },
	{ name: 'stack', value: 9000000, aliases: [] },
	{ name: 'stackofcash', value: 12000000, aliases: ['cash', 'stack'] },
	{ name: 'stickbug', value: 25000, aliases: ['bug', 'stick'] },
	{ name: 'stonkmachine', value: 10000000, aliases: ['machine', 'stonk'] },
	{ name: 'tidepod', value: 7000, aliases: ['pod', 'tide'] },
	{ name: 'tipjar', value: 7000000, aliases: ['jar', 'tip'] },
	{ name: 'trash', value: 10000, aliases: ['ash'] },
	{ name: 'useddiaper', value: 2000000, aliases: ['diaper', 'used'] },
	{ name: 'vaccine', value: 6500000, aliases: ['vacc'] },
	{ name: 'winninglotteryticket', value: 30000000, aliases: ['lott', 'lottery', 'lotto', 'ticket', 'win', 'winning'] },
	{ name: 'worm', value: 3000, aliases: [] },
];

const GuildItems = new Schema({
	guildId: {
		type: String,
		unique: true,
	},
	itemValues: {
		type: [],
		default: defaultItems,
	},
});

module.exports = {
    Users: model('Users', Users),
    Guilds: model('Guilds', Guilds),
    Heist: model('Heist', Heist),
    HeistConfig: model('HeistConfig', HeistConfig),
	Reports : model('Reports', Reports),
	DonationConfig : model('DonationConfig', DonationConfig),
	Donations: model('Donations', Donations),
	Events: model('Events', Events),
	EventsConfig: model('EventsConfig', EventsConfig),
	GuildItems: model('GuildItems', GuildItems)
}