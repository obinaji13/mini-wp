# Mini - WP

**Users Endpoint**

| METHOD | ENDPOINT | HEADERS | BODY | DESCRIPTION | SUCCESS | ERROR
|------|---------|---------| ---------| --------- | -- | -- |
| POST | /register |  | name(string), email(string), password(string), picture(file) | Create user | return new User Object | return error
| POST | /login |  | email (string), password (string) | Login user | return Jwt Token | return error
| POST | /googleLogin |  | token | Login (google) | return Jwt Token | return error
| POST | /verifyToken |  | token (jwt) | verify jwt token | return User | return error

**Articles Endpoints**

| METHOD | ENDPOINT | HEADERS | BODY | DESCRIPTION | SUCCESS | ERROR
|--------|----------|---------|------|------------| -- | -- |
| GET | /articles | token | | Get All Articles | return All Users Articles | return error
| GET | /articles/myarticles | token | | Get All LoggedIn User Articles | return All LoggedIn User Articles | return error
| GET | /articles/:articleId | token | | Get One Article | return One Article | return error
| POST | /articles | token | title(string), content(string), author(string), featuredImage(file), tags(array of string) | Create new article | return New Article Object | return error
| PUT | /articles/:articleId | token | title(string), content(string), author(string), featuredImage(file), tags(array of string) | Update An Article | return Updated Article Object | return error
| DELETE | /articles/:articleId | token | | Delete Article | return Deleted Article Object | return error

**Tags Endpoints**

| METHOD | ENDPOINT | HEADERS | BODY | DESCRIPTION | SUCCESS | ERROR
|--------|----------|---------|------|------------| -- | -- |
| GET | /tags | token | | Get All Tags | return All tags | return error
| POST | /tags | token | text(string) | Create new tag | return New Tag Object | return error

**Comments Endpoints**

| METHOD | ENDPOINT | HEADERS | BODY | DESCRIPTION | SUCCESS | ERROR
|--------|----------|---------|------|------------| -- | -- |
| GET | /comments/:articleId | token | | Get All article comments | return All article comments | return error
| POST | /comments/:articleId | token | comment(string) | Create new comment | return New comment Object | return error
| PUT | /comments/:commentId | token | comment(string) | Update a comment | return Updated comment Object | return error
| DELETE | /comments/:commentId | token | | Delete comment | return Deleted comment Object | return error

### Usage


Make new file `.env` With Template:

```
JWT_SECRET=
CLIENT_ID=
CLOUD_BUCKET=
GCLOUD_PROJECT=
KEYFILE_PATH=
```

Run these commands:

 ```
 $ service mongod start
 $ npm install
 $ npm run dev
 ```