const TelegramBot = require("node-telegram-bot-api");
const { TwitterApi } = require("twitter-api-v2");
const { connectDB } = require("./mongo");
const User = require("./model/user.mongo");
require("dotenv").config();

const TELEGRAM_BOT_TOKEN = process.env.BOT_API_KEY;
const TWITTER_BEARER_TOKEN = process.env.TWITTER_API_BEARER_TOKEN;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

const twitterClient = new TwitterApi(TWITTER_BEARER_TOKEN);

const twitterHandles = [
  "Starknet",
  "StarkWareLtd",
  "StarknetFndn",
  "StarknetEco",
  "argentHQ",
  "myBraavos",
  "starknetevents",
  "EliBenSasson",
  "EkuboProtocol",
  "nostrafinance",
  "zkLend",
  "avnu_fi",
  "PulsarStarknet",
  "ohayo_dojo",
  "LootRealms",
];

let lastTweetID = {
  Starknet: null,
  StarkWareLtd: null,
  StarknetFndn: null,
  StarknetEco: null,
  argentHQ: null,
  myBraavos: null,
  starknetevents: null,
  EliBenSasson: null,
  EkuboProtocol: null,
  nostrafinance: null,
  zkLend: null,
  avnu_fi: null,
  PulsarStarknet: null,
  ohayo_dojo: null,
  LootRealms: null,
};

async function connectMongoDB() {
  await connectDB();
}

connectMongoDB();

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    let user = await User.findOne({ chatId });
    if (user) {
      bot.sendMessage(chatId, "You are already subscribed");
    } else {
      user = new User({ chatId });
      await user.save();

      bot.sendMessage(
        chatId,
        "You have successfully subscribed to updates from StarknetFeed"
      );
    }
  } catch (err) {
    console.log("Error subscribing user", err);
    bot.sendMessage(
      chatId,
      "There was an error processing your subscription, please try again"
    );
  }
});

bot.onText(/\/stop/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    let user = await User.findOne({ chatId });
    if (user) await user.deleteOne();
    bot.sendMessage(
      chatId,
      "You have successfully unsubscribed from StarknetFeed"
    );
  } catch (err) {
    console.log("Error unsubscribing user", err);
    bot.sendMessage(
      chatId,
      "There was an error processing your unsubscription from StarknetFeed"
    );
  }
});

async function fetchTweets(handle) {
  try {
    const tweets = await twitterClient.v2.userTimeline(handle, {
      max_results: 5,
      "tweet.fields": "created_at",
      since_id: lastTweetID[handle],
    });

    if (tweets.data && tweets.data.length > 0) {
      lastTweetID[handle] = tweets.data[0].id;
      return tweets.data;
    }

    return [];
  } catch (err) {
    console.log(`Error fetching tweets for ${handle}: `, err);
    return [];
  }
}

async function sendTweets(tweet, handle) {
  try {
    const users = await User.find({}, "chatId");
    const message = `📢 New Tweet from @${handle}:\n\n${tweet.text}\n\nLink: https://twitter.com/${handle}/status/${tweet.id}`;

    for (const user of users) {
      bot.sendMessage(user.chatId, message);
    }
  } catch (err) {
    console.log("Error sending tweets to subscribers", err);
  }
}

async function checkForNewTweets() {
  for (const handle of twitterHandles) {
    const newTweets = await fetchTweets(handle);

    if (newTweets.length > 0) {
      newTweets.reverse(); // sort tweets from oldest to newest
      newTweets.forEach((tweet) => sendTweets(tweet, handle));
    }
  }
}


setInterval(checkForNewTweets, 60000)