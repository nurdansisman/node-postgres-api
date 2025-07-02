// express modülünü projeye dahil ediyoruz
const express = require('express');

// pg modülünden sadece Pool sınıfını alıyoruz, database bağlantısı için
const { Pool } = require('pg');

// express appi oluşturduk
const app = express();

app.use(express.json());

// PostgreSQL veritabanı bağlantı bilgilerini tanımlıyoruz
const pool = new Pool({
  user: 'postgres',      // database kullanıcı adı
  host: 'localhost',     // database sunucu adresi
  database: 'postgres',  // bağlanılacak database adı
  password: '1234',      
  port: 5432,            // databasein dinlediği port
});

// POST / Yeni müşteri ekleyen endpoint
app.post('/customers', (req, res) => {
  // İstek gövdesinden fdeğerlerimizi alıyoruz
  const { firstname, lastname, national_id } = req.body;

  // Database'e kayıt ekleyen SQL sorgusunu çalıştırıyoruz
  pool.query(
    'INSERT INTO customers (firstname, lastname, national_id) VALUES ($1, $2, $3)', // SQL sorgusu
    [firstname, lastname, national_id], // Parametreler dizi şeklinde
    (err, result) => { // Sonuç
      if (err) {
        // hata varsa mesaj gönderiyoruz
        res.send('Hata: ' + err.message);
      } else {
        // işlem tamamsa bilgi mesajı geliyor
        res.send('Müşteri eklendi');
      }
    }
  );
});

// GET /Tüm müşterileri listeleyen endpoint
app.get('/customers', (req, res) => {
 
  pool.query('SELECT * FROM customers', (err, result) => {
    if (err) {
      // hata varsa mesaj gönderiyoruz
      res.send('Hata: ' + err.message);
    } else {
      ////Tamamsa tüm müşteri kayıtlarını JSON formatta döndürüyoruz.
      res.json(result.rows);
    }
  });
});

// GET / ID'ye göre müşteri getiren endpoint
app.get('/customers/:id', (req, res) => {
  // URL parametresinden id değerini alıyoruz
  const id = req.params.id;

  // Belirtilen id'ye sahip müşteriyi sorgulayan SQL sorgusunu çalıştırıyoruz
  pool.query('SELECT * FROM customers WHERE id = $1', [id], (err, result) => {
    if (err) {
      // Hata oluşursa kullanıcıya hata mesajı gönderiyoruz
      res.send('Hata: ' + err.message);
    } else if (result.rows.length === 0) {
      // Hiç kayıt bulunamazsa uygun mesaj döndürülüyor
      res.send('Müşteri bulunamadı');
    } else {
      // Kayıt bulunduysa JSON formatında döndürülüyor
      res.json(result.rows[0]);
    }
  });
});

// Sunucuyu 3000 portunda başlatıyoruz
app.listen(3000, () => {
  console.log('API http://localhost:3000 adresinde çalışıyor');
});
