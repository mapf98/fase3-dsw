insert into statuses (name, description) VALUES ('Active', 'Indicates that the resource is available to the system');
insert into statuses (name, description) VALUES ('Inactive', 'Indicates that the resource is not available to the system');

insert into statuses (name, description) VALUES ('New','Indicates that a new order was create');
insert into statuses (name, description) VALUES ('Pending','Indicates that the order is pending to pay');
insert into statuses (name, description) VALUES ('Confirming','Indicates that the order is being confirming');
insert into statuses (name, description) VALUES ('Paid','Indicates that the order was paid');
insert into statuses (name, description) VALUES ('Invalid','Indicates that the order was invalid');
insert into statuses (name, description) VALUES ('Expired','Indicates that the order expired its time to pay');
insert into statuses (name, description) VALUES ('Canceled','Indicates that the order was canceled');
insert into statuses (name, description) VALUES ('Reserved', 'Indicates that the quantity of the product is reserved');

insert into roles (name, priority) values ('Customer', 1), ('Admin', 1);

insert into foreign_exchanges (name, symbol, exchange, iso) VALUES ('Dólar', '$', 1, 'USD'), ('Euro', '€', 0.89, 'EUR');

insert  into commissions (service_fee, processor_fee, status_id) values (0.01,0.01,1);

insert into cryptocurrencies(name, iso) values ('Bitcoin', 'BTC');
insert into cryptocurrencies(name, iso) values ('Litecoin', 'LTC');
insert into cryptocurrencies(name, iso) values ('Bitcoin Cash', 'BCH');

insert into users
    (name, last_name, birthdate, email, is_federate, uid, status_id, role_id, foreign_exchange_id) VALUES
    ('Andrea', 'Da Silva', '1999-01-25 00:00:00.000000','andrea@gmail.com', true,'UVvWC9yrxcjRqbNrEjb0w7BYlq2', 1, 2, 1);
insert into users
    (name, last_name, birthdate, email, is_federate, status_id, role_id, foreign_exchange_id) VALUES
    ('Gabriel', 'Ortega', '1998-10-19 00:00:00.000000','gabriel@gmail.com', true, 1, 2, 1);
insert into users
    (name, last_name, birthdate, email, is_federate, status_id, role_id, foreign_exchange_id) VALUES
    ('Angel', 'Sucasas', '1999-01-25 00:00:00.000000','angel@gmail.com', true, 1, 2, 1);
insert into users
    (name, last_name, birthdate, email, is_federate, status_id, role_id, uid, foreign_exchange_id) VALUES
    ('Admin', 'User', '1999-01-25 00:00:00.000000','admin@gmail.com', false, 1, 2, 'ppi0RqZ7RuTFdFSvIqf7cpuDppT2', 1);

insert into providers (name) values ('Apple Products');
insert into providers (name) values ('HP C.A');
insert into providers (name) values ('CHIN IMPORTS');
insert into providers (name) values ('GENERAL IMPORT');
insert into providers (name) values ('COLUMBIA NATIONS');

insert into brands (name) values ('Apple Computers');
insert into brands (name) values ('HP');
insert into brands (name) values ('ASUS');
insert into brands (name) values ('XIAOMI');
insert into brands (name) values ('COLUMBIA');
insert into brands (name) values ('VAN HEUSEN');
insert into brands (name) values ('BARRINGTON HARDWOODS');
insert into brands (name) values ('PANDORA');
insert into brands (name) values ('MATEL');
insert into brands (name) values ('VERSAGE');
insert into brands (name) values ('ISTIKBAL');
insert into brands (name) values ('MOOG');
insert into brands (name) values ('ADIDAS');
insert into brands (name) values ('KUPPET');
insert into brands (name) values ('FENDER');
insert into brands (name) values ('PLAYSTATION');

