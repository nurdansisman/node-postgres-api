const service = require('../services/customerService');

/* POST /customers -------------------------------------------- */
exports.createCustomer = async (req, res) => {
  try {
    const customer = await service.create(req.body);   // id içinde
    res.status(201).json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Sunucu hatası');
  }
};

/* GET /customers --------------------------------------------- */
exports.getAllCustomers = async (_req, res) => {
  try {
    const list = await service.getAll();               // [{id,…}]
    res.json(list);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
};

/* GET /customers/:id ----------------------------------------- */
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await service.getById(req.params.id);
    if (!customer) return res.status(404).send('Müşteri bulunamadı');
    res.json(customer);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
};

/* PUT /customers/:id ----------------------------------------- */
exports.updateCustomer = async (req, res) => {
  try {
    const updated = await service.update(req.params.id, req.body);
    if (!updated) return res.status(404).send('Müşteri bulunamadı');
    res.send('Müşteri güncellendi');
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
};

/* DELETE /customers/:id -------------------------------------- */
exports.deleteCustomer = async (req, res) => {
  try {
    const deleted = await service.delete(req.params.id);
    if (!deleted) return res.status(404).send('Müşteri bulunamadı');
    res.send('Müşteri silindi');
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
};
