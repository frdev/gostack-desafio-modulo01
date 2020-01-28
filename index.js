const express            = require('express');
const cors               = require('cors');
const bodyParser         = require('body-parser');
const routes             = require('./routes');
const { logApplication } = require('./middlewares');
const server             = express();

server.use(cors());
server.use(bodyParser.json());
server.use(logApplication);

server.use(routes);

server.listen(3333, () => console.log(`Aplicação rodando na porta 3333.`));

