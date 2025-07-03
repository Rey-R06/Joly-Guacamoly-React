# 🛒 Product Manager API - Backend

Este es el backend del sistema de gestión de pedidos para **JolyDips**, desarrollado con **Java + Spring Boot**, y conectado a una base de datos **MySQL**.

---

## 🚀 Tecnologías utilizadas

- ✅ Java 17  
- ✅ Spring Boot 3
  - Spring Web
  - Spring Data JPA
  - Hibernate  
- ✅ MySQL  
- ✅ Maven  
- ✅ Railway (despliegue de backend y base de datos)  
- ✅ Vercel (Frontend conectado)  

---

## 📦 Funcionalidades principales

- CRUD de productos
- Gestión de usuarios (administradores y clientes invitados)
- Registro automático de invitados tras realizar pedidos
- Carrito de compras con creación de pedidos
- Relación entre usuarios, pedidos e ítems del pedido
- Actualización de estado del pedido (`PENDIENTE`, `ENVIADO`, etc.)
- Exposición de endpoints RESTful

---

## 📁 Estructura del proyecto

src/
├── controller/
│ └── ProductoController.java
│ └── PedidoController.java
│ └── UsuarioController.java
├── service/
│ └── ProductoService.java
│ └── PedidoService.java
│ └── UsuarioService.java
├── repository/
│ └── ProductoRepository.java
│ └── PedidoRepository.java
│ └── UsuarioRepository.java
├── model/
│ └── Productos.java
│ └── Usuarios.java
│ └── Pedidos.java
│ └── ItemPedido.java
└── config/
└── WebConfig.java (CORS)

yaml
Copy
Edit

---

## ⚙️ Configuración

### 🔐 Variables de entorno

Estas son las variables que debes configurar, ya sea en `application.properties` o directamente en Railway:

```properties
# Configuración de MySQL desde Railway
spring.datasource.url=jdbc:mysql://<RAILWAY_HOST>:<PORT>/<DATABASE>
spring.datasource.username=<USERNAME>
spring.datasource.password=<PASSWORD>
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
🟡 Nota: Reemplaza los valores <RAILWAY_HOST>, <PORT>, <USERNAME>, etc. con las variables de Railway.

🔓 CORS para conectar con frontend (Vercel)
En WebConfig.java:

java
Copy
Edit
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins("https://tu-frontend.vercel.app")
        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE");
}
📫 API Endpoints
Método	Endpoint	Descripción
GET	/productos	Lista todos los productos
POST	/productos	Crea un nuevo producto
PATCH	/usuarios/{id}/agregar-pedido	Agrega pedido al usuario
POST	/pedidos	Crea un pedido
PATCH	/pedidos/{id}/estado	Actualiza estado del pedido
GET	/usuarios/{id}	Trae un usuario por ID

🛠️ Despliegue
Este backend está desplegado en Railway y se conecta con un frontend desplegado en Vercel.

Pasos básicos:

Crea el proyecto en Railway.

Agrega tu base de datos MySQL.

Configura las variables de entorno en Railway.

Realiza el deploy conectando tu repositorio de GitHub.

👨‍💻 Autor
Desarrollado por @Rey-R06 como parte del sistema de gestión de pedidos para JolyDips.

Equipo:
Luis Camilo Rossi Ibarra (luiscamilorossiibarra@gmail.com)
Simon Valencia Lopez (svalencia@cesde.net)
Sergio Andres Zapata Alvarez (seanzapataal@cesde.net)
