const pool = require('../config/db');
const Customer = require('../entities/Customer');

class CustomerRepository {
  /* CREATE */
  async create({ firstname, lastname, national_id }) {
    const { rows } = await pool.query(
      'INSERT INTO customers (firstname, lastname, national_id) VALUES ($1,$2,$3) RETURNING *',
      [firstname, lastname, national_id]
    );
    return new Customer(rows[0]);
  }

  /* READ – hepsi */
  async findAll() {
    const { rows } = await pool.query('SELECT * FROM customers');
    return rows.map((row) => new Customer(row));
  }

  /* READ – tek */
  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM customers WHERE id=$1', [id]);
    return rows[0] ? new Customer(rows[0]) : null;
  }

  /* UPDATE */
  async update(id, { firstname, lastname, national_id }) {
    const { rowCount } = await pool.query(
      `UPDATE customers
         SET firstname=$1, lastname=$2, national_id=$3
       WHERE id=$4`,
      [firstname, lastname, national_id, id]
    );
    return rowCount; // 0 veya 1
  }

  /* DELETE */
  async delete(id) {
    const { rowCount } = await pool.query('DELETE FROM customers WHERE id=$1', [id]);
    return rowCount;
  }
}

module.exports = new CustomerRepository(); // tekil repo nesnesi
