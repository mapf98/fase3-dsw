insert into estatus (nombre, descripcion) VALUES ('Activo', 'Indica que el recurso está disponible para el sistema');
insert into estatus (nombre, descripcion) VALUES ('Inactivo', 'Indica que el recurso no está disponible para el sistema');
insert into estatus (nombre, descripcion) VALUES ('Por Procesar', 'Indica que la orden está en espera de confirmación de pago');
insert into estatus (nombre, descripcion) VALUES ('Procesada', 'Indica que la orden ha sido confirmada y su pago ha sido aprobado');
insert into estatus (nombre, descripcion) VALUES ('Rechazada', 'Indica que la orden no puede ser procesada');
insert into estatus (nombre, descripcion) VALUES ('Reservado', 'Indica que la cantidad del producto está reservado');

insert into rol (nombre, prioridad) values ('Cliente', 1);
insert into rol (nombre, prioridad) values ('Administrador', 1);


insert into cliente (primer_nombre, primer_apellido, fecha_nacimiento,email,is_federate, estatus_id, rol_id) VALUES
    ('Andrea', 'Da Silva', '1999-01-25 00:00:00.000000','andrea@gmail.com',true, 1, 1);

insert into proveedor (nombre) values ('Apple Products');
insert into proveedor (nombre) values ('HP C.A');
insert into proveedor (nombre) values ('CHIN IMPORTS');
insert into proveedor (nombre) values ('GENERAL IMPORT');
insert into proveedor (nombre) values ('COLUMBIA NATIONS');

insert into marca (nombre) values ('Apple Computers');
insert into marca (nombre) values ('HP');
insert into marca (nombre) values ('ASUS');
insert into marca (nombre) values ('XIAOMI');

insert into marca (nombre) values ('COLUMBIA');
insert into marca (nombre) values ('VAN HEUSEN');

insert into marca (nombre) values ('BARRINGTON HARDWOODS');

insert into marca (nombre) values ('PANDORA');

insert into marca (nombre) values ('MATEL');

insert into marca (nombre) values ('VERSAGE');

insert into marca (nombre) values ('ISTIKBAL');

insert into marca (nombre) values ('MOOG');

insert into marca (nombre) values  ('ADIDAS');

insert into marca (nombre) values  ('KUPPET');

insert into marca (nombre) values  ('FENDER');

insert into marca (nombre) values  ('PLAYSTATION');


insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('ASUS ZenBook 13 Ultra-Slim Laptop- Pantalla panorámica Full HD de 13,3" y 8.ª generación Intel Core I5-8265U, Gris pizarra',
     'Pantalla panorámica de 13,3" con bisel NanoEdge Full-HD/Procesador Intel Core i5-8265u (hasta 3,9 GHz)/Almacenamiento y memoria rápidos con SSD PCIe M.2 de 512 GB y RAM LPDDR3 de 8 GB',
     699.99, 22.9, 1, 3);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('Xiaomi Redmi Note 8 128 GB 4GB RAM 48 MP Desbloqueado de fábrica Versión Global Dual SIM Smartphone (negro espacial)',
     'Pantalla táctil capacitiva IPS LCD de 6,3", FHD+ 1080×2340 píxeles, relación de 19,5:9, Dual SIM (Nano-SIM, Dual Stand-by)/ Android 9.0 (Pie)/ MIUI 10 / 4 GB RAM + 128 GB ROM, Qualcomm SDM665 Snapdragon 665 (11 nm), Octa-Core.',
     189.99, 5.5, 1, 4);


insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('Columbia Bonehead Camisa de trabajo de manga corta para hombre',
     '100 % Poliéster / Importado / Cierre de Button',
     13.99, 2.5, 1, 5);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('Van Heusen - Pantalón de corte recto para hombre',
     '72% poliéster, 22% rayón, 6% licra/ Importado/ Cierre de Zipper',
     29.99, 4.5, 1, 6);


insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('Madera de nogal 3/4" x 2"',
     'Hermoso grano. Perfectamente secado al horno. Dos lados lijados a 3/4 pulgadas de grosor.',
     40.22, 6.5, 1, 7);


insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('PANDORA Pulsera Reflexiones',
     'pulsera PANDORA Reflexions en plata de ley chapada en oro de 18 quilates PANDORA Shine.',
     199.99, 8.5, 1, 8);

 insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('Power Rangers Ninja Steel Megazord Figura de acción, Megazord de acero Ninja',
     'The mighty Power Rangers Ninja Steel Megazords combine the power of the 5 zords to create one epic megazord, just like the TV show',
     29.99, 8.5, 1, 9);


   insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('BRIGHT CRYSTAL para mujer por GIANNI VERSACE',
     'Una fragancia clásica de diseñador para hombres',
     66.99, 8.5, 1, 10);

    insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('ISTIKBAL - Sofá de salón multifuncional, colección Troya, color marrón',
     'Extremadamente fácil conversión y diseño para ahorrar espacio sin comprometer la comodidad.',
     309.99, 8.5, 1, 11);


     insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('MOOG 513288 Cojinete de rueda y conjunto de buje',
     'Innovador diseño de forma de rollo que garantiza una precarga uniforme y óptima.',
     59.99, 8.5, 1, 12);



     insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('Balón oficial de la Copa del Mundo de adidas',
     'intético. Importado. Auténtico equipo de fútbol Adidas garantizado.',
     51.22, 18.5, 1, 13);


 insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('Lavadora portátil, Kuppet 16.5 libras compacto doble tina lavado',
     'Gran capacidad. Cuenta con el diseño de doble función de la bañera que puede ahorrar su precioso tiempo al lavar y girar cargas secas al mismo tiempo.',
     450.99, 88.5, 1, 14);



 insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('Guitarra Fender, Jetty Negro',
     'Forma del cuerpo Redondo exclusiva de Fender / Parte superior de pícea maciza pintada; parte trasera y laterales de caoba pintada.',
     150.99, 35, 1, 15);

 insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('PlayStation 4',
     'Nuevo PS4, más ligero y delgado Todo lo mejor en juegos, TV música y más. Esta consola puede ser operada en español.Disco duro de 1TB',
     349.99, 15, 1, 16);







insert into servicio (nombre, descripcion, precio, estatus_id)
    VALUES ('Reparación de Lavadoras y Neveras', 'Reparamos lavadoras y neveras. Contamos con certificados a nivel mundial y experiencia de más de 10 años.', 345.76, 1);
insert into servicio (nombre, descripcion, precio, estatus_id)
    VALUES ('Reparación de Computadoras', 'Reparamos CPU y monitores. Contamos con certificados a nivel mundial y experiencia de más de 10 años.', 789.76, 2);
insert into servicio (nombre, descripcion, precio, estatus_id)
    VALUES ('Reparación de Cocinas', 'Reparamos cocinas', 12.76, 1);
insert into servicio (nombre, descripcion, precio, estatus_id)
    VALUES ('Reparación de Teléfonos', 'Reparamos teléfonos', 100.21, 1);

insert into proveedor_producto (producto_id, proveedor_id) VALUES (1, 1);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (2, 1);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (3, 2);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (4, 2);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (5, 5);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (6, 4);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (7, 3);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (8, 4);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (9, 3);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (10, 4);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (11, 3);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (12, 4);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (13, 3);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (14, 4);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (15, 3);

insert into proveedor_producto (producto_id, proveedor_id) VALUES (1, 1);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (2, 1);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (3, 2);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (4, 2);

insert into proveedor_servicio (servicio_id, proveedor_id) VALUES (2, 1);
insert into proveedor_servicio (servicio_id, proveedor_id) VALUES (2, 2);
insert into proveedor_servicio (servicio_id, proveedor_id) VALUES (1, 1);
insert into proveedor_servicio (servicio_id, proveedor_id) VALUES (1, 2);

insert into foto_servicio (contenido, servicio_id) VALUES ('reparaciones.jpg', 1);
insert into foto_servicio (contenido, servicio_id) VALUES ('reparaciones.jpg', 2);
insert into foto_servicio (contenido, servicio_id) VALUES ('reparacion-tlfs.jpg', 3);
insert into foto_servicio (contenido, servicio_id) VALUES ('reparacion-tlfs.jpg', 4);


insert into foto_producto (contenido, producto_id) VALUES ('macbook.jpg', 1);
insert into foto_producto (contenido, producto_id) VALUES ('asus1.jpg', 2);
insert into foto_producto (contenido, producto_id) VALUES ('asus2.jpg', 2);
insert into foto_producto (contenido, producto_id) VALUES ('redmi1.jpg', 3);
insert into foto_producto (contenido, producto_id) VALUES ('redmi2.jpg', 3);
insert into foto_producto (contenido, producto_id) VALUES ('columbia.jpg', 4);
insert into foto_producto (contenido, producto_id) VALUES ('columbia2.jpg', 4);
insert into foto_producto (contenido, producto_id) VALUES ('pants1.jpg', 5);
insert into foto_producto (contenido, producto_id) VALUES ('pants2.jpg', 5);
insert into foto_producto (contenido, producto_id) VALUES ('barr1.jpg', 6);
insert into foto_producto (contenido, producto_id) VALUES ('barr2.jpg', 6);
insert into foto_producto (contenido, producto_id) VALUES ('joyas.jpg', 7);
insert into foto_producto (contenido, producto_id) VALUES ('juguetes.jpg', 8);
insert into foto_producto (contenido, producto_id) VALUES ('belleza1.jpg', 9);
insert into foto_producto (contenido, producto_id) VALUES ('mueble1.jpg', 10);
insert into foto_producto (contenido, producto_id) VALUES ('cojinete.jpg', 11);
insert into foto_producto (contenido, producto_id) VALUES ('adidas.jpg', 12);
insert into foto_producto (contenido, producto_id) VALUES ('electrodomesticos.jpg', 13);
insert into foto_producto (contenido, producto_id) VALUES ('guitar.jpg', 14);
insert into foto_producto (contenido, producto_id) VALUES ('ps4.jpg', 15);




insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (1, '7', '5', '6');
insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (2, '17', '5', '9');
insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (3, '16', '1', '21');
insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (4, '11', '3', '14');
insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (5, '7', '5', '6');
insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (6, '17', '5', '9');
insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (7, '16', '1', '21');
insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (8, '11', '3', '14');
insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (9, '7', '5', '6');
insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (10, '17', '5', '9');
insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (11, '16', '1', '21');
insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (12, '11', '3', '14');
insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (13, '7', '5', '6');
insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (14, '17', '5', '9');
insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (15, '16', '1', '21');

insert into pregunta_producto (comentario, producto_id, cliente_id)
    VALUES ('Me encantó el producto Me encantó el producto Me encantó el producto Me encantó el producto Me encantó el producto Me encantó el producto Me encantó el producto Me encantó el producto Me encantó el producto Me encantó el producto Me encantó el producto', 1, 1);


insert into categoria (nombre,icon,term) VALUES ('Electronics','fas fa-tv','ELECTRONICS');
insert into categoria (nombre,icon,term) VALUES ('Clothing and Fashion','fas fa-tshirt','CLOTHING_FASHION');
insert into categoria (nombre,icon,term) VALUES ('Carpentry','mdi-axe','CARPENTRY');
insert into categoria (nombre,icon,term) VALUES ('Jewelry','fas fa-gem','JEWELRY');
insert into categoria (nombre,icon,term) VALUES ('Toys','fas fa-bicycle','TOYS');
insert into categoria (nombre,icon,term) VALUES ('Makeup and beauty','fas fa-broom','MAKEUP_BEAUTY');
insert into categoria (nombre,icon,term) VALUES ('Furniture and home','fas fa-couch','FURNITURE_HOME');
insert into categoria (nombre,icon,term) VALUES ('Auto parts','mdi-car-door','AUTO_PARTS');
insert into categoria (nombre,icon,term) VALUES ('Sports','fas fa-futbol','SPORTS');
insert into categoria (nombre,icon,term) VALUES ('Home appliances','fas fa-utensils','HOME_APPLIANCES');
insert into categoria (nombre,icon,term) VALUES ('Music','fas fa-music','MUSIC');
insert into categoria (nombre,icon,term) VALUES ('Videogames','fas fa-gamepad','VIDEOGAMES');



insert into producto_categoria (category_id, producto_id) VALUES (1, 1);
insert into producto_categoria (category_id, producto_id) VALUES (1, 2);
insert into producto_categoria (category_id, producto_id) VALUES (1, 3);
insert into producto_categoria (category_id, producto_id) VALUES (2, 4);
insert into producto_categoria (category_id, producto_id) VALUES (2, 5);
insert into producto_categoria (category_id, producto_id) VALUES (3, 6);
insert into producto_categoria (category_id, producto_id) VALUES (4, 7);
insert into producto_categoria (category_id, producto_id) VALUES (5, 8);
insert into producto_categoria (category_id, producto_id) VALUES (6, 9);
insert into producto_categoria (category_id, producto_id) VALUES (7, 10);
insert into producto_categoria (category_id, producto_id) VALUES (8, 11);
insert into producto_categoria (category_id, producto_id) VALUES (9, 12);
insert into producto_categoria (category_id, producto_id) VALUES (10, 13);
insert into producto_categoria (category_id, producto_id) VALUES (11, 14);
insert into producto_categoria (category_id, producto_id) VALUES (12, 15);




insert into servicio_categoria (categoria_id, servicio_id) VALUES (1, 1);
insert into servicio_categoria (categoria_id, servicio_id) VALUES (1, 3);
insert into servicio_categoria (categoria_id, servicio_id) VALUES (1, 2);
insert into servicio_categoria (categoria_id, servicio_id) VALUES (1, 4);


