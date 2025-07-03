const express = require('express');
const app = express();
app.use(express.json());

const customerController = require('./controllers/customerController');

//CREATE
app.post('/customers', customerController.createCustomer);

//READ (tamamı)
app.get('/customers', customerController.getAllCustomers);

//READ (tek kayıt)
app.get('/customers/:id', customerController.getCustomerById);

//UPDATE
app.put('/customers/:id', customerController.updateCustomer);

// DELETE 
app.delete('/customers/:id', customerController.deleteCustomer);

app.listen(3000, () => {
  console.log('API http://localhost:3000 adresinde çalışıyor');
});
