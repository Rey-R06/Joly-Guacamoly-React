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

##📫 API Endpoints
Método	Endpoint	Descripción
- GET	/productos	Lista todos los productos
- POST	/productos	Crea un nuevo producto
- PATCH	/usuarios/{id}/agregar-pedido	Agrega pedido al usuario
- POST	/pedidos	Crea un pedido
- PATCH	/pedidos/{id}/estado	Actualiza estado del pedido
- GET	/usuarios/{id}	Trae un usuario por ID

##🛠️ Despliegue
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
