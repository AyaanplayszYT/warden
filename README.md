# Warden - A Discord Moderation Bot

Warden is a powerful, multi-purpose Discord bot built with Node.js and the discord.js library. It's designed to be easily extensible, with a clear and organized file structure for commands, events, and utilities.

## Features

-   **Command Handler**: Dynamically loads commands from separate files.
-   **Event Handler**: Dynamically loads event listeners.
-   **Structured Code**: Uses a class-based structure for commands and events.
-   **Moderation**: Basic moderation commands like kick, ban, and mute (timeout).
-   **Fun**: Simple, fun commands to engage your community.
-   **Utility**: Helpful commands to get information about users, servers, etc.
-   **Ready to Extend**: Includes boilerplate for economy and music commands.

## Setup

Follow these steps to get your own instance of Warden running.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16.9.0 or higher recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)
-   A Discord Bot Token. You can get one from the [Discord Developer Portal](https://discord.com/developers/applications).

### Installation

1.  **Clone the repository or download the source code:**
    ```bash
    git clone <repository-url>
    cd warden
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure your bot:**
    -   Rename the `.env.example` file to `.env`.
    -   Open the `.env` file and replace `YOUR_BOT_TOKEN` with your actual bot token.
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
