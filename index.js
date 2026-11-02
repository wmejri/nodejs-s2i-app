const http = require('http');
const fs = require('fs');

const configPath = process.env.COMPANY_CONFIG_PATH;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200);
    return res.end('OK');
  }

  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: config.applicationMessage,
      company: config.company,
      environment: config.environment,
      support: config.supportEmail
    }, null, 2));
  } catch (error) {
    res.writeHead(500);
    res.end('Erreur de lecture de la configuration');
  }
});

server.listen(process.env.PORT || 8080, '0.0.0.0');
