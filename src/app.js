const express = require('express');
const app = express();
app.use(express.json());

const c = require('./controllers/customerController');
app.post   ('/customers',     c.createCustomer);
app.get    ('/customers',     c.getAllCustomers);
app.get    ('/customers/:id', c.getCustomerById);
app.put    ('/customers/:id', c.updateCustomer);
app.delete ('/customers/:id', c.deleteCustomer);

app.listen(3000, () => console.log('API http://localhost:3000'));
