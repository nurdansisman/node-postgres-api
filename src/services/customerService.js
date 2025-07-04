const repo = require('../repositories/customerRepository');
class CustomerService {
  create(data)           { return repo.create(data); }
  getAll()               { return repo.findAll(); }
  getById(id)            { return repo.findById(id); }
  update(id, data)       { return repo.update(id, data); }
  delete(id)             { return repo.delete(id); }
}
module.exports = new CustomerService();
