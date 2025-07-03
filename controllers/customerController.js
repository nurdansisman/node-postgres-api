const customerModel = require('../models/customerModel');

//CREATE
exports.createCustomer = async (req, res) => {
  const  {firstname, lastname, national_id }= req.body;
  try {
    await customerModel.createCustomer(firstname, lastname, national_id);
    res.status(201).send('Müşteri eklendi');
  } catch (err) {
    res.status(500).send('Hata: ' + err.message);
  }
};

//READ (tamamı)
exports.getAllCustomers = async (_req, res) => {
  try {
    const { rows } = await customerModel.getAllCustomers();
    res.json(rows);
  } catch (err) {
    res.status(500).send('Hata: ' + err.message);
  }
};

//READ (tek kayıt)
exports.getCustomerById = async (req, res) => {
  try {
    const { rows } = await customerModel.getCustomerById(req.params.id);
    if (rows.length === 0) return res.status(404).send('Müşteri bulunamadı');
    res.json(rows[0]);
  } catch (err) {
    res.status(500).send('Hata: ' + err.message);
  }
};

//UPDATE
exports.updateCustomer = async (req, res) => {
  const { firstname, lastname, national_id } = req.body;
  try {
    const dbRes = await customerModel.updateCustomer(
      req.params.id,
      firstname,
      lastname,
      national_id
    );
    if (dbRes.rowCount === 0) return res.status(404).send('Müşteri bulunamadı');
    res.send('Müşteri güncellendi');
  } catch (err) {
    res.status(500).send('Hata: ' + err.message);
  }
};

//DELETE
exports.deleteCustomer = async (req, res) => {
  try {
    const dbRes = await customerModel.deleteCustomer(req.params.id);
    if (dbRes.rowCount === 0) return res.status(404).send('Müşteri bulunamadı');
    res.send('Müşteri silindi');
  } catch (err) {
    res.status(500).send('Hata: ' + err.message);
  }
};
