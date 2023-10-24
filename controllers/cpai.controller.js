const CPAI = require('../services/cpai.services');

async function allCustomers(req, res) {
    const products = await CPAI.allCustomer();
    res.status(200).send(products);
}

module.exports = {
    allCustomers
};