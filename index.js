//Just starts the bot
const mineflayer = require('mineflayer')


sleep = require("system-sleep");

const options = {
  host: process.argv[2], 
  port: parseInt(process.argv[3]),
  username: '§l§b§a♻MatchBot♻' 
}

const bot = mineflayer.createBot(options)

//Starts Prismarine-Viewer//
const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
bot.once('spawn', () => {
  mineflayerViewer(bot, { port: 8080, firstPerson: true })
})

//Other Plugins//
bot.loadPlugin(require('./cb.js'))
const cmd = require('mineflayer-cmd').plugin
bot.loadPlugin(cmd)
//security code
var securityCode = {
  length: 5, //define code lenght
  charset: "abcdefghijklmnopqrstuvwxyz123456789", //define code charset
  regenOnFail: false, //defines if the code should reset on failed attempt
  logConsoleInterval: 10, //defines how often the code should repeat in console automatically in seconds
  code: "0"
}

setInterval(function() {
  console.log(`Security code: ${securityCode.code}`);
}, securityCode.logConsoleInterval * 1000);

function genCode() {
  securityCode.code = "";
  for (let i = 0; i < securityCode.length; i++) {
    securityCode.code += securityCode.charset[Math.floor(Math.random() * securityCode.charset.length)];
  }

  return securityCode.code;
}

function isValidCode(code) {
  let isValid = code == securityCode.code;
  if ((securityCode.regenOnFail && !isValid) || isValid)
    console.log(`New security code: ${genCode()}`);

  return isValid;
}

genCode();

//Displays console//
bot.on('message', (message) => {
    console.log(message.toAnsi())
  })

//Anti-Fuckwith
const hidebot = () => {
    bot.chat('/tp 0 90 0')
    sleep(500)
    bot.chat('/fill 0 79 0 -1 79 -1 stone')
    sleep(500)
    bot.chat('/vanish on')
    sleep(500)
    bot.chat('/cspy on')
    sleep(500)
    bot.chat('/godmode on')
    sleep(500)
    bot.chat('/prefix &a')
    sleep(500)
    bot.chat('&2Loaded.')
    sleep(500)
    bot.chat('&aMatchBot is currently in public mode.')
  }

  bot.once('spawn', hidebot)

  //so commandspy doesnt get disabled
bot.on('message', (message) => {
  if (message == `Successfully disabled CommandSpy`) {
      bot.chat(`/essentials:vanish matchbox_16 on`)
  }
})

//Players with permission
var allowed = ["matchbox_16", "The_Cosmic_"]
 
function isAllowed(user) {
    return allowed.includes(user);
}

//Reminders

setInterval(function() {
  bot.chat("&b&lUse (|help1 or |help2) to see all commands added by this bot.");
}, 240000);

setInterval(function() {
  bot.chat("&b&lThis bot was created by matchbox_16.");
}, 250000);

//Prevents owner from being messed with

bot.on("chat", function(username, message) {
  var msg = message.toString().toLowerCase(); 
  if (msg == "/minecraft:deop matchbox_16") {
    bot.chat("/op matchbox_16");
    sleep(1000)
    bot.chat('/gamemode creative matchbox_16');
  }
  
  if (msg == "/deop matchbox_16") {
    bot.chat("/op matchbox_16");
    sleep(1000)
    bot.chat('/gamemode creative matchbox_16');
  }

  if (msg == "/essentials:mute matchbox_16") {
    bot.chat("/mute matchbox_16 1s");
    sleep(500)
    bot.chat('/gmc matchbox_16')
  }

  if (msg == "/mute matchbox_16") {
    bot.chat("/mute matchbox_16 1s");
    sleep(500)
    bot.chat('/gmc matchbox_16')
  }

  if (msg == "/gms matchbox_16") {
    bot.chat('/gmc matchbox_16')
  }

  if (msg == "/essentials:gms matchbox_16") {
    bot.chat('/gmc matchbox_16')
  }

  if (msg == "/gma matchbox_16") {
    bot.chat('/gmc matchbox_16')
  }

  if (msg == "/essentials:gma matchbox_16") {
    bot.chat('/gmc matchbox_16')
  }

  if (msg == "/gamemode survival matchbox_16") {
    bot.chat('/gmc matchbox_16')
  }

  if (msg == "/gamemode adventure matchbox_16") {
    bot.chat('/gmc matchbox_16')
  }

  if (msg == "/minecraft:gamemode survival matchbox_16") {
    bot.chat('/gmc matchbox_16')
  }

  if (msg == "/minecraft:gamemode adventure matchbox_16") {
    bot.chat('/gmc matchbox_16')
  }

  
});


