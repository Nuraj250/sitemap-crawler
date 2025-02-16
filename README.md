# Sitemap Crawler

## Overview
Sitemap Crawler is a simple web-based tool built with **Node.js, Express, and SimpleCrawler**. It allows users to input a URL, crawl the website, and generate lists of successful and failed URLs. The results can be downloaded for further analysis.

## Features
- Web-based UI for entering a URL and starting a crawl.
- Uses **SimpleCrawler** to fetch and analyze pages.
- Lists **successful and failed URLs** separately.
- Allows downloading results for further analysis.
- Built with **Node.js, Express, and Bootstrap** for easy use and customization.

## Installation & Setup

### Prerequisites
Ensure you have **Node.js** installed on your system.

### Clone the Repository
```bash
git clone https://github.com/Nuraj250/sitemap-crawler.git
cd sitemap-crawler
```

### Install Dependencies
```bash
npm install
```

### Run the Server
```bash
node app.js
```

By default, the server runs on **http://localhost:3000**.

## Usage
1. Open `index.html` in your browser.
2. Enter a URL in the input field.
3. Click **"Start Crawl"** to begin.
4. The progress will be displayed in a modal.
5. Once completed, view the results and download the successful or failed URLs.

## Technologies Used
- **Node.js** - Backend framework
- **Express.js** - Server setup
- **SimpleCrawler** - Web crawling library
- **Bootstrap** - UI framework
- **JavaScript** - Frontend scripting

## Contribution
Feel free to fork this repository and submit pull requests with improvements or additional features.

## License
This project is licensed under the **MIT License**.

