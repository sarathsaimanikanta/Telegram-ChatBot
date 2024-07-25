const request = require('request');
const TelegramBot = require('node-telegram-bot-api');

const token = '7185964197:AAFawtH7e0Nv1rZUfCqf0l5oFROe4rFfFKI';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', function (msg) {
  const searchQuery = msg.text; 

  var name = searchQuery;

  request.get({
    url: 'https://api.api-ninjas.com/v1/nutrition?query=' + name,
    headers: {
      'X-Api-Key': 'EY2DkofpkkaSFX3Wbmion5966iY7mes6q5kVY6f2'
    },
  }, function (error, response, body) {
    if (error) {
      console.error('Request failed:', error);
      bot.sendMessage(msg.chat.id, 'Request failed. Please try again later.');
      return;
    }

    if (response.statusCode !== 200) {
      console.error('Error:', response.statusCode, body.toString('utf8'));
      bot.sendMessage(msg.chat.id, 'Error occurred. Please try again later.');
      return;
    }

    const cityData = JSON.parse(body);

    if (cityData.length > 0) {
      const city = cityData[0];
      const message = `${city.name} Calories: ${city.calories} Proteins: ${city.protein_g}`;


      bot.sendMessage(msg.chat.id, message);
    } else {
      bot.sendMessage(msg.chat.id, 'No food item found with that name.');
    }
  });
});