CREATE TABLE IF NOT EXISTS "Restaurantes"
(
    "id"              serial       NOT NULL UNIQUE,
    "nombre"          varchar(255) NOT NULL,
    "imagen"          varchar(255),
    "ubicacion_gmaps" varchar(255),
    "direccion"       varchar(255),
    "instagram"       varchar(255),
    "facebook"        varchar(255),
    "whatsapp"        varchar(255),
    "activo"          boolean      NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Usuarios"
(
    "id"         serial       NOT NULL UNIQUE,
    "rol"        bigint       NOT NULL,
    "nombre"     varchar(255) NOT NULL,
    "apellidos"  varchar(255) NOT NULL,
    "correo"     varchar(255) NOT NULL UNIQUE,
    "contraseña" varchar(255) NOT NULL,
    "verificado" boolean      NOT NULL,
    "activo"     bigint       NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "RolesUsuarioRestaurante"
(
    "id"             serial       NOT NULL UNIQUE,
    "usuario_id"     bigint       NOT NULL,
    "restaurante_id" bigint       NOT NULL,
    "rol"            varchar(255) NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Productos"
(
    "id"             integer          NOT NULL,
    "restaurante_id" bigint           NOT NULL,
    "nombre"         varchar(20)      NOT NULL,
    "descripcion"    varchar(50)      NOT NULL,
    "precio"         double precision NOT NULL,
    "imagen"         varchar(255)     NOT NULL,
    "activo"         boolean          NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Horarios"
(
    "id"             serial       NOT NULL UNIQUE,
    "restaurante_id" bigint       NOT NULL,
    "dia_semana"     varchar(255) NOT NULL,
    "hora_apertura"  bigint       NOT NULL,
    "hora_cierre"    bigint       NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Mesas"
(
    "id"             serial       NOT NULL UNIQUE,
    "restaurante_id" bigint       NOT NULL,
    "nombre"         varchar(255) NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Roles"
(
    "id"  serial       NOT NULL UNIQUE,
    "rol" varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Promociones"
(
    "id"           serial       NOT NULL UNIQUE,
    "producto_id"  bigint       NOT NULL,
    "descripción"  varchar(255) NOT NULL,
    "fecha_inicio" date         NOT NULL,
    "fecha_fin"    varchar(255) NOT NULL,
    "visible"      boolean      NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Calificaciones"
(
    "id"           serial       NOT NULL UNIQUE,
    "usuario_id"   bigint       NOT NULL,
    "producto_id"  bigint       NOT NULL,
    "calificacion" bigint       NOT NULL,
    "comentario"   varchar(255) NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "OrdenDetalles"
(
    "id"          serial NOT NULL UNIQUE,
    "producto_id" bigint NOT NULL,
    "order_id"    bigint NOT NULL,
    "cantidad"    bigint NOT NULL,
    PRIMARY KEY ("id")
);


CREATE TABLE IF NOT EXISTS "Ordenes"
(
    "id"           serial                   NOT NULL UNIQUE,
    "cliente_id"   bigint                   NOT NULL,
    "estado"       varchar(255)             NOT NULL,
    "fecha_y_hora" timestamp with time zone NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Ingredientes"
(
    "id"            serial       NOT NULL UNIQUE,
    "nombre"        varchar(255) NOT NULL,
    "descripcion"   varchar(255) NOT NULL,
    "unidad_medida" varchar(255) NOT NULL,
    "categoria"     varchar(255) NOT NULL,
    "stock_actual"  bigint       NOT NULL,
    "stock_minimo"  bigint       NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ProductoIngredientes"
(
    "id"             serial NOT NULL UNIQUE,
    "producto_id"    bigint NOT NULL,
    "ingrediente_id" bigint NOT NULL,
    "cantidad"       bigint NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Pagos"
(
    "id"             serial                   NOT NULL UNIQUE,
    "orden_id"       bigint                   NOT NULL,
    "timestamp"      timestamp with time zone NOT NULL,
    "monto"          varchar(255)             NOT NULL,
    "metodo_de_pago" varchar(255)             NOT NULL,
    "factura_url"    varchar(255)             NOT NULL,
    PRIMARY KEY ("id")
);


CREATE TABLE IF NOT EXISTS "Proveedores"
(
    "id"             serial       NOT NULL UNIQUE,
    "nombre"         varchar(255) NOT NULL,
    "restaurante_id" bigint       NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Compras"
(
    "id"           serial NOT NULL UNIQUE,
    "proveedor_id" bigint NOT NULL,
    "fecha"        date   NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "CompraIngredientes"
(
    "id"             serial NOT NULL UNIQUE,
    "ingrediente_id" bigint NOT NULL,
    "cantidad"       bigint NOT NULL,
    "compra_id"      bigint NOT NULL,
    PRIMARY KEY ("id")
);


ALTER TABLE "Usuarios"
    ADD CONSTRAINT "Usuarios_fk1" FOREIGN KEY ("rol") REFERENCES "Roles" ("id");
ALTER TABLE "RolesUsuarioRestaurante"
    ADD CONSTRAINT "RolesUsuarioRestaurante_fk1" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios" ("id");

ALTER TABLE "RolesUsuarioRestaurante"
    ADD CONSTRAINT "RolesUsuarioRestaurante_fk2" FOREIGN KEY ("restaurante_id") REFERENCES "Restaurantes" ("id");
ALTER TABLE "Productos"
    ADD CONSTRAINT "Productos_fk1" FOREIGN KEY ("restaurante_id") REFERENCES "Restaurantes" ("id");
ALTER TABLE "Horarios"
    ADD CONSTRAINT "Horarios_fk1" FOREIGN KEY ("restaurante_id") REFERENCES "Restaurantes" ("id");
ALTER TABLE "Mesas"
    ADD CONSTRAINT "Mesas_fk1" FOREIGN KEY ("restaurante_id") REFERENCES "Restaurantes" ("id");

ALTER TABLE "Promociones"
    ADD CONSTRAINT "Promociones_fk1" FOREIGN KEY ("producto_id") REFERENCES "Productos" ("id");
ALTER TABLE "Calificaciones"
    ADD CONSTRAINT "Calificaciones_fk1" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios" ("id");

ALTER TABLE "Calificaciones"
    ADD CONSTRAINT "Calificaciones_fk2" FOREIGN KEY ("producto_id") REFERENCES "Productos" ("id");
ALTER TABLE "OrdenDetalles"
    ADD CONSTRAINT "OrdenDetalles_fk1" FOREIGN KEY ("producto_id") REFERENCES "Productos" ("id");
ALTER TABLE "OrdenDetalles"
    ADD CONSTRAINT "OrdenDetalles_fk2" FOREIGN KEY ("order_id") REFERENCES "Ordenes" ("id");
ALTER TABLE "Ordenes"
    ADD CONSTRAINT "Ordenes_fk1" FOREIGN KEY ("cliente_id") REFERENCES "Usuarios" ("id");

ALTER TABLE "ProductoIngredientes"
    ADD CONSTRAINT "ProductoIngredientes_fk1" FOREIGN KEY ("producto_id") REFERENCES "Productos" ("id");

ALTER TABLE "ProductoIngredientes"
    ADD CONSTRAINT "ProductoIngredientes_fk2" FOREIGN KEY ("ingrediente_id") REFERENCES "Ingredientes" ("id");
ALTER TABLE "Pagos"
    ADD CONSTRAINT "Pagos_fk1" FOREIGN KEY ("orden_id") REFERENCES "Ordenes" ("id");

ALTER TABLE "Proveedores" ADD CONSTRAINT "Proveedores_fk2" FOREIGN KEY ("restaurante_id") REFERENCES "Restaurantes"("id");
ALTER TABLE "Compras" ADD CONSTRAINT "Compras_fk1" FOREIGN KEY ("proveedor_id") REFERENCES "Proveedores"("id");
ALTER TABLE "CompraIngredientes" ADD CONSTRAINT "CompraIngredientes_fk1" FOREIGN KEY ("ingrediente_id") REFERENCES "Ingredientes"("id");

ALTER TABLE "CompraIngredientes" ADD CONSTRAINT "CompraIngredientes_fk3" FOREIGN KEY ("compra_id") REFERENCES "Compras"("id");