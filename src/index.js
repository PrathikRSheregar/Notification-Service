const express = require('express');
const apiroutes = require('./routes');
const app = express();
const { ServerConfig, logger } = require('./config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiroutes);
app.listen(ServerConfig.PORT, () => {
  console.log(`Server is Listening to Port ${ServerConfig.PORT}`);
});