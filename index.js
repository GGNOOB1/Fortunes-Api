const express = require('express');
const app = express();
const fortunes = require('./data/fortunes.json');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    title: 'Ola',
    message: 'Bem vindo a api fortune do gg',
  });
});

app.get('/fortunes', (req, res) => {
  res.json(fortunes);
});

app.get('/fortunes/random', (req, res) => {
  const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.json(fortune);
});
app.get('/fortunes/:id', (req, res) => {
  console.log(req.params);
  res.json(fortunes.find((f) => f.id == req.params.id));
});

app.post('/fortunes', (req, res) => {
  const { message, lucky_number, category } = req.body;

  const fortune_ids = fortunes.map((f) => f.id);

  const fortune = {
    id: (fortune_ids.length > 0 ? Math.max(...fortune_ids) : 0) + 1,
    message,
    lucky_number,
    category,
  };

  const new_fortunes = fortunes.concat(fortune);

  fs.writeFile('./data/fortunes.json', JSON.stringify(new_fortunes), (err) =>
    console.log(err),
  );
  res.json(new_fortunes);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running in port:${port}`);
});
