CREATE TABLE IF NOT EXISTS item (
    id INT NOT NULL AUTO_INCREMENT,
    brand VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    subcategory VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price FLOAT NOT NULL,
    description VARCHAR(255),
    PRIMARY KEY (id)
);