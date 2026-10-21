const express = require('express');
const { nanoid } = require('nanoid');
const books = require('./books');

const app = express();
const port = 9000;

app.use(express.json());

app.post('/books', (req, res) => {
  const {
    name, year, author, summary,
    publisher, pageCount, readPage, reading
  } = req.body || {};

  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    });
  }

  if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id, name, year, author, summary,
    publisher, pageCount, readPage,
    finished, reading, insertedAt, updatedAt
  };

  books.push(newBook);

  return res.status(201).json({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: { bookId: id }
  });
});

// GET /books - Menampilkan seluruh buku

// GET /books - Menampilkan daftar buku dengan filter
app.get('/books', (req, res) => {
  const { name, reading, finished } = req.query;

  let filteredBooks = books;

  // Filter berdasarkan nama buku
  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((book) =>
      book.name.toLowerCase().includes(
        String(name).toLowerCase()
      )
    );
  }

  // Filter berdasarkan status sedang dibaca
  if (reading === '1' || reading === '0') {
    filteredBooks = filteredBooks.filter(
      (book) => book.reading === (reading === '1')
    );
  }

  // Filter berdasarkan status selesai dibaca
  if (finished === '1' || finished === '0') {
    filteredBooks = filteredBooks.filter(
      (book) => book.finished === (finished === '1')
    );
  }

  // Mengambil properti yang dibutuhkan
  const bookList = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return res.status(200).json({
    status: 'success',
    data: {
      books: bookList,
    },
  });
});

// GET /books/:bookId - Menampilkan detail buku
app.get('/books/:bookId', (req, res) => {
  const { bookId } = req.params;

  const book = books.find((item) => item.id === bookId);

  if (!book) {
    return res.status(404).json({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
  }

  return res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});
// PUT /books/:bookId - Memperbarui buku
app.put('/books/:bookId', (req, res) => {
  const { bookId } = req.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body || {};

  // Validasi nama
  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
  }

  // Validasi jumlah halaman
  if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  // Cari indeks buku
  const bookIndex = books.findIndex(
    (book) => book.id === bookId
  );

  if (bookIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
  }

  // Memperbarui data buku
  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: pageCount === readPage,
    reading,
    updatedAt: new Date().toISOString(),
  };

  return res.status(200).json({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
});
// DELETE /books/:bookId - Menghapus buku
app.delete('/books/:bookId', (req, res) => {
  const { bookId } = req.params;

  // Mencari posisi buku berdasarkan ID
  const bookIndex = books.findIndex(
    (book) => book.id === bookId
  );

  // Jika buku tidak ditemukan
  if (bookIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
  }

  // Menghapus buku dari array
  books.splice(bookIndex, 1);

  // Mengirim respons berhasil
  return res.status(200).json({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
});
app.listen(port, () => {
  console.log(`Bookshelf API berjalan di http://localhost:${port}`);
});




