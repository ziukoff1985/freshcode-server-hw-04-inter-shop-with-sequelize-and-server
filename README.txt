------------------- Загальна структура + Ініціалізація БД -------------------
1. Ініціалізація: npm init + npm install express pg pg-hstore sequelize yup bcrypt dotenv http-errors + npm i -D sequelize-cli
2. + Файли .env .gitignore
3. + папка constants --> файл index.js з 'моковими' даними для таблиць
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
------------------- Створення Моделей і Міграций -------------------
15. Створюємо моделі: 
    # 1. Brands
npx sequelize-cli model:generate --name Brand --attributes "title:string,description:text"

# 2. ItemCategories
npx sequelize-cli model:generate --name ItemCategory --attributes "title:string,description:text"

# 3. ItemTypes
npx sequelize-cli model:generate --name ItemType --attributes "title:string,description:text"

# 4. Stores
npx sequelize-cli model:generate --name Store --attributes "title:string,description:text"

# 5. Customers (з урахуванням вимог ДЗ про email та password)
npx sequelize-cli model:generate --name Customer --attributes "name:string,email:string,password:string"

# 6. Models
npx sequelize-cli model:generate --name Model --attributes "title:string,description:text,brand_id:integer"

# 7. Items
npx sequelize-cli model:generate --name Item --attributes "category_id:integer,type_id:integer,brand_id:integer,model_id:integer,price:decimal,store_id:integer,amount:integer"

# 8. Orders
npx sequelize-cli model:generate --name Order --attributes "code:string,date:date,amount:decimal,paid:boolean,customer_id:integer"