insert into catalogo (nombre, descripcion, term) VALUES ('Computers', 'Catálogo de Computadoras', 'COMPUTERS');
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (1, 1);
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (1, 2);
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (1, 5);
insert into servicio_catalogo (catalogo_id, servicio_categoria_id) VALUES (1, 1);
insert into servicio_catalogo (catalogo_id, servicio_categoria_id) VALUES (1, 2);


insert into catalogo (nombre, descripcion, term) VALUES ('Smarthphones', 'Catálogo de smarthphones', 'SMARTHPHONES');
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (2, 3);
insert into servicio_catalogo (catalogo_id, servicio_categoria_id) VALUES (2, 1);


insert into catalogo (nombre, descripcion, term) VALUES ('Shirt', 'Catálogo de camisas', 'SHIRT');
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (3, 4);
insert into catalogo (nombre, descripcion, term) VALUES ('Pants', 'Catálogo de pantalones', 'PANTS');
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (4, 5);
insert into catalogo (nombre, descripcion, term) VALUES ('Wood', 'Catálogo de maderas', 'WOOD');
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (5, 6);
insert into catalogo (nombre, descripcion, term) VALUES ('Bracelects', 'Catálogo de pulseras', 'BRACELETS');
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (6, 7);
insert into catalogo (nombre, descripcion, term) VALUES ('Robots', 'Catálogo de robots', 'ROBOTS');
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (7, 8);
insert into catalogo (nombre, descripcion, term) VALUES ('Fragrance', 'Catálogo de perfumes', 'FRAGRANCE');
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (8, 9);
insert into catalogo (nombre, descripcion, term) VALUES ('Sofas', 'Catálogo de sofas', 'SOFAS');
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (9, 10);
insert into catalogo (nombre, descripcion, term) VALUES ('Spare parts', 'Catálogo de repuestos', 'SPARE_PARTS');
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (10, 11);
insert into catalogo (nombre, descripcion, term) VALUES ('Balls', 'Catálogo de balones', 'BALLS');
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (11, 12);
insert into catalogo (nombre, descripcion, term) VALUES ('Washing machine', 'Catálogo de lavadoras', 'WASHING_MACHINE');
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (12, 13);
insert into catalogo (nombre, descripcion, term) VALUES ('Music instruments', 'Catálogo de instrumentos musicales', 'MUSIC_INSTRUMENTS');
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (13, 14);
insert into catalogo (nombre, descripcion, term) VALUES ('Consoles', 'Catálogo de consolas', 'CONSOLES');
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (14, 15);







insert into catalogo (nombre, descripcion) VALUES ('Cámaras', 'Catálogo de Cámaras');
insert into servicio_catalogo (catalogo_id, servicio_categoria_id) VALUES (3, 1);

insert into catalogo (nombre, descripcion) VALUES ('Baterías', 'Catálogo de Baterías');
insert into servicio_catalogo (catalogo_id, servicio_categoria_id) VALUES (4, 1);



insert into calificacion_producto (calificacion, comentario, producto_id, cliente_id) VALUES
     (5, 'Me gustó el producto', 1, 1), (4, 'Es de muy buena calidad', 1, 1);


insert into inventario_producto (cantidad_disponible, producto_id) VALUES (13, 1);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (35, 2);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (11, 3);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (25, 4);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (65, 5);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (13, 6);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (13, 7);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (13, 8);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (13, 9);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (13, 10);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (13, 11);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (13, 12);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (13, 13);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (13, 14);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (13, 15);


insert into oferta (nombre, descripcion, estatus_id) VALUES
    ('Oferta de inicio de semestre a distancia',
     'Oferta para los estudiantes como parte del incio del semestre',
      1),
    ('Oferta de fin de semestre a distancia',
     'Oferta para los estudiantes como parte del fin del semestre',
     2),
    ('Oferta de mitad de semestre a distancia',
     'Oferta para los estudiantes como parte del mitad del semestre',
     2);

insert into producto_oferta (oferta_id, producto_id, precio_descuento, porcentaje) VALUES
    (1, 1, '10.78', 70), (2, 1, '24.54', 25), (2, 1, '56.15', 48);

insert into servicio (nombre,descripcion,precio,estatus_id) values ('ejemplo','ejemplo',22,1);


insert into platform_parameter (name) VALUES ('Comisión Pasarela de Pagos'), ('Comisión de Servicios'),
    ('Cantidad Mínima en el Inventario');

insert into currency (name, iso) VALUES ('Dólar', 'USD'), ('Euro', 'EUR');

insert into platform (content, customer_id, platform_parameter_id, status_id) VALUES
    ('0.75', 1, 1, 1), ('1.75', 1, 2, 1), ('10', 1, 3, 1);




