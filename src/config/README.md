# Manual for backend project configuration.
## Migrations and databases.

- Our project use PostgreSQL database, also we integrate in the project Sequilize ORM, but sometimes we need to create difficult relationships in DB. For this type of relationships we create special migrations.

### How to use it?
- At first, create new database, which you want to connect with project on future
- Run project: type "nest start --watch" in your console
- After project was ran, stop it and go to your DB. Refresh it and **drop** all tables, which names is equal with scripts name from "migrations" folder. 
- After that execute **all** migrations from folder "migrations" and refresh DB again.
- Congratulations! Now you created perfect structure of your database for our project!
- **Enjoy!**