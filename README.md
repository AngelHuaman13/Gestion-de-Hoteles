# 🏨 Gestión de Hoteles

Un sistema completo de gestión hotelera desarrollado con **Spring Boot** que permite administrar reservas, huéspedes, habitaciones y más.

## 📋 Descripción del Proyecto

Esta aplicación proporciona una solución integral para la administración de hoteles, permitiendo:
- ✅ Gestión de habitaciones y categorías
- ✅ Administración de reservas y check-in/check-out
- ✅ Control de huéspedes
- ✅ Generación de reportes
- ✅ Sistema de usuarios y permisos

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Java 11+**
- **Spring Boot 3.x** - Framework principal
- **Spring Data JPA** - Persistencia de datos
- **Spring Security** - Autenticación y autorización
- **Spring MVC** - Controladores REST
- **MySQL 8.0** - Base de datos

### Frontend
- HTML5
- CSS3
- JavaScript / Bootstrap
- Thymeleaf (plantillas)

### Herramientas
- Maven - Gestor de dependencias
- Postman - Pruebas de API
- Git - Control de versiones

---

## 📦 Dependencias Principales

Las dependencias que usaremos en `pom.xml`:

```xml
<!-- Spring Boot Web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Spring Data JPA -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- MySQL Connector -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>

<!-- Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- Lombok (reducir código) -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>

<!-- Validation -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Java JDK 11 o superior**
  ```bash
  java -version
  ```

- **Maven 3.6 o superior**
  ```bash
  mvn -version
  ```

- **MySQL 8.0**
  ```bash
  mysql --version
  ```

- **Git**
  ```bash
  git --version
  ```

---

## ⚙️ Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/tuusuario/Gestion-de-Hoteles.git
cd Gestion-de-Hoteles
```

### 2. Crear base de datos
```sql
CREATE DATABASE gestion_hoteles;
USE gestion_hoteles;
```

### 3. Configurar la conexión a BD
Edita el archivo `application.properties` o `application.yml`:

```properties
# application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/gestion_hoteles
spring.datasource.username=root
spring.datasource.password=tucontraseña
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 4. Instalar dependencias
```bash
mvn clean install
```

### 5. Ejecutar la aplicación
```bash
mvn spring-boot:run
```

La aplicación estará disponible en: `http://localhost:8080`

---

## 📁 Estructura del Proyecto

```
Gestion-de-Hoteles/
├── src/
│   ├── main/
│   │   ├── java/com/gestion/
│   │   │   ├── controller/        # Controladores REST
│   │   │   ├── service/           # Lógica de negocio
│   │   │   ├── repository/        # Acceso a datos
│   │   │   ├── entity/            # Entidades JPA
│   │   │   ├── dto/               # Data Transfer Objects
│   │   │   └── config/            # Configuración
│   │   └── resources/
│   │       ├── templates/         # HTML (Thymeleaf)
│   │       ├── static/            # CSS, JS, imágenes
│   │       └── application.properties
│   └── test/
├── pom.xml                        # Dependencias Maven
├── README.md
└── .gitignore
```

---

## 🚀 Uso

### Endpoints principales

#### Habitaciones
- `GET /api/habitaciones` - Obtener todas las habitaciones
- `POST /api/habitaciones` - Crear nueva habitación
- `GET /api/habitaciones/{id}` - Obtener habitación por ID
- `PUT /api/habitaciones/{id}` - Actualizar habitación
- `DELETE /api/habitaciones/{id}` - Eliminar habitación

#### Reservas
- `GET /api/reservas` - Obtener todas las reservas
- `POST /api/reservas` - Crear nueva reserva
- `GET /api/reservas/{id}` - Obtener reserva por ID
- `PUT /api/reservas/{id}` - Actualizar reserva

---

## 👥 Contribuir

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

---

## 📧 Contacto

**Autor:** Tu Nombre  
**Email:** tu.email@ejemplo.com  
**GitHub:** [@tuusuario](https://github.com/tuusuario)

---

## 📚 Recursos Útiles

- [Documentación Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [RESTful API Design](https://restfulapi.net/)

---

**¡Hecho con ❤️ para la gestión hotelera!**