insert into products (name, description, can_accumulate_points, price, fragile, status_id, brand_id, provider_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     true, 599.99, true, 1, 2, 2);
insert into products (name, description, can_accumulate_points, price, fragile, status_id, brand_id, provider_id) VALUES
    ('ASUS ZenBook 13 Ultra-Slim Laptop-Panoramic screen Full HD 13,3", 8.ªgeneration Intel Core I5-8265U',
     'panoramic screen, size: 13,3", bisel NanoEdge Full-HD/ Intel Core i5-8265u (Up to 3,9 GHz)/Fast storage and memory with SSD PCIe M.2 512 GB , 8GB RAM LPDDR3',
     false, 699.99, true, 1, 3, 5);
insert into products (name, description, can_accumulate_points, price, fragile, status_id, brand_id, provider_id) VALUES
    ('Xiaomi Redmi Note 8 128 GB 4GB RAM 48 MP Version Global Dual SIM Smartphone (Space Black)',
     'Touch screem IPS LCD, size 6,3", FHD+ 1080×2340 píxels, relation 19,5:9, Dual SIM (Nano-SIM, Dual Stand-by)/ Android 9.0 (Pie)/ MIUI 10 / 4 GB RAM + 128 GB ROM, Qualcomm SDM665 Snapdragon 665 (11 nm), Octa-Core.',
     false, 189.99, true, 1, 4, 4);
insert into products (name, description, can_accumulate_points, price, fragile, status_id, brand_id, provider_id) VALUES
    ('Columbia Bonehead short-sleeved shirt for men',
     '100 % Poliéster / Imported / Button closure', false, 13.99, false, 1, 5, 3);
insert into products (name, description, can_accumulate_points, price, fragile, status_id, brand_id, provider_id) VALUES
    ('Van Heusen - Straight cut trouser', '72% poliester/ Imported / Zipper closure', true, 29.99, false, 1, 6, 4);
insert into products (name, description, can_accumulate_points, price, fragile, status_id, brand_id, provider_id) VALUES
    ('Walnut wood 3/4" x 2"', 'Two sides sanded 3/4 inch thick.', false, 40.22, false, 1, 7, 3);
insert into products (name, description, can_accumulate_points, price, fragile, status_id, brand_id, provider_id) VALUES
    ('PANDORA Silver Bracelet', 'PANDORA Reflexions bracelet in 18K gold plated PANDORA Shine silver.', true, 199.99, false, 1, 8, 4);
insert into products (name, description, can_accumulate_points, price, fragile, status_id, brand_id, provider_id) VALUES
    ('Power Rangers Ninja Steel Megazord Figura de acción, Megazord Ninja', 'The mighty Power Rangers Ninja Steel Megazords combine the power of the 5 zords to create one epic megazord, just like the TV show',
     false, 29.99, true, 1, 9, 3);
insert into products (name, description, can_accumulate_points, price, fragile, status_id, brand_id, provider_id) VALUES
    ('BRIGHT CRYSTAL GIANNI VERSACE', 'A classic designer fragrance for men', true, 66.99, false, 1, 10, 4);
insert into products (name, description, can_accumulate_points, price, fragile, status_id, brand_id, provider_id) VALUES
    ('ISTIKBAL - Multifunctional living room sofa, Troya collection, brown color', 'Extremely easy conversion and space saving design without compromising comfort.', true,
     309.99, false, 1, 11, 3);
insert into products (name, description, can_accumulate_points, price, fragile, status_id, brand_id, provider_id) VALUES
    ('MOOG 513288 Wheel bearing', 'Innovative roll shape design that ensures optimal and uniform preload.', false, 59.99, false, 1, 12, 4);
insert into products (name, description, can_accumulate_points, price, fragile, status_id, brand_id, provider_id) VALUES
    ('World Cup official ball , adidas ', 'Synthetic. Imported. Authentic Adidas football team guaranteed.', false, 51.22, false, 1, 13, 1);
insert into products (name, description, can_accumulate_points, price, fragile, status_id, brand_id, provider_id) VALUES
    ('Portable washing machine, Kuppet 16.5 pounds compact double tub washing', 'Great capacity. Features the tub s dual-function design that can save your priceus time by washing and spinning dry loads at the same time',
     true, 450.99, true, 1, 14, 1);
