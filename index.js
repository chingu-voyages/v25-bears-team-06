const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const fetch = require('node-fetch');
const { response } = require('express');

//middleware
app.use(cors());
app.use(express.json());

// Routes //

//search Google Books API
app.get('/search', async (req, res) => {
	try {
		const key = 'AIzaSyBUcnhG0FWf7elsXN1sDMUR8CJhQ8NASrI';
		const response = await fetch(
			`https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=${key}`
		);
		const json = await response.json();
		const { id, volumeInfo } = json;
		console.log(id, volumeInfo);

		res.json(json);
		// console.log(json);
	} catch (err) {
		console.error(err.message);
	}
});

//load database with dummy data
app.post('/load', async (req, res) => {
	try {
		const key = 'AIzaSyBUcnhG0FWf7elsXN1sDMUR8CJhQ8NASrI';
		const response = await fetch(
			`https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=${key}`
		);
		const json = await response.json();
		const { id, volumeInfo } = json;
		console.log(id, volumeInfo);
		const newBook = await pool.query(
			'INSERT INTO books (id, volumeinfo) VALUES($1,$2) RETURNING *',
			[id, volumeInfo]
		);
		res.json(newBook.rows[0]);
	} catch (err) {
		console.error(err);
	}
});

//search postgres table
app.get('/books', async (req, res) => {
	try {
		const allBooks = await pool.query('SELECT * FROM books');
		res.json(allBooks.rows);
	} catch (err) {
		console.error(err.message);
	}
});

app.listen(5000, () => {
	console.log('server has started on port 5000');
});
