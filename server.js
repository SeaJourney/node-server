const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const clear = require('clear');
const fs = require('fs').promises;
const chalk = require('chalk');

let name = null;

async function readJsonFile() {
  try {
    const data = await fs.readFile("package.json", "utf-8");
    const jsonData = JSON.parse(data);
    name = jsonData.name;
    clear();
    console.log(chalk.bold.magenta(name));
  } catch (err) {
    console.error('Error reading JSON data:', err);
  }
}

app.get('/', (req, res) => {
    fs.readFile('server.html', 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading HTML file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      res.send(data);
    });
  });

async function startServer() {
  try {
    await readJsonFile();

    process.stdout.write('\x1B]0;Chat Room Server\x07');

    server.listen(3000, () => {
      console.log(chalk.green('Server Status: ') + chalk.green('█ ') + chalk.bold.green('Online'));
    });
  } catch (err) {
    console.error('Error starting the server:', err);
  }
}

startServer();
