const CPAI = require('../services/cpai.services');
const fs = require('fs');


async function allCustomers(req, res) {
    const products = await CPAI.allCustomer();
    res.status(200).send(products);
}

async function insertDataInDbControllers(req, res){
    await CPAI.insertDataInDb()
    res.status(200)
}

async function getLocationInDB(req, res) {
    const locations = await  CPAI.getLocationCPAI();
    res.status(200).send(locations)
}

async function getDetailsOfCPAI(req, res) {
    const id = req.body.id;
    const locations = await  CPAI.getDetailsCpaiById(id);
    res.status(200).send(locations)
}
async function getThresholdInDB(req, res) {
    const locations = await  CPAI.getThresholdCPAI();
    res.status(200).send(locations)
}
async function insertSensorData(req, res) {
    const con_dissolved_oxygen  = req.body.con_dissolved_oxygen, 
    const con_micro_algae  = req.body.con_micro_algae, 
    const quan_pesticide = req.body.quan_pesticide,
    const quan_herbicide  = req.body.quan_herbicide, 
    const quan_heavy_metal  = req.body.quan_heavy_metal, 
    const bacteria_level  = req.body.bacteria_level, 
    const salinity  = req.body.salinity, 
    const turbidity  = req.body.turbidity, 
    const temperature = req.body.temperature,
    const date_mesured  = req.body.date_mesured, 
    const battery_remaining_percent  = req.body.battery_remaining_percent, 
    const id_sensor  = req.body.id_sensor
    const sensorData = await  CPAI.createSensorData(con_dissolved_oxygen,con_micro_algae,quan_pesticide,quan_herbicide,quan_heavy_metal,bacteria_level,salinity,turbidity
    temperature,date_mesured,battery_remaining_percent,id_sensor);
    res.status(200).send(sensorData)
}


module.exports = {
    allCustomers,
    insertDataInDbControllers,
    getLocationInDB,
    getDetailsOfCPAI,
    getThresholdInDB,
    insertSensorData
};