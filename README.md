
# Node, Express, and MySQL skeleton for API Rest

This is a repository meant to serve as a starting point if you want to build a Rest API with nodejs, express and mysql.

## Features

- [node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [mysql2](https://github.com/sidorares/node-mysql2)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [express-validator](https://express-validator.github.io/docs/)
- [dotenv](https://github.com/motdotla/dotenv)
- [cors](https://github.com/expressjs/cors)

## How To Start
Clone this repo

``` sh
git clone https://github.com/BrunoEmaSN/API-NODE-EXPRESS-MYSQL-skeleton-.git
```

Get into the directory. Make it your own Coppy .env-example and create your own .env file. Edit .env file and add your mysql username, mysql password and db name you can edit the file also via text editor.

``` sh
cd API-NODE-EXPRESS-MYSQL-skeleton

rm -rf .git && git init

cp .env-example .env

vim .env
```

Get into the db directory. Import mysql database using Command line

```sh
cd src/database

mysql -u [db_username] -p[db_password] < test_db.sql
```

You can edit the file if you want to change the `db_name`. If you are using a different `db_name` and it elready exists, you can comment the first two lines, remain the line => `USE test_db;` and just change the `db_name`
## Running the app

```sh
# Install dependencies
npm install

# Run the server locally
npm start

# Run the server locally in dev mode
npm run dev
```
