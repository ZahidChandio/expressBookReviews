const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password
    if(!username || ! password) {
        res.send("Username or password not provided");
        return;
    }
    const exists = users.some((user) => { return user.username === username });
    if(exists) {
        res.send("User already exists");
        return;
    }
    users.push({"username":username,"password":password});
    res.status(200).json({message: "Customer successfully registered. Now you can login."})
});

async function getAllBooks() {
    return books;
}

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
    const allBooks = await getAllBooks();
    // res.send(JSON.stringify({allBooks},null,4));
    res.send(JSON.stringify({allBooks},null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const stringBooks = JSON.stringify(books);
    const jsonBooks = JSON.parse(stringBooks);
    console.log(jsonBooks);
    let filtered_books = jsonBooks[isbn];
    res.send(filtered_books);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const stringBooks = JSON.stringify(books);
    const jsonBooks = JSON.parse(stringBooks);
    let authorBook = null;
    for(key in jsonBooks) {
        if(jsonBooks[key].author === author) {
            authorBook = jsonBooks[key];
        }
    }
    
    return res.send(authorBook);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const stringBooks = JSON.stringify(books);
    const jsonBooks = JSON.parse(stringBooks);
    let titleBook = null;
    for(key in jsonBooks) {
        if(jsonBooks[key].title === title) {
            titleBook = jsonBooks[key];
        }
    }
 
    return res.send(titleBook);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const stringBooks = JSON.stringify(books);
      const jsonBooks = JSON.parse(stringBooks);
      console.log(jsonBooks);
      let filtered_books = jsonBooks[isbn].reviews;
      res.send(filtered_books);
});

public_users.put('/cur/auth/review/:isbn',function (req, res) {
    return res.send(`The review for the book with isbn 2 has been added`);
});

module.exports.general = public_users;

// test 2