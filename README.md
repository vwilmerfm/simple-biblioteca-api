# 📚 simple-biblioteca-api

Una pequeña aplicación web de biblioteca desarrollada con **Node.js**, **Express** y **PostgreSQL**, siguiendo una **arquitectura orientada a objetos**. Este proyecto fue creado como parte de la **Práctica 2 del diplomado USIP**. Ideal para gestionar libros, usuarios y préstamos de manera sencilla y eficiente.

---

## 🚀 Características

- API RESTful construida con **Express**.
- Base de datos relacional con **PostgreSQL**.
- Arquitectura organizada con enfoque **orientado a objetos**.
- Pruebas de endpoints mediante **Postman**.

---

## 🔠 Tecnologías utilizadas

- 🟢 Node.js
- ⚙️ Express
- 🐘 PostgreSQL
- 📬 Postman (para pruebas)
- 📦 npm (gestión de paquetes)

---

## 📅 Instalación y ejecución

### 1. 🔄 Clonar el repositorio

```bash
git clone https://github.com/vwilmerfm/simple-biblioteca-api.git
cd simple-biblioteca-api
```

### 2. 📦 Instalar las dependencias

```bash
npm install
```

### 3. 🛠️ Configurar la base de datos

Verifica que PostgreSQL esté instalado y corriendo. Crea una base de datos y configura la conexión en un archivo `.env` con el siguiente formato:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nombre_de_tu_base
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
```

### 4. 🔧 Ejecutar el script

Ejecuta el script SQL incluido:

```bash
psql -U tu_usuario -d nombre_de_tu_base -f estructura_bd.sql
```

### 5. ▶️ Iniciar la aplicación

```bash
npm run start
```

---

## 🤪 Pruebas de la API

Las peticiones para probar los endpoints están disponibles en la plataforma del **USIP**.

---

## 📁 Estructura del proyecto

```plaintext
├── controllers/
├── models/
├── routes/
├── services/
├── config/
├── app.js
└── ...
```

---

## 🧠 Autor y créditos

Desarrollado como parte del diplomado en **MOD 2 - ARQUITECTURA DE SOFTWARE - USIP**.

---

## 📬 Contacto

**Wilmer Froilan Villca Mamani**  
vwilmer.fm@outlook.com
