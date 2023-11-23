const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const user = req.body;
    if (!user) {
        return res.status(404).json({message: "Body Empty"});
    }
    let accessToken = jwt.sign({
        data: user
      }, 'access', { expiresIn: 60 * 60 });
      req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const review = req.query.review;
  const isbn = req.params.isbn;
  const stringBooks = JSON.stringify(books);
    const jsonBooks = JSON.parse(stringBooks);
    let filtered_book = jsonBooks[isbn];
    filtered_book.review = review;
    
  return res.send(`The review for the book with isbn ${isbn} has been added`);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

// test 2