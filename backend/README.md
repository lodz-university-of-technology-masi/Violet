## This is backend project for MASI2019_Violet

#### 1. Starting application:
1. Launch PostgreSql database on your localhost port 5432 (this is default port).
2. Create database `masi`: `CREATE DATABASE masi;`
3. Create user `masi` with password: `create user masi with encrypted password 'M@Si-uSEr!=Hri';`
4. Run application.

Now application should connect to database and execute `schema.sql` and `data.sql` files.
Both files are located in `/src/main/resources`. First of them creates the schema and second one inserts data.
If you have any troubles with connection please review settings in `application.properties`.

There is one temporary endpoint created, which may help you to check if all basic settings were successful.
After sending `GET` to `localhost:8080/test?id=1` you should receive json with a sample test.

### 2. Swagger documentation:
Swagger documentation is available after starting application on this URL: `http://localhost:8080/swagger-ui.html`