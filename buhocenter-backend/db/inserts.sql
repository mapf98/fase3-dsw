
insert into cliente (primer_nombre, primer_apellido) values ('angel','sucasas');
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

insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, proveedor_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2, 2);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, proveedor_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2, 2);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, proveedor_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2, 2);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, proveedor_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2, 2);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, proveedor_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2, 2);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, proveedor_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2, 2);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, proveedor_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2, 2);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, proveedor_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2, 2);
insert into producto (nombre, descripcion, precio, precio_envio, estatus_id, proveedor_id, marca_id) VALUES
    ('2018 Newest HP Touchscreen 15.6 inch HD Laptop, Latest Intel Quad-Core i5-8250U Processor up to 3.40 GHz, 8GB DDR4, 1TB Hard Drive, DVD-RW, HDMI, Webcam, Bluetooth, Windows 10 Home',
     'Intel 8th Generation Quad-Core i5-8250U Processor Dual-Core, up to 3.4 GHz, Intel UHD Graphics 620',
     599.99, 20.5, 1, 2, 2);

insert into foto_producto (contenido, producto_id) VALUES ('audifonos.png', 1);
insert into foto_producto (contenido, producto_id) VALUES ('macbook.jpg', 2);
insert into foto_producto (contenido, producto_id) VALUES ('audifonos.png', 3);
insert into foto_producto (contenido, producto_id) VALUES ('macbook.jpg', 4);
insert into foto_producto (contenido, producto_id) VALUES ('macbook.jpg', 5);
insert into foto_producto (contenido, producto_id) VALUES ('audifonos.png', 6);
insert into foto_producto (contenido, producto_id) VALUES ('audifonos.png', 7);
insert into foto_producto (contenido, producto_id) VALUES ('audifonos.png', 8);
insert into foto_producto (contenido, producto_id) VALUES ('macbook.jpg', 9);

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

insert into cliente (primer_nombre, primer_apellido, fecha_nacimiento, estatus_id, rol_id) VALUES
    ('Andrea', 'Da Silva', '1999-01-25 00:00:00.000000', 1, 1);

insert into calificacion_producto (calificacion, comentario, producto_id, cliente_id) VALUES
     (5, 'Me gustó el producto', 1, 1), (4, 'Es de muy buena calidad', 1, 1);

