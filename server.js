/* eslint-disable no-shadow */
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;
const usersUrl = path.resolve('users.json');
function creteFile(path) {
  return new Promise((resolve) => {
    fs.open(path, 'w', (err) => {
      if (err) throw err;
      resolve();
    });
  });
}

function readFile(path) {
  return new Promise((resolve) => {
    fs.readFile(path, (err, data) => {
      if (err) throw err;
      if (!data.toString()) return resolve();
      return resolve(JSON.parse(data));
    });
  });
}
function writeFile(path, users) {
  return new Promise((resolve) => {
    fs.writeFile(path, JSON.stringify(users), (err) => {
      if (err) throw err;
      resolve();
    });
  });
}
app.use(express.json());
app.get('/', (req, res) => {
  console.log('get all');
  res.send('Hello World!');
});
app.get('/:index', (req, res) => {
  const { params } = req;
  const index = Number(params.index);
  console.log('get one', index);
  res.send('Hello World!');
});
app.post('/', async (req, res) => {
  try {
    const { body } = req;
    if (!fs.existsSync(usersUrl)) {
      await creteFile('users.json');
    }
    let users = await readFile(usersUrl);
    if (!users) {
      users = [];
    }
    users.push(body);
    await writeFile(usersUrl, users);
    console.log('post', body);
    res.send(JSON.stringify(body));
  } catch (err) {
    console.log(err);
  }
});
app.delete('/:index', (req, res) => {
  const { params } = req;
  const index = Number(params.index);
  console.log('delete', index);
  res.send('Hello World!');
});
app.patch('/:index', (req, res) => {
  const { body, params } = req;
  const index = Number(params.index);
  console.log('patch', body);
  console.log('patch', index);
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`server is running in http://localhost:${port}`);
});