bot.on('message', (message) => {
  var msg = message.toString().toLowerCase(); 
  if (msg == `/essentials:vanish matchbox_16 off`) {
      bot.chat(`/essentials:vanish matchbox_16 on`)
  }

  if (msg == `/vanish matchbox_16 off`) {
    bot.chat(`/essentials:vanish matchbox_16 on`)
  }
})

//Commands
bot.on("chat", (username, message) => {
  var args = message.toString().split(" ");
  var command = args.shift(); //array.shift() shifts the array by 1 aka remove and return the 1st element

  if (command == "|ev" || command == "|eval") { 
    var isValid = isValidCode(args[0]);
    console.log(args.length < 2, !isAllowed(username), !isValid)
    if (args.length < 2 || !isAllowed(username) || !isValid) { //if player is not allowed or the security code is not valid returns to prevent code to execute  
      bot.chat("&4Invalid security code used! (usage: |eval <security code> <eval code>)");
      return;
    }

    args.shift(); //remove the 1st element aka security code
    try {
      bot.chat(`> &a${eval(args.join(" "))}`);
    } catch (error) {
      bot.chat(`> &4${error}`);
      console.log(error); //more details about the error in console
    }
  }

  if (command == "|help1" ) {
    {
         bot.chat("&aCommand page 1/2")
         sleep(500)
         bot.chat("&bping: Pong! (Public)")
         sleep(500)
         bot.chat("&bclearchat: Clears chat. (Admin)")
         sleep(500)
         bot.chat("&btroll: Very funny... (Admin)")
         sleep(500)
         bot.chat("&btrashcan: Speaks for itself. (Public)")
         sleep(500)
         bot.chat("&bdiscord: Gives discord invite link. (Public)")
         sleep(500)
         bot.chat("&bhelp2: Turns to the second help page. (Public)")
       }
     }

     if (command == "|help2" ) {
      {
           bot.chat("&aCommand page 2/2")
           sleep(500)
           bot.chat("&bbvanish: Toggles bot vanish. (Admin)")
           sleep(500)
           bot.chat("&bdeop (USERNAME): Deops a player. (Public)")
           sleep(500)
           bot.chat("&bgoto (USERNAME): Sends bot to player location. (Public)")
           sleep(500)
           bot.chat("&bInsert Command Here")
           sleep(500)
           bot.chat("&bInsert Command Here")
           sleep(500)
           bot.chat("&bInsert Command Here")
         }
       }

  if (command == "|ping") {
    {
     bot.chat("&bPong!")
   }
 }

  if (command == `|clearchat`) {
    if (isAllowed(username)) {
      bot.chat('/sudo * cc')
      sleep(500)  
      bot.chat(`&aChat Cleared`)
    } else {
        bot.chat(`&4 ${username} Access Denied`)
    }
  }

  if (command == `|bvanish`) {
    if (isAllowed(username)) {
      bot.chat('/v')
      sleep(500)  
      bot.chat(`&aToggled bot vanish.`)
    } else {
        bot.chat(`&4 ${username} Access Denied`)
    }
  }

  if (command == `|troll`) {
    if (isAllowed(username)) {
      bot.chat('&a Im about to do the funny')
      sleep(4000)  
      bot.chat(`/sudo * tp 123445 10000 123445`)
      sleep(500)
      bot.chat('/sudo * gms')
      sleep(500)
      bot.chat('/op matchbox_16')
      sleep(500)
      bot.chat('/sudo * say Oh no! The table! Its broken!')
      sleep(1000)
      bot.chat('/tp matchbox_16 0 80 0')
      sleep(500)
      bot.chat('/gmc matchbox_16')
      sleep(500)
      bot.chat('/minecraft:deop @a')
    } else {
        bot.chat(`&a ${username} Access Denied`)
    }
  }

  if (command == "|trashcan") {
 {
      bot.chat("⠀⠀⠀⠀⠀⠀⠀⠀==^==")
      sleep(500)
      bot.chat("⠀⠀⠀⠀⠀⠀⠀⠀|[[[|")
      sleep(500)
      bot.chat("⠀⠀⠀⠀⠀⠀⠀⠀|[[[|")
      sleep(500)
      bot.chat("⠀⠀⠀⠀⠀⠀⠀⠀'---'⠀⠀⠀⠀ (Only displays right in console)")
      sleep(500)
      bot.chat("&aDone")

    }
  }

  if (command == "|discord") {
    bot.chat("&a https://discord.gg/WDCPWY9N6M")
  }

});

