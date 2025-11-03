# Warden Discord Moderation Bot

Warden is a modern Discord moderation bot with robust logging, moderation commands, and utility features. All log channels and settings are managed via slash commands—no config file editing required.

## Features
- Moderation: Ban, Kick, Mute, Warn (with DM notification)
- Logging: Mod logs (bans, kicks, mutes, warns, channel changes), Spam logs (message deletes/edits)
- Utility: Ping, Userinfo, Serverinfo, Avatar
- Fun: Joke
- Welcome/Leave messages and auto-role assignment
- All commands work as both prefix and slash commands
- All log channels set via `/setmodlog` and `/setspamlog`

## Setup
1. Clone the repo and install dependencies:
    ```bash
    npm install
    ```
2. Create a `.env` file with your bot token and IDs:
    ```env
    DISCORD_TOKEN=your_bot_token
    CLIENT_ID=your_bot_application_id
    GUILD_ID=your_guild_id
    ```
3. Run the deploy script to register slash commands:
    ```bash
    node deploy-commands.js
    ```
4. Start the bot:
    ```bash
    npm start
    ```
5. In Discord, use `/setmodlog` and `/setspamlog` in the channels you want logs sent to.
6. Use `/help` to see all available commands.

## Usage
- All commands work as `/command` or with your prefix (default: `!command`).
- Moderation actions are logged in the mod log channel.
- Spam actions (message deletes/edits) are logged in the spam log channel.
- Warned users receive a DM with details.

## Contributing
Pull requests and suggestions are welcome!

## License
MIT
    ```
    DISCORD_TOKEN=YOUR_BOT_TOKEN
    ```
    -   (Optional) Modify `config/config.json` to change the bot's prefix or set your user ID as the owner.

### Running the Bot

Once you've completed the setup, you can start the bot with:

```bash
npm start
```

Your bot should now be online and ready to respond to commands in any server it has been invited to.

## Bot Structure

The project is organized into several key directories:

-   `/commands`: Contains all the command files, sorted into categories.
-   `/events`: Contains handlers for Discord gateway events (e.g., `ready`, `messageCreate`).
-   `/structures`: Base classes for commands and events.
-   `/utils`: Helper functions and utilities like embed builders and loggers.
-   `/config`: JSON configuration files for settings, colors, and emojis.
-   `index.js`: The main entry point of the application.