insert into products (name, description, can_accumulate_points, price, fragile, status_id, brand_id, provider_id) VALUES
    ('Fender Guitar, Jetty Black', 'Unique Fender Round Body Shape / Painted Solid Spruce Top; back and sides in painted mahogany.', false,
     150.99, true, 1, 15, 2);
insert into products (name, description, can_accumulate_points, price, fragile, status_id, brand_id, provider_id) VALUES
    ('PlayStation 4 1TB',
     'New PS4, lighter and thinner All the best in games, TV music and more. This console can be operated in Spanish. 1TB hard drive',
     true, 349.99, true, 1, 16, 2);

insert into product_photos (content, product_id) VALUES ('macbook.jpg', 1);
insert into product_photos (content, product_id) VALUES ('asus1.jpg', 2);
insert into product_photos (content, product_id) VALUES ('asus2.jpg', 2);
insert into product_photos (content, product_id) VALUES ('redmi1.jpg', 3);
insert into product_photos (content, product_id) VALUES ('redmi2.jpg', 3);
insert into product_photos (content, product_id) VALUES ('columbia.jpg', 4);
insert into product_photos (content, product_id) VALUES ('columbia2.jpg', 4);
insert into product_photos (content, product_id) VALUES ('pants1.jpg', 5);
insert into product_photos (content, product_id) VALUES ('pants2.jpg', 5);
insert into product_photos (content, product_id) VALUES ('barr1.jpg', 6);
insert into product_photos (content, product_id) VALUES ('barr2.jpg', 6);
insert into product_photos (content, product_id) VALUES ('joyas.jpg', 7);
insert into product_photos (content, product_id) VALUES ('juguetes.jpg', 8);
insert into product_photos (content, product_id) VALUES ('belleza1.jpg', 9);
insert into product_photos (content, product_id) VALUES ('mueble1.jpg', 10);
insert into product_photos (content, product_id) VALUES ('cojinete.jpg', 11);
insert into product_photos (content, product_id) VALUES ('adidas.jpg', 12);
insert into product_photos (content, product_id) VALUES ('electrodomesticos.jpg', 13);
insert into product_photos (content, product_id) VALUES ('guitar.jpg', 14);
insert into product_photos (content, product_id) VALUES ('ps4.jpg', 15);

insert into product_dimensions (product_id, width, height, long, weight) VALUES (1, 7.66, 5, 6, 12);
insert into product_dimensions (product_id, width, height, long, weight) VALUES (2, 17.12, 5, 9, 72);
insert into product_dimensions (product_id, width, height, long, weight) VALUES (3, 16, 19.2, 21.44, 12);
insert into product_dimensions (product_id, width, height, long, weight) VALUES (4, 16, 12, 21, 87);
insert into product_dimensions (product_id, width, height, long, weight) VALUES (5, 7, 5, 6, 12);
insert into product_dimensions (product_id, width, height, long, weight) VALUES (6, 17, 5, 9, 21);
insert into product_dimensions (product_id, width, height, long, weight) VALUES (7, 16.23, 4, 21, 34);
insert into product_dimensions (product_id, width, height, long, weight) VALUES (8, 5, 12, 17, 9);
insert into product_dimensions (product_id, width, height, long, weight) VALUES (9, 7, 5, 6, 12);
insert into product_dimensions (product_id, width, height, long, weight) VALUES (10, 17.12, 5, 9, 76);
insert into product_dimensions (product_id, width, height, long, weight) VALUES (11, 16, 3, 21, 12);
insert into product_dimensions (product_id, width, height, long, weight) VALUES (12, 7.54, 15, 14, 56);
insert into product_dimensions (product_id, width, height, long, weight) VALUES (13, 7.90, 5, 6, 87);
insert into product_dimensions (product_id, width, height, long, weight) VALUES (14, 17, 5.12, 9.09, 33);
insert into product_dimensions (product_id, width, height, long, weight) VALUES (15, 16.54, 8.54, 21, 12);