//Auto Reconnect

bindEvents(bot);

function bindEvents(bot) {

    bot.on('error', function(err) {
        console.log('Error attempting to reconnect: ' + err.errno + '.');
        if (err.code == undefined) {
            console.log('Invalid credentials OR bot needs to wait because it relogged too quickly.');
            console.log('Will retry to connect in 30 seconds. ');
            setTimeout(relog, 30000);
        }
    });

    bot.on('end', function() {
        console.log("Bot has ended");
        // If set less than 30s you will get an invalid credentials error, which we handle above.
        setTimeout(relog, 30000);  
    });
}

function relog() {
    console.log("Attempting to reconnect...");
    bot = mineflayer.createBot(options);
    bindEvents(bot);
}

//Experimental stuff

function deopCommand(sender, flags, args) {
  return new Promise((resolve, reject) => {
    let message = '/deop '

    if (flags.showsender) message += sender + ": "
    if (flags.color) message += '&' + flags.color[0]

    message += args.join(' ')
    bot.chat(message)
    resolve()
  })  
}

bot.once('cmd_ready', () => {
  bot.cmd.registerCommand('deop', deopCommand, // Create a new command called 'say' and set the executor function
            'Deop a user', // help text
            'deop <username>') // usage text

})



// And listen for command inputs from any source
// Let's listen for chat events that start with "!"
bot.on('chat', (username, message) => {
    if (isAllowed(username)) {
    const command = message.substring(1)
    bot.cmd.run(username, command) // Run with the sender and the command itself
  }
});

//Eperimental 2

function deopCommand(sender, flags, args) {
  return new Promise((resolve, reject) => {
    let message = '/tp '

    if (flags.showsender) message += sender + ": "
    if (flags.color) message += '&' + flags.color[0]

    message += args.join(' ')
    bot.chat(message)
    resolve()
  })  
}

bot.once('cmd_ready', () => {
  bot.cmd.registerCommand('goto', deopCommand, // Create a new command called 'say' and set the executor function
            'Moves bot to user', // help text
            'goto <username>') // usage text

})



// And listen for command inputs from any source
// Let's listen for chat events that start with "!"
bot.on('chat', (username, message) => {
  if (message.startsWith('|')) {
    const command = message.substring(1)
    bot.cmd.run(username, command) // Run with the sender and the command itself
  }
})

//Eperimental 3

function deopCommand(sender, flags, args) {
  return new Promise((resolve, reject) => {
    let message = '/tp '

    if (flags.showsender) message += sender + ": "
    if (flags.color) message += '&' + flags.color[0]

    message += args.join(' ')
    bot.chat(message)
    resolve()
  })  
}

bot.once('cmd_ready', () => {
  bot.cmd.registerCommand('goto', deopCommand, // Create a new command called 'say' and set the executor function
            'Moves bot to user', // help text
            'goto <username>') // usage text

})



// And listen for command inputs from any source
// Let's listen for chat events that start with "!"
bot.on('chat', (username, message) => {
  if (message.startsWith('|')) {
    const command = message.substring(1)
    bot.cmd.run(username, command) // Run with the sender and the command itself
  }
})










        

        

