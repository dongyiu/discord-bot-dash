module.exports =   [
  {
    name: 'dono-setup',
    aliases: [ 'ds' ],
    description: 'track donations in your server!!',
    usage: '-',
    category: 'Donations',
    example: 'N/A'
  },
  {
    name: 'dono-setup manager',
    aliases: [ 'm' ],
    description: 'allow user with these role to add/remove donation!',
    usage: '<role ids>',
    category: 'Donations',
    example: 'dono-setup manager 867329534750621726'
  },
  {
    name: 'dono-setup logs',
    aliases: [ 'logging' ],
    description: 'set channel for donation logs!',
    usage: '<channel id>',
    category: 'Donations',
    example: 'dono-setup logs <#123456789>'
  },
  {
    name: 'dono-setup unit',
    aliases: [ 'u' ],
    description: 'set unit for donation!',
    usage: '<unit>',
    category: 'Donations',
    example: 'N/A'
  },
  {
    name: 'dono-setup item',
    aliases: undefined,
    description: 'setup the donation system!',
    usage: '[command] [subcommand]',
    category: 'Donations',
    example: 'N/A'
  },
  {
    name: 'dono-setup roleadd',
    aliases: [ 'ra' ],
    description: 'add role for auto roles',
    usage: '<amount>,<role>',
    category: 'Donations',
    example: 'dono-setup roleadd 20e6 806545885060137002'
  },
  {
    name: 'dono-setup roleremove',
    aliases: [ 'rr' ],
    description: 'remove role for auto roles',
    usage: '<amount>,<role>',
    category: 'Donations',
    example: 'dono-setup roleremove 20e6 806545885060137002'
  },
  {
    name: 'dono-setup autoroles',
    aliases: [ 'ar' ],
    description: 'view auto roles',
    usage: '-',
    category: 'Donations',
    example: 'N/A'
  },
  {
    name: 'dono',
    aliases: [],
    description: 'track donations in your server!!',
    usage: '-',
    category: 'Donations',
    example: 'N/A'
  },
  {
    name: 'dono check',
    aliases: [ 'c' ],
    description: "check someone's donation",
    usage: '<user>',
    category: 'Donations',
    example: 'dono check @AssassiN#1234'
  },
  {
    name: 'dono add',
    aliases: [ 'a' ],
    description: 'add donations to someone!',
    usage: '<user>,<amount>',
    category: 'Donations',
    example: 'dono add @AssassiN#1234 1e6'
  },
  {
    name: 'dono remove',
    aliases: [ 'r' ],
    description: "remove from someone's donations!",
    usage: '<user>,<amount>',
    category: 'Donations',
    example: 'dono remove @AssassiN#1234 1e6'
  },
  {
    name: 'dono leaderboard',
    aliases: [ 'lb', 'top' ],
    description: 'check the donation leaderboard!',
    usage: '-',
    category: 'Donations',
    example: 'N/A'
  },
  {
    name: 'dono reset',
    aliases: [ 'res' ],
    description: 'Reset someones donation if they are in the server',
    usage: '<user>',
    category: 'Donations',
    example: 'dono reset @AssassiN#1234'
  },
  {
    name: 'dono forcereset',
    aliases: [ 'fr' ],
    description: "Reset a member's donation if they're not in the server.",
    usage: '<userId>',
    category: 'Donations',
    example: 'dono reset 833713876628406363'
  },
  {
    name: 'dono item',
    aliases: [ 'i' ],
    description: 'View item value for donation',
    usage: '<item>',
    category: 'Donations',
    example: 'item pepe'
  },
  {
    name: 'dono itemadd',
    aliases: [ 'ia' ],
    description: 'Add an item',
    usage: '<item>,<value>,[...aliases]',
    category: 'Donations',
    example: 'dono itemadd pepe 25000'
  },
  {
    name: 'dono itemremove',
    aliases: [ 'ir' ],
    description: 'Remove an item',
    usage: '<item>',
    category: 'Donations',
    example: 'dono itemremove pepe'
  },
  {
    name: 'dono itemlist',
    aliases: [ 'il' ],
    description: 'shows full list of items',
    usage: '-',
    category: 'Donations',
    example: 'N/A'
  },
  {
    name: 'event-setup',
    aliases: [ 'es' ],
    description: 'track donations in your server!!',
    usage: '<event name>',
    category: 'Donations',
    example: 'event-setup abc'
  },
  {
    name: 'event-setup manager',
    aliases: [ 'm' ],
    description: 'allow user with these role to add/remove donation from this event!',
    usage: '<event name>,<role ids>',
    category: 'Donations',
    example: 'event-setup manager abc 867329534750621726'
  },
  {
    name: 'event-setup logs',
    aliases: [ 'logging' ],
    description: 'set channel for donation logs!',
    usage: '<event name>,<channel id>',
    category: 'Donations',
    example: 'event-setup logs abc <#123456789>'
  },
  {
    name: 'event-setup unit',
    aliases: [ 'u' ],
    description: 'set unit for donation!',
    usage: '<unit>',
    category: 'Donations',
    example: 'N/A'
  },
  {
    name: 'event-setup roleadd',
    aliases: [ 'ra' ],
    description: 'add role for auto roles',
    usage: '<event name>,<amount>,<role>',
    category: 'Donations',
    example: 'event-setup roleadd abc 20e6 806545885060137002'
  },
  {
    name: 'event-setup roleremove',
    aliases: [ 'rr' ],
    description: 'remove role for auto roles',
    usage: '<event name>,<amount>,<role>',
    category: 'Donations',
    example: 'event-setup roleremove abc 20e6 806545885060137002'
  },
  {
    name: 'event-setup autoroles',
    aliases: [ 'ar' ],
    description: 'view auto roles',
    usage: '<event Name>',
    category: 'Donations',
    example: 'event-setup autoroles abc'
  },
  {
    name: 'event',
    aliases: [],
    description: 'track events donations in your server!!',
    usage: '-',
    category: 'Donations',
    example: 'N/A'
  },
  {
    name: 'event create',
    aliases: undefined,
    description: 'create an event',
    usage: '<event name>',
    category: 'Donations',
    example: 'event create abc'
  },
  {
    name: 'event delete',
    aliases: undefined,
    description: 'delete an event',
    usage: '<event name>',
    category: 'Donations',
    example: 'event delete abc'
  },
  {
    name: 'event check',
    aliases: [ 'c' ],
    description: "check someone's donation",
    usage: '<event name>,<user>',
    category: 'Donations',
    example: 'event check abc @AssassiN#1234'
  },
  {
    name: 'event add',
    aliases: [ 'a' ],
    description: 'add donations to someone!',
    usage: '<event name>,<user>,<amount>',
    category: 'Donations',
    example: 'event add abc @AssassiN#1234 1e6'
  },
  {
    name: 'event remove',
    aliases: [ 'r' ],
    description: "remove from someone's donations!",
    usage: '<event name>,<user>,<amount>',
    category: 'Donations',
    example: 'event remove owo @AssassiN#1234 1e6'
  },
  {
    name: 'event leaderboard',
    aliases: [ 'lb', 'top' ],
    description: 'check the donation leaderboard!',
    usage: '<event name>',
    category: 'Donations',
    example: 'event leaderboard owo'
  },
  {
    name: 'event reset',
    aliases: [ 'r' ],
    description: "Reset a member's donation",
    usage: '<event name>,<user>',
    category: 'Donations',
    example: 'event reset abc @AssassiN#1234'
  },
  {
    name: 'event forcereset',
    aliases: [ 'fr' ],
    description: "Reset a member's donation if they're not in the server.",
    usage: '<event name>,<userId>',
    category: 'Donations',
    example: 'event forcereset abc 783306479721512960'
  },
  {
    name: 'heist',
    aliases: [ 'h' ],
    description: 'Shows top 10 most recent heists. Use subcommands to manage heist partners.',
    usage: '[subcommand]',
    category: 'Heist',
    example: 'N/A'
  },
  {
    name: 'heist partners',
    aliases: [ 'partner', 'p' ],
    description: 'show all partner server',
    usage: '-',
    category: 'Heist',
    example: 'N/A'
  },
  {
    name: 'heist stats',
    aliases: [ 'st', 'stat' ],
    description: 'show all partner server',
    usage: '-',
    category: 'Heist',
    example: 'N/A'
  },
  {
    name: 'heist partneradd',
    aliases: [ 'a', 'add' ],
    description: 'add a partner server',
    usage: '<serverId>,<cooldownHours>,<pings>',
    category: 'Heist',
    example: 'heist partnersadd 875235222751412246 12 everyone here 875598003111596032'
  },
  {
    name: 'heist partnerremove',
    aliases: [ 'r', 'remove' ],
    description: 'remove a partner server',
    usage: '<serverId>',
    category: 'Heist',
    example: 'heist partnerremove 71918074431170150'
  },
  {
    name: 'heist partneredit',
    aliases: [ 'e', 'edit' ],
    description: 'edit a partner server',
    usage: '<serverId>',
    category: 'Heist',
    example: 'heist partneredit 71918074431170150'
  },
  {
    name: 'heist partnerinfo',
    aliases: [ 'i', 'info' ],
    description: 'Show information about a partner',
    usage: '<serverId>',
    category: 'Heist',
    example: 'heist partnerinfo 71918074431170150'
  },
  {
    name: 'heist setup',
    aliases: [ 's' ],
    description: 'Setting up channel to post heist',
    usage: '<channel Id>,<server Link>,<amount>',
    category: 'Heist',
    example: 'heist setup 803091044526456832 https://discord.gg/trades 25'
  },
  {
    name: 'heist blacklist',
    aliases: [ 'bl' ],
    description: 'Blacklist a server from posting heist in your server',
    usage: '<server id>,<reason>',
    category: 'Heist',
    example: 'heist blacklist 803091044526456832 scam'
  },
  {
    name: 'heist unblacklist',
    aliases: [ 'unbl' ],
    description: 'Remove blacklist',
    usage: '<server id>,<reason>',
    category: 'Heist',
    example: 'heist unblacklist 803091044526456832 appealed'
  },
  {
    name: 'heist reset',
    aliases: [ 'r' ],
    description: 'reset cooldown for a partner to post heist',
    usage: '<server id>',
    category: 'Heist',
    example: 'heist reset 803091044526456832'
  },
  {
    name: 'heist setupedit',
    aliases: [ 'se' ],
    description: 'Setting up channel to post heist',
    usage: '-',
    category: 'Heist',
    example: 'N/A'
  },
  {
    name: 'heist notification',
    aliases: [ 'notifications', 'n' ],
    description: 'Setting up channel to receive notification',
    usage: '-',
    category: 'Heist',
    example: 'N/A'
  },
  {
    name: 'heist webhookadd',
    aliases: [ 'webadd', 'wa' ],
    description: 'add webhook link to receive heist ads from all server',
    usage: '<webhook link>',
    category: 'Heist',
    example: 'heist webhookadd https://discord.com/api/webhooks/891328928218775612/4BGaJz1HMUOfOoQbeSOEgaSlGw_ZNwAjvrbmszwui9xowQjREW2-8jW0yfBnu23cYCA6'
  },
  {
    name: 'heist webhooktoggle',
    aliases: [ 'webtoggle', 'wt' ],
    description: 'toggle between on and off for heist ads to send through the webhook',
    usage: '-',
    category: 'Heist',
    example: 'N/A'
  },
  {
    name: 'heist webhookdelete',
    aliases: [ 'webremove', 'webdelete', 'wd' ],
    description: 'delete webhook link',
    usage: '-',
    category: 'Heist',
    example: 'N/A'
  },
  {
    name: 'heist id',
    aliases: [ 'dev' ],
    description: 'Show information about a partner (developer)',
    usage: '<server Id>',
    category: 'Heist',
    example: 'heist id 803091044526456832'
  },
  {
    name: 'heist memberoverlap',
    aliases: [ 'overlap', 'compare', 'mo', 'abc' ],
    description: 'Show information about a partner',
    usage: '<server Id>',
    category: 'Heist',
    example: 'heist id 803091044526456832'
  },
  {
    name: 'heisttemplate',
    aliases: [ 'ht' ],
    description: 'Create heist ad templates',
    usage: '<item>',
    category: 'Heist',
    example: 'item pepe'
  },
  {
    name: 'heisttemplate create',
    aliases: [ 'c' ],
    description: 'Create a template',
    usage: '<ad>',
    category: 'Heist',
    example: 'heist-template create ad here'
  },
  {
    name: 'heisttemplate delete',
    aliases: [ 'd' ],
    description: 'Delete a template',
    usage: '<number>',
    category: 'Heist',
    example: 'heist-template delete 1'
  },
  {
    name: 'postheist',
    aliases: [ 'ph' ],
    description: 'Post your heist ad to all servers.',
    usage: '-',
    category: 'Heist',
    example: 'N/A'
  },
  {
    name: 'help',
    aliases: [],
    description: 'View command or subcommand help',
    usage: '[command],[command subcommand]',
    category: 'Information',
    example: 'N/A'
  },
  {
    name: 'info',
    aliases: [ 'botinfo', 'stats' ],
    description: 'Information about the bot',
    usage: '-',
    category: 'Information',
    example: 'N/A'
  },
  {
    name: 'invite',
    aliases: [ 'support', 'inv' ],
    description: 'invite the bot',
    usage: '-',
    category: 'Information',
    example: 'N/A'
  },
  {
    name: 'ping',
    aliases: [ 'pong' ],
    description: 'pong!!',
    usage: '-',
    category: 'Information',
    example: 'N/A'
  },
  {
    name: 'ping more',
    aliases: [ 'm', 'mo' ],
    description: 'Check bot latency',
    usage: '-',
    category: 'Information',
    example: 'N/A'
  },
  {
    name: 'ping extra',
    aliases: [ 'e', 'ex' ],
    description: 'Something Extra',
    usage: '[message]',
    category: 'Information',
    example: 'N/A'
  },
  {
    name: 'premium',
    aliases: [ 'p' ],
    description: 'Purchase premium',
    usage: '-',
    category: 'Premium',
    example: 'N/A'
  },
  {
    name: 'premium add',
    aliases: [ 'a' ],
    description: 'add premium to a server',
    usage: '<serverId>',
    category: 'Premium',
    example: 'premium add 719180744311701505'
  },
  {
    name: 'premium remove',
    aliases: [ 'r' ],
    description: 'remove premium from a server',
    usage: '<serverId>',
    category: 'Premium',
    example: 'premium add 719180744311701505'
  },
  {
    name: 'premium claim',
    aliases: [ 'c' ],
    description: 'claim your premium perms in support server',
    usage: '-',
    category: 'Premium',
    example: 'N/A'
  },
  {
    name: 'premium list',
    aliases: [ 'l' ],
    description: 'View list of premiumed server',
    usage: '-',
    category: 'Premium',
    example: 'N/A'
  },
  {
    name: 'item',
    aliases: [],
    description: 'Check or set item prices',
    usage: '<item>',
    category: 'Reports',
    example: 'item pepe'
  },
  {
    name: 'item edit',
    aliases: [ 'set' ],
    description: 'Edit item price',
    usage: '<item>,<new_price>',
    category: 'Reports',
    example: 'item edit pepe 25000'
  },
  {
    name: 'item add',
    aliases: undefined,
    description: 'Add an item',
    usage: '<item>,<value>,<category>,[...aliases]',
    category: 'Reports',
    example: 'item add pepe 25000'
  },
  {
    name: 'item remove',
    aliases: undefined,
    description: 'Remove an item',
    usage: '<item>',
    category: 'Reports',
    example: 'item remove pepe'
  },
  {
    name: 'item list',
    aliases: undefined,
    description: 'shows full list of items',
    usage: '-',
    category: 'Reports',
    example: 'N/A'
  },
  {
    name: 'item categories',
    aliases: [ 'category' ],
    description: 'shows list of item category',
    usage: '-',
    category: 'Reports',
    example: 'N/A'
  },
  {
    name: 'report',
    aliases: [ 'reports' ],
    description: 'Submit a report',
    usage: '[page]',
    category: 'Reports',
    example: 'reports 6'
  },
  {
    name: 'report view',
    aliases: [ 'v' ],
    description: 'view a specific report',
    usage: '<reportId>',
    category: 'Reports',
    example: 'report view 666'
  },
  {
    name: 'report submit',
    aliases: [ 's' ],
    description: 'submit a new report',
    usage: '<submit>',
    category: 'Reports',
    example: 'submit'
  },
  {
    name: 'report edit',
    aliases: [ 'e' ],
    description: 'edit an existing report',
    usage: '<report id>',
    category: 'Reports',
    example: 'edit 3'
  },
  {
    name: 'report delete',
    aliases: [ 'del' ],
    description: 'delete a pending report',
    usage: 'delete <report id>',
    category: 'Reports',
    example: 'delete 1'
  },
  {
    name: 'report verify',
    aliases: [ 'v' ],
    description: 'verify a report',
    usage: 'verify <report id>',
    category: 'Reports',
    example: 'verify 1'
  },
  {
    name: 'report reject',
    aliases: [ 'r' ],
    description: 'reject a report',
    usage: 'reject <report id>',
    category: 'Reports',
    example: 'reject 1'
  },
  {
    name: 'report appealed',
    aliases: [ 'appeal', 'a' ],
    description: 'change report status to appealed',
    usage: 'appeal <report id>',
    category: 'Reports',
    example: 'appeal 1'
  },
  {
    name: 'report hide',
    aliases: undefined,
    description: '',
    usage: '-',
    category: 'Reports',
    example: 'N/A'
  },
  {
    name: 'settings',
    aliases: [],
    description: 'view globalban settings',
    usage: '-',
    category: 'Reports',
    example: 'N/A'
  },
  {
    name: 'settings autoban',
    aliases: undefined,
    description: 'turn on/off for global ban',
    usage: '<type>,<true/false>',
    category: 'Reports',
    example: 'settings autoban dmc true'
  },
  {
    name: 'settings modrole',
    aliases: undefined,
    description: 'user with this role can submit a report',
    usage: '[role ids]',
    category: 'Reports',
    example: 'settings modrole 806545885060137002 806545885060137002'
  },
  {
    name: 'setprefix',
    aliases: [],
    description: 'Set the guild prefix!',
    usage: '<prefix>',
    category: 'Utility',
    example: 'setprefix d!'
  },
  {
    name: 'sticky',
    aliases: [ 's', 'stick' ],
    description: 'Create a sticky message',
    usage: '-',
    category: 'Utility',
    example: 'N/A'
  },
  {
    name: 'sticky create',
    aliases: [ 'c' ],
    description: 'Create a sticky message',
    usage: '<channelId>,<content>',
    category: 'Utility',
    example: 'sticky create 719180744311701505 abc def'
  },
  {
    name: 'sticky delete',
    aliases: [ 'del' ],
    description: 'Delete a sticky message',
    usage: '<channelId>',
    category: 'Utility',
    example: 'sticky delete 719180744311701505'
  },
  {
    name: 'sticky on',
    aliases: [ 'true' ],
    description: 'Turn on a sticky message',
    usage: '<channelId>',
    category: 'Utility',
    example: 'sticky on 719180744311701505'
  },
  {
    name: 'sticky off',
    aliases: [ 'false' ],
    description: 'Turn off a sticky message',
    usage: '<channelId>',
    category: 'Utility',
    example: 'sticky off 719180744311701505'
  },
  {
    name: 'sticky roleadd',
    aliases: [ 'ra', 'add' ],
    description: 'Add dropdown roles to sticky',
    usage: '<channelId>,<role ids>',
    category: 'Utility',
    example: 'sticky roleadd 719180744311701505 880690901318500372'
  },
  {
    name: 'sticky roleremove',
    aliases: [ 'rr', 'remove' ],
    description: 'Add dropdown roles to sticky',
    usage: '<channelId>,<role ids>',
    category: 'Utility',
    example: 'sticky roleremove 719180744311701505 880690901318500372'
  },
  {
    name: 'sticky editchannel',
    aliases: [ 'ec' ],
    description: 'Edit channel for sticky message',
    usage: '<channelId>,<new channelId>',
    category: 'Utility',
    example: 'sticky editchannel 719180744311701505 880690901318500372'
  },
  {
    name: 'sticky editmessage',
    aliases: [ 'em' ],
    description: 'Edit content for sticky message',
    usage: '<channelId>,<new message>',
    category: 'Utility',
    example: 'sticky editmessage 719180744311701505 abc def jkl'
  },
  {
    name: 'sticky embed',
    aliases: undefined,
    description: 'Toggle between message and embed',
    usage: '<channelId>',
    category: 'Utility',
    example: 'sticky embed 719180744311701505'
  },
  {
    name: 'userinfo',
    aliases: [ 'ui' ],
    description: 'View user info',
    usage: '-',
    category: 'Utility',
    example: 'N/A'
  },
  {
    name: 'vote',
    aliases: [],
    description: 'Vote for bot',
    usage: '-',
    category: 'Utility',
    example: 'N/A'
  },
  {
    name: 'vote add',
    aliases: [ 'a' ],
    description: 'add voting points to a server',
    usage: '<serverId>,[amount]',
    category: 'Utility',
    example: 'vote add 719180744311701505'
  },
  {
    name: 'vote profile',
    aliases: [ 'p' ],
    description: 'View voting points',
    usage: '-',
    category: 'Utility',
    example: 'N/A'
  },
  {
    name: 'vote explain',
    aliases: [ 'help', 'h' ],
    description: 'Explain how to use voting points',
    usage: '-',
    category: 'Utility',
    example: 'N/A'
  },
  {
    name: 'vote claim',
    aliases: [ 'c' ],
    description: 'Booster perks',
    usage: '-',
    category: 'Utility',
    example: 'N/A'
  }
]