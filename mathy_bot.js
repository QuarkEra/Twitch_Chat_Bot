const tmi = require('tmi.js');
const fs = require('fs');
var request = require('request');

// Define configuration options
const opts = {
  identity: {
    username: "Another_Bot", // You may wish to rename the bot and create a new account for it
    password: "oauthKeyGoesHere:lookslikethiskinda389247982735"
  },
  channels: [
    "channelName"
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
	if (self || msg[0] !== '!') { return; } // Ignore messages from the bot
	
	// Remove whitespace from chat message
	const commandName = msg.trim();
  
	// If the command is known, let's execute it
	if (commandName === '!github') // My github link, change this to your own or something
	{
		client.say(target, `https://github.com/QuarkEra?tab=repositories`);	
		console.log(`* Executed ${commandName} command`);
	}

	if (commandName === '!setup')
	{
		client.say(target, `gv-usb2 from Japan captures low pixel composite outputs to USB - perfect for N64. Found on Amazon, shipping takes weeks.`);
		console.log(`* Executed n64 response`);
	}

	if (commandName === '!time') // You might want to customise this message.
	{
		time = currentTime();
		client.say(target, `The time for your broadcaster is: ` + time); 
		console.log(`* Executed ${commandName} command`);
	}

	if (commandName === '!headsortails') // Makes tough choices no easier.
	{
		side = headsOrTails();
		client.say(target, 'It\'s ' + side);
		console.log(`* Executed ${commandName} command`);
	}

	if (commandName === '!commands')
	{
		client.say(target, '!github - !setup - !time - !headsortails - !commands - !uptime');
		console.log(`* Executed ${commandName} command`);
	}

	if (commandName === '!uptime')
	{
		upTime();
		body.once('update', function () {
		client.action(target, body.data);
		});
		console.log(`* Executed ${commandName} command`);
	}
}

// PUT YOUR CHANNEL NAME AT THE END OF THE URL AFTER -> channel=
var myUptimeURL = "https://decapi.me/twitch/uptime?channel=";
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();	
// There exists a function within the upTime function, hence an EventEmitter sends the result outside to var body

function upTime()
{
	request(myUptimeURL,
	function(error, response, data) {
    body.data = data;
    body.emit('update');
	});
}

function currentTime() // Tells the current time of the machine the bot is running on
{
	d = new Date(),
	h = (d.getHours()<10?'0':'') + d.getHours(),
	m = (d.getMinutes()<10?'0':'') + d.getMinutes();
	if (h < 12)
	{
		earlyOrLate = 'am';
	} else { earlyOrLate = ''}
	return h + ':' + m + ' ' + earlyOrLate;
}

function headsOrTails()
{
	var heads = 0;
	var tails = 0;

	var x = Math.floor(Math.random() * 2);
	if(x===0)
	{
		return 'heads!';
	}
	else
	{
		return 'tails!';
	}
}	

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port)
{
	console.log(`* Connected to ${addr}:${port}`);
}