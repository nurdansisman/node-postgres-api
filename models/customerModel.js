// db bağlantısını içeri aktarıyoruz
const pool = require('../config/db');

// CREATE
const createCustomer = (firstname, lastname, national_id) => {
  return pool.query(
    'INSERT INTO customers (firstname, lastname, national_id) VALUES ($1, $2, $3)',
    [firstname, lastname, national_id]
  );
};

 const getAllCustomers = () =>pool.query('SELECT * FROM customers');  //READ(Tamamı)

 const getCustomerById =(id) => pool.query('SELECT * FROM customers Where id =$1',[id]);  //READ (Tek kayıt)

// UPDATE
const updateCustomer =(id , firstname ,national_id) => pool.query(
    'UPDATE customers SET firstname=$1, lastname=$2, national_id=$3 WHERE is id=$4',
    [firstname,lastname,national_id]); 

const deleteCustomer =(id) => pool.query('DELETE FROM WHERE id=1', [id]); //DELETE

module.exports=
    {createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer}
    ;
