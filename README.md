# Sblogs

A full-stack social media application built using **Prisma ORM and SQL** as the backend data layer.
This was my first project working with relational databases and Prisma, and I implemented a complete set of core features including:

- User authentication and profile management
- Creating, editing and deleting posts
- Commenting on posts (one-to-many relationship)
- Liking and bookmarking posts (many-to-many relationships)
- Toggling likes / bookmarks with proper relation checks
- Clean SQL schema, represented using Prisma models

The highlight of this project is that all relationships (one-to-many and many-to-many) are handled using proper Prisma relation queries (connect, disconnect, some, etc.), which helped me build scalable and clean database logic instead of writing raw SQL manually. It was a great learning experience in modelling data the right way in Prisma and SQL.

## ✅ Features

### 🧑‍💻 User
- User registration and login
- Profile information (username, full name, avatar)
- View all of your created posts
- Like or bookmark other user's posts

### 📝 Posts
- Create, update and delete posts
- Add slug, title, image and content
- View post detail
- Like / unlike posts (toggle functionality)
- Bookmark / unbookmark posts
- View number of likes and comments per post

### 💬 Comments
- Add comments to any post
- Each comment is linked to a user (author) and a post

### ⚙ Data Layer (Prisma + SQL)

- One-to-many relations → User → Posts, Post → Comments, User → Comments

- Many-to-many relations → Users ↔ LikedPosts, Users ↔ BookmarkedPosts, Users ↔ LikedComments

- Prisma connect, disconnect, some, every, none used for proper relation queries

- Clean, normalized SQL schema without duplicate fields


## Technologies Used

- **Frontend**:
    - React JS
    - DaisyUI
    - TailwindCSS
    - Context API
- **Backend**: 
   - Node JS
   - Express JS
   - PostgreSQL
   - Prisma
- **Authentication**:
    - JWT (JSON Web Tokens)         
    - Bcrypt (for password hashing)

## Installation

#### Clone github repository
```bash
  git clone https://github.com/Jitesh38/sblogs
```

#### Create .env file with following fields
```javascript
DATABASE_URL="postgresql://postgres:<username>@localhost:5432/<dbname>?schema=public"
ACESS_TOKEN_SECRET = "your_access_token"
ACESS_TOKEN_EXPIRY = "1d"
```

#### Download node modules
```bash
  npm install
```

#### Run project 
```bash
  npm run dev
```
    
#### Screenshots

![Database Design](/screenshots/db_design.png)