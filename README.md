Venn - A Full-Stack Blog Platform
Venn is a complete, full-stack blog application built from scratch with Node.js, Express, and MongoDB. It features a complete user authentication system, file uploads for blog and profile images, and full CRUD (Create, Read, Update, Delete) functionality for blog posts and comments.

 Features
User Authentication: Secure user sign-up and sign-in with JWT tokens stored in cookies.

User Profiles: Users have their own profile page and can upload custom profile pictures.

Blog Post Management (CRUD):

Create: Write and publish new blogs with a title, body, and cover image.

Read: View all blog posts on the homepage or click to read a single post.

Delete: Authors can delete their own blog posts.

Comment System: Logged-in users can post comments on any blog.

Authorization: Secure routes ensure that only the author of a post can delete it.

File Uploads: Uses Multer for efficient handling of image uploads for blog covers and user avatars.

Dynamic Rendering: All pages are server-side rendered using EJS.

 Tech Stack
Backend: Node.js, Express.js

Database: MongoDB (with Mongoose)

View Engine: EJS (Embedded JavaScript)

Authentication: JSON Web Tokens (JWT), Cookie-Parser

File Uploads: Multer

 Project Structure

├── models/
│   ├── blog.js       # Blog schema
│   ├── comment.js    # Comment schema
│   └── user.js       # User schema
├── views/
│   ├── partials/
│   │   ├── head.ejs
│   │   ├── nav.ejs
│   │   └── scripts.ejs
│   ├── addblog.ejs   # Page to create a new blog
│   ├── blog.ejs      # Page to view a single blog and comments
│   ├── home.ejs      # Homepage (shows all blogs)
│   ├── profile.ejs   # User profile page
│   ├── signin.ejs    # Signin page
│   └── signup.ejs    # Signup page
├── routes/
│   ├── blog.js       # All routes related to blogs and comments
│   └── user.js       # All routes related to user auth and profile
├── public/
│   ├── uploads/
│   │   ├── avatars/  # Stores user profile pictures
│   │   └── (blog covers)
│   └── images/       # For static images like backgrounds
├── middlewares/
│   └── authentication.js # JWT validation middleware
├── .gitignore
├── index.js          # Main server file
├── package.json
└── README.md
