// import index from '../index';

const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/TrybeTunes', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', '../index.js'));
});

const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

export default server;

// const express = require('express');
// const path = require('path');
// const app = express();
