// pg modülünden sadece Pool sınıfını alıyoruz, database bağlantısı için
const { Pool } = require('pg');

// PostgreSQL veritabanı bağlantı bilgilerini tanımlıyoruz
const pool = new Pool({
  user: 'postgres',      // database kullanıcı adı
  host: 'localhost',     // database sunucu adresi
  database: 'postgres',  // bağlanılacak database adı
  password: '1234',
  port: 5432,            // databasein dinlediği port
});

module.exports = pool;
