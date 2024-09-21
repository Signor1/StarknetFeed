# StarknetFeed

**StarknetFeed** is a bot designed to track updates and news from the Starknet ecosystem, which can often be scattered across various social media platforms, handles, and websites. It automates the process by scraping the web and tracking relevant tweets, delivering real-time updates directly to the bot subscribers' Telegram inbox.

This project is built using **Node.js** and **MongoDB**, making it highly efficient and scalable to keep Starknet developers and professionals informed.

## Features

- **Real-time Web Scraping**: Automatically tracks and scrapes content from relevant social media accounts, websites, and other sources in the Starknet ecosystem.
- **Telegram Bot Integration**: Sends updates directly to the subscriber’s Telegram inbox for easy access.
- **MongoDB Integration**: Stores scraped data, including links, tweets, and articles for further processing and analytics.
- **Customizable Feeds**: Allows users to subscribe to specific types of updates based on their preferences.

## Technologies Used

- **Node.js**: Backend logic for the bot, processing data, and managing requests.
- **MongoDB**: NoSQL database used to store and manage the scraped data and user preferences.
- **Telegram Bot API**: Sends updates and notifications directly to the Telegram subscribers.
- **Web Scraping**: Scrapes data from Twitter, websites, and other platforms related to the Starknet ecosystem.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (version 14.x or later)
- **MongoDB** (self-hosted or via a cloud provider like MongoDB Atlas)
- A **Telegram bot** token from [BotFather](https://core.telegram.org/bots#botfather)
- **Twitter API** or other scraping sources you need

## Getting Started

Follow these steps to get the bot running locally on your machine:

### 1. Clone the repository

```bash
git clone https://github.com/Signor1/StarknetFeed.git
cd StarknetFeed
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and configure the following variables:

```bash
MONGODB_URI=<your-mongodb-connection-string>
TELEGRAM_BOT_TOKEN=<your-telegram-bot-token>
TWITTER_API_KEY=<your-twitter-api-key>
TWITTER_API_SECRET=<your-twitter-api-secret>
```

### 4. Run the bot

```bash
npm start
```

Once the bot is running, it will start scraping for updates and sending notifications to your Telegram subscribers in real time.

## Usage

### Telegram Bot Commands

- `/start` – Start receiving updates.
- `/stop` – Stop receiving updates.
- `/subscribe <type>` – Subscribe to specific updates (e.g., `news`, `tweets`, `articles`).
- `/unsubscribe <type>` – Unsubscribe from a type of updates.

## Database Schema

The MongoDB database holds data for:

- **Users**: Stores Telegram user info and their subscription preferences.
- **Updates**: Holds the scraped updates, including URLs, tweets, and metadata.

## Contribution

We welcome contributions! If you'd like to improve the StarknetFeed, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push the changes: `git push origin feature-branch-name`
5. Submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Contact

For any issues or suggestions, feel free to open an issue on the repository or contact me via Telegram.

- [Okoli Evans](https://t.me/Evansdegreat007)
- [Omemgboji Emmanuel](https://t.me/SignorDev)