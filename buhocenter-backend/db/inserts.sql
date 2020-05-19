
insert into cliente (primer_nombre, primer_apellido) values ('angel','sucasas');
insert into cliente (primer_nombre, primer_apellido, fecha_nacimiento, estatus_id, rol_id) VALUES
    ('Andrea', 'Da Silva', '1999-01-25 00:00:00.000000', 1, 1);

insert into producto (nombre,descripcion,precio,precio_envio) values ('ejemplo','este es un producto ejemplo',22,23);

insert into estatus (nombre, descripcion) VALUES ('Activo', 'Indica que el recurso está disponible para el sistema');
insert into estatus (nombre, descripcion) VALUES ('Inactivo', 'Indica que el recurso no está disponible para el sistema');

insert into rol (nombre, prioridad) values ('Cliente', 1);
insert into rol (nombre, prioridad) values ('Administrador', 1);

insert into lenguaje (iso, nombre, bandera) values ('EN','English', 1);
insert into lenguaje (iso, nombre, bandera) values ('ES','Spanish', 2);

insert into proveedor (nombre) values ('Apple Products');
insert into proveedor (nombre) values ('HP');

insert into marca (nombre) values ('Apple Computers');
insert into marca (nombre) values ('HP');

insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2);

insert into servicio (nombre, descripcion, precio, estatus_id)
    VALUES ('Reparación de Lavadoras y Neveras', 'Reparamos lavadoras y neveras. Contamos con certificados a nivel mundial y experiencia de más de 10 años.', 345.76, 1);
insert into servicio (nombre, descripcion, precio, estatus_id)
    VALUES ('Reparación de Computadoras', 'Reparamos CPU y monitores. Contamos con certificados a nivel mundial y experiencia de más de 10 años.', 789.76, 2);

insert into proveedor_producto (producto_id, proveedor_id) VALUES (1, 1);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (2, 1);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (3, 2);
insert into proveedor_producto (producto_id, proveedor_id) VALUES (4, 2);

insert into proveedor_servicio (servicio_id, proveedor_id) VALUES (2, 1);
insert into proveedor_servicio (servicio_id, proveedor_id) VALUES (2, 2);

insert into foto_servicio (contenido, servicio_id) VALUES ('reparaciones.jpg', 1);
insert into foto_servicio (contenido, servicio_id) VALUES ('reparaciones.jpg', 2);

insert into foto_producto (contenido, producto_id) VALUES ('audifonos.png', 1);
insert into foto_producto (contenido, producto_id) VALUES ('macbook.jpg', 2);
insert into foto_producto (contenido, producto_id) VALUES ('audifonos.png', 3);
insert into foto_producto (contenido, producto_id) VALUES ('macbook.jpg', 4);
insert into foto_producto (contenido, producto_id) VALUES ('macbook.jpg', 5);
insert into foto_producto (contenido, producto_id) VALUES ('audifonos.png', 6);
insert into foto_producto (contenido, producto_id) VALUES ('audifonos.png', 7);
insert into foto_producto (contenido, producto_id) VALUES ('audifonos.png', 8);
insert into foto_producto (contenido, producto_id) VALUES ('macbook.jpg', 9);
insert into foto_producto (contenido, producto_id) VALUES ('LOGO_UCAB.png', 1);

insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (1, '7', '5', '6');
insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (2, '17', '5', '9');
insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (3, '16', '1', '21');
insert into dimension_producto (producto_id, ancho, alto, largo) VALUES (4, '11', '3', '14');

insert into pregunta_producto (comentario, producto_id, cliente_id)
    VALUES ('Me encantó el producto Me encantó el producto Me encantó el producto Me encantó el producto Me encantó el producto Me encantó el producto Me encantó el producto Me encantó el producto Me encantó el producto Me encantó el producto Me encantó el producto', 1, 1);

insert into categoria (nombre) VALUES ('Electrónica');
insert into producto_categoria (category_id, producto_id) VALUES (1, 1);
insert into producto_categoria (category_id, producto_id) VALUES (1, 2);
insert into producto_categoria (category_id, producto_id) VALUES (1, 3);
insert into producto_categoria (category_id, producto_id) VALUES (1, 4);
insert into producto_categoria (category_id, producto_id) VALUES (1, 5);

insert into catalogo (nombre, descripcion) VALUES ('Audífonos y Computadoras', 'Catálogo de Audífonos y Computadoras');
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (1, 1);
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (1, 2);
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (1, 3);
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (1, 4);
insert into producto_catalogo (catalogo_id, producto_categoria_id) VALUES (1, 5);

insert into calificacion_producto (calificacion, comentario, producto_id, cliente_id) VALUES
     (5, 'Me gustó el producto', 1, 1), (4, 'Es de muy buena calidad', 1, 1);


insert into inventario_producto (cantidad_disponible, producto_id) VALUES (13, 1);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (35, 2);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (11, 3);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (25, 4);
insert into inventario_producto (cantidad_disponible, producto_id) VALUES (65, 5);

insert into oferta (nombre, descripcion, fecha_inicio, fecha_fin, estatus_id) VALUES
    ('Oferta de inicio de semestre a distancia', 'Oferta para los estudiantes como parte del incio del semestre',
     '2020-06-25 00:00:00.000000', '2020-10-25 00:00:00.000000', 1),
    ('Oferta de fin de semestre a distancia', 'Oferta para los estudiantes como parte del fin del semestre',
     '2020-04-25 00:00:00.000000', '2020-09-25 00:00:00.000000', 1),
    ('Oferta de mitad de semestre a distancia', 'Oferta para los estudiantes como parte del mitad del semestre',
     '2020-03-25 00:00:00.000000', '2020-04-25 00:00:00.000000', 1);

insert into producto_oferta (oferta_id, producto_id, precio_descuento, porcentaje) VALUES
    (1, 1, '10.78', 70), (2, 1, '24.54', 25), (2, 1, '56.15', 48);


insert into servicio (nombre,descripcion,precio,estatus_id) values ('ejemplo','ejemplo',22,1);