insert into product_questions (comment, product_id, user_id)
    VALUES ('Me encantó el producto', 1, 1);
insert into product_questions (comment, product_id, user_id)
    VALUES ('Buen producto', 2, 2);
insert into product_questions (comment, product_id, user_id)
    VALUES ('Excelene calidad! Lo recomiendo', 4, 3);
insert into product_questions (comment, product_id, user_id)
    VALUES ('No me gustó mucho. Pésima calidad', 2, 1);
insert into product_questions (comment, product_id, user_id)
    VALUES ('I love it!', 8, 2);
insert into product_questions (comment, product_id, user_id)
    VALUES ('Muy bueno <3', 10, 3);
insert into product_questions (comment, product_id, user_id)
    VALUES ('La mejor compra que he hecho', 12, 1);
insert into product_questions (comment, product_id, user_id)
    VALUES ('Pésimo proveedor', 14, 2);
insert into product_questions (comment, product_id, user_id)
    VALUES ('No me gustó el paquete', 15, 3);
insert into product_questions (comment, product_id, user_id)
    VALUES ('Gracias por ofrecer un producto de tan buena calidad', 3, 1);
insert into product_questions (comment, product_id, user_id)
    VALUES ('Simplemente... lo amé', 11, 2);

insert into categories (name, icon, term) VALUES ('Electronics','fas fa-tv','ELECTRONICS');
insert into categories (name, icon, term) VALUES ('Clothing and Fashion','fas fa-tshirt','CLOTHING_FASHION');
insert into categories (name, icon, term) VALUES ('Carpentry','mdi-axe','CARPENTRY');
insert into categories (name, icon, term) VALUES ('Jewelry','fas fa-gem','JEWELRY');
insert into categories (name, icon, term) VALUES ('Toys','fas fa-bicycle','TOYS');
insert into categories (name, icon, term) VALUES ('Makeup and beauty','fas fa-broom','MAKEUP_BEAUTY');
insert into categories (name, icon, term) VALUES ('Furniture and home','fas fa-couch','FURNITURE_HOME');
insert into categories (name, icon, term) VALUES ('Auto parts','mdi-car-door','AUTO_PARTS');
insert into categories (name, icon, term) VALUES ('Sports','fas fa-futbol','SPORTS');
insert into categories (name, icon, term) VALUES ('Home appliances','fas fa-utensils','HOME_APPLIANCES');
insert into categories (name, icon, term) VALUES ('Music','fas fa-music','MUSIC');
insert into categories (name, icon, term) VALUES ('Videogames','fas fa-gamepad','VIDEOGAMES');

insert into catalogues (name, description, term, category_id) VALUES ('Computers', 'Catálogo de Computadoras', 'COMPUTERS', 1);
insert into catalogues (name, description, term, category_id) VALUES ('Smarthphones', 'Catálogo de smarthphones', 'SMARTHPHONES', 1);
insert into catalogues (name, description, term, category_id) VALUES ('Shirt', 'Catálogo de camisas', 'SHIRT', 2);
insert into catalogues (name, description, term, category_id) VALUES ('Pants', 'Catálogo de pantalones', 'PANTS', 2);
insert into catalogues (name, description, term, category_id) VALUES ('Wood', 'Catálogo de maderas', 'WOOD', 3);
insert into catalogues (name, description, term, category_id) VALUES ('Bracelects', 'Catálogo de pulseras', 'BRACELETS', 4);
insert into catalogues (name, description, term, category_id) VALUES ('Robots', 'Catálogo de robots', 'ROBOTS', 5);
insert into catalogues (name, description, term, category_id) VALUES ('Fragrance', 'Catálogo de perfumes', 'FRAGRANCE', 6);
insert into catalogues (name, description, term, category_id) VALUES ('Sofas', 'Catálogo de sofas', 'SOFAS', 7);
insert into catalogues (name, description, term, category_id) VALUES ('Spare parts', 'Catálogo de repuestos', 'SPARE_PARTS', 8);
insert into catalogues (name, description, term, category_id) VALUES ('Balls', 'Catálogo de balones', 'BALLS', 9);
insert into catalogues (name, description, term, category_id) VALUES ('Washing machine', 'Catálogo de lavadoras', 'WASHING_MACHINE', 10);
insert into catalogues (name, description, term, category_id) VALUES ('Music instruments', 'Catálogo de instrumentos musicales', 'MUSIC_INSTRUMENTS', 11);
insert into catalogues (name, description, term, category_id) VALUES ('Consoles', 'Catálogo de consolas', 'CONSOLES', 12);

