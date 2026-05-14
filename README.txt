1. Ініціалізація: npm init + npm install express pg pg-hstore sequelize yup bcrypt dotenv http-errors + npm i -D sequelize-cli
2. + Файли .env .gitignore
3. + папка src --> файл index.js з 'моковими' даними для таблиць
4. Створюємо сервер: файли src/app.js та index.js (в корні)
5. Прописуємо скрипти в package.json
6. Ініціалізуємо Sequelize: npx sequelize-cli init
7. папка config -> переносимо в src
8. в src -> папка db -> переносимо models, migrations, seeders -> переносимо в db
9. Створюємо папки test --> httpRequests -> для тестування запитів (Rest Client)
10. в config/config.json -> test i production -> залишаємо порожні об'єкти
11. перейменовуємо config/config.json -> postgresConfig.js --> редагуємо файл --> імпортуємо 'dotenv' і використовуємо process.env в об'єкті --> додаємо migrationStorage i seedersStorage
12. створюємо файл .sequelizerc --> наповнюємо даними 'шляхів'
13. редагуємо файл db/models/index.js -> !!! УВАЖНО змінюємо 'config' + додаємо 'configPath'
14. у файлі index.js (в корні) -> імпортуємо 'db' з db/models/index.js + створюємо функцію dbConnectCheck (для перевірки з'єднання з БД)