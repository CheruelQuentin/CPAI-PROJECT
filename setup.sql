CREATE DATABASE cpai;
USE cpai;

CREATE TABLE WaterBodyType(
   id INT,
   type_name VARCHAR(50) NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE ThresholdType(
   id INT,
   type_name VARCHAR(50) NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE WaterBody(
   id INT,
   name VARCHAR(50) NOT NULL,
   area_skm DECIMAL(7,2),
   length_km DECIMAL(7,2),
   depth_m DECIMAL(7,2),
   volume_cm DECIMAL(7,2),
   sky_exposed BOOLEAN NOT NULL,
   longitude VARCHAR(50),
   latitude VARCHAR(50),
   id_type INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_type) REFERENCES WaterBodyType(id)
);

CREATE TABLE WaterQualityThreshold(
   id INT,
   min_value DECIMAL(15,2),
   max_value DECIMAL(15,2),
   parameter_name VARCHAR(50) NOT NULL,
   id_type INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_type) REFERENCES ThresholdType(id)
);

CREATE TABLE Sensor(
   id INT,
   latitude DECIMAL(15,2),
   longitude DECIMAL(15,2),
   id_body INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_body) REFERENCES WaterBody(id)
);

CREATE TABLE SensorData(
   id INT,
   con_dissolved_oxygen DECIMAL(15,2),
   con_micro_algae DECIMAL(15,2),
   quan_pesticide DECIMAL(15,2),
   quan_herbicide DECIMAL(15,2),
   quan_heavy_metal DECIMAL(15,2),
   bacteria_level DECIMAL(15,2),
   salinity DECIMAL(15,2),
   turbidity DECIMAL(15,2),
   temperature DECIMAL(15,2),
   date_mesured DATETIME NOT NULL,
   battery_remaining_percent DECIMAL(15,2),
   id_sensor INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_sensor) REFERENCES Sensor(id)
);

CREATE TABLE BodyType_Thresholds(
   id_body INT,
   id_threshold INT,
   PRIMARY KEY(id_body, id_threshold),
   FOREIGN KEY(id_body) REFERENCES WaterBodyType(id),
   FOREIGN KEY(id_threshold) REFERENCES WaterQualityThreshold(id)
);