insert into product_catalogues (catalogue_id, product_id) VALUES (1, 1);
insert into product_catalogues (catalogue_id, product_id) VALUES (1, 2);
insert into product_catalogues (catalogue_id, product_id) VALUES (1, 3);
insert into product_catalogues (catalogue_id, product_id) VALUES (2, 4);
insert into product_catalogues (catalogue_id, product_id) VALUES (2, 5);
insert into product_catalogues (catalogue_id, product_id) VALUES (3, 6);
insert into product_catalogues (catalogue_id, product_id) VALUES (4, 7);
insert into product_catalogues (catalogue_id, product_id) VALUES (5, 8);
insert into product_catalogues (catalogue_id, product_id) VALUES (6, 9);
insert into product_catalogues (catalogue_id, product_id) VALUES (7, 10);
insert into product_catalogues (catalogue_id, product_id) VALUES (8, 11);
insert into product_catalogues (catalogue_id, product_id) VALUES (9, 12);
insert into product_catalogues (catalogue_id, product_id) VALUES (10, 13);
insert into product_catalogues (catalogue_id, product_id) VALUES (11, 14);
insert into product_catalogues (catalogue_id, product_id) VALUES (12, 15);

insert into product_inventories (quantity_available, minimum_quantity_available, product_id) VALUES (60, 11, 1);
insert into product_inventories (quantity_available, minimum_quantity_available, product_id) VALUES (58, 21, 2);
insert into product_inventories (quantity_available, minimum_quantity_available, product_id) VALUES (50, 34, 3);
insert into product_inventories (quantity_available, minimum_quantity_available, product_id) VALUES (40, 23, 4);
insert into product_inventories (quantity_available, minimum_quantity_available, product_id) VALUES (45, 12, 5);
insert into product_inventories (quantity_available, minimum_quantity_available, product_id) VALUES (63, 45, 6);
insert into product_inventories (quantity_available, minimum_quantity_available, product_id) VALUES (150, 80, 7);
insert into product_inventories (quantity_available, minimum_quantity_available, product_id) VALUES (70, 15, 8);
insert into product_inventories (quantity_available, minimum_quantity_available, product_id) VALUES (95, 32, 9);
insert into product_inventories (quantity_available, minimum_quantity_available, product_id) VALUES (59, 82, 10);
insert into product_inventories (quantity_available, minimum_quantity_available, product_id) VALUES (80, 65, 11);
insert into product_inventories (quantity_available, minimum_quantity_available, product_id) VALUES (90, 43, 12);
insert into product_inventories (quantity_available, minimum_quantity_available, product_id) VALUES (40, 72, 13);
insert into product_inventories (quantity_available, minimum_quantity_available, product_id) VALUES (50, 28, 14);
insert into product_inventories (quantity_available, minimum_quantity_available, product_id) VALUES (70, 29, 15);


insert into offers (name, description, percentage, status_id) VALUES
    ('Semester offer', 'Oferta para los estudiantes como parte del incio del semestre',10,1),
    ('Birth offer', 'Oferta para los estudiantes como parte del fin del semestre',20,1),
    ('Holliday offer', 'Oferta para los estudiantes como parte del mitad del semestre',30,1);
