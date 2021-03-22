CREATE DATABASE tododb;

CREATE TABLE [IF NOT EXISTS] todo ( id SERIAL PRIMARY KEY, description VARCHAR(255) );

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
); 
-- fake user
INSERT INTO users (user_name, user_email,
    user_password) VALUES ("ken", "ken@ken.com", "kenpassword");