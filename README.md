# Clipisty
This is a Clipboard History application built using Tauri for the backend and React for the frontend. The app allows users to view and paste their clipboard history, similar to the Windows + V functionality.

This was created for old windows system or VMs, which the common windows clipboard history does not work. 


## Usage
- **Start the App:** Run the application using the steps mentioned above.
- **Copy Text:** Just copy some text or other items as usual.
- **Open Clipboard History:** Press Ctrl + Alt + V to open the clipboard history window.
- **Paste Text:** Click any text and it will be pasted

## Features
- **Clipboard History:** Keep track of your clipboard texts.
- **User-Friendly Interface:** A simple and intuitive UI built with React.
- **Lightweight & Fast:** Built with Tauri, the app is optimized for performance and low resource usage.

### Future Ideas
- **Startup:** Add to startup automatically (Current can be done by this **[Add an app to run automatically at startup in Windows 10](**https:**//support.microsoft.com/en-us/windows/add-an-app-to-run-automatically-at-startup-in-windows-10-150da165-dcd9-7230-517b-cf3c295d89dd))**
- **Configuration:** Add possibility to remap shortcut
- **Images:** Add images
- **Search:** Easily search through your clipboard history to find specific items.
- **Pin Items:** Pin important clipboard items for quick access.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Prerequisites
Before you begin, **ensure you have met the following requirements:**

- **Node.js:** v14.x or higher
- **Rust:** Installed via rustup
- **Tauri CLI:** Installed globally with cargo install tauri-cli

## Installation
1. Clone the Repository

```bash
git clone https://github.com/yourusername/clipboard-history-app.git
cd clipboard-history-app
```

2. Install Dependencies

```bash
# Install frontend dependencies
cd src-tauri
npm install

# Install Tauri dependencies
cargo tauri dev
```
3. Run the App

```bash
npm run tauri dev
```
This will start the Tauri application in development mode.



## Build for Production
To build the app for production, **run:**

```
npm run tauri build
```
The production-ready binaries will be available in the src-tauri/target/release directory.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
- [Tauri](**https:**//tauri.app/) for the backend framework
- [React](**https:**//react.dev/) for the frontend library