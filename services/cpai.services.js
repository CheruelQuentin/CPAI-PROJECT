const axios = require('axios');
const mysql = require("mysql2");
const fs = require("fs");

async function allCustomer () {
    return (await axios.get('https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers')).data;
}

async function insertDataInDb (){
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'cpai'
    });
    const rawData = fs.readFileSync('./data/data.json');
    const data = JSON.parse(rawData);

    try {
        connection.connect();

    // Insertion des données dans les tables respectives
        insertData(connection,'WaterBodyType', data.WaterBodyTypes);
        insertData(connection,'ThresholdType', data.ThresholdTypes);
        insertData(connection,'WaterBody', data.WaterBodies);
        insertData(connection,'WaterQualityThreshold', data.WaterQualityThresholds);
        insertData(connection,'Sensor', data.Sensors);
        insertData(connection,'SensorData', data.SensorData);
        insertData(connection,'BodyType_Thresholds', data.BodyTypeThresholds);

    // Fermeture de la connexion à la base de données
        connection.end();
    } catch (e) {
        console.log(e)
    }

}

// Fonction pour insérer des données dans une table spécifique
function insertData(connection,tableName, dataArray) {
    dataArray.forEach(item => {
        connection.query(`INSERT INTO ${tableName} SET ?`, item, (error, results, fields) => {
            if (error) throw error;
            console.log(`Inserted into ${tableName} table`);
        });
    });
}

async function getLocationCPAI () {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'cpai'
    });
    try {
        connection.connect();
        // Requête SQL pour récupérer les données de la table WaterBodies
        const query = 'SELECT * FROM cpai.WaterBody';
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    } catch (e) {
        throw e;
    } finally {
        // Assurez-vous de fermer la connexion après l'exécution de la requête
        connection.end();
    }
}

async function getDetailsCpaiById(identifier) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'cpai'
    });

    try {
        connection.connect();
        // Requête SQL pour récupérer les données de la table WaterBody avec l'identifiant spécifié
        const query = `SELECT * FROM WaterBody WHERE id = ?`;
        return new Promise((resolve, reject) => {
            connection.query(query, [identifier], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    } catch (e) {
        throw e;
    } finally {
        // Assurez-vous de fermer la connexion après l'exécution de la requête
        connection.end();
    }
}

async function getThresholdCPAI () {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'cpai'
    });
    try {
        connection.connect();
        // Requête SQL pour récupérer les données de la table WaterBodies
        const query = 'SELECT * FROM cpai.WaterQualityThreshold';
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    } catch (e) {
        throw e;
    } finally {
        // Assurez-vous de fermer la connexion après l'exécution de la requête
        connection.end();
    }
}

async function createSensorData(con_dissolved_oxygen,con_micro_algae,quan_pesticide,quan_herbicide,quan_heavy_metal,bacteria_level,salinity,turbidity
temperature,date_mesured,battery_remaining_percent,id_sensor) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'cpai'
    });

    try {
        connection.connect();
        const query = `INSERT INTO SensorData (con_dissolved_oxygen, con_micro_algae, quan_pesticide, 
            quan_herbicide, quan_heavy_metal, bacteria_level, salinity, turbidity, temperature, 
            date_mesured, battery_remaining_percent, id_sensor) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            connection.query(query, [
                con_dissolved_oxygen, con_micro_algae, quan_pesticide, quan_herbicide, quan_heavy_metal, bacteria_level, salinity, turbidity, 
                temperature, date_mesured, battery_remaining_percent, id_sensor], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.insertId); // Renvoie l'ID de l'élément inséré
                }
            });
        });
    } catch (e) {
        throw e;
    } finally {
        // Assurez-vous de fermer la connexion après l'exécution de la requête
        connection.end();
    }
}


module.exports = {
    allCustomer,
    insertDataInDb,
    getLocationCPAI,
    getDetailsCpaiById,
    getThresholdCPAI,
    createSensorData
};