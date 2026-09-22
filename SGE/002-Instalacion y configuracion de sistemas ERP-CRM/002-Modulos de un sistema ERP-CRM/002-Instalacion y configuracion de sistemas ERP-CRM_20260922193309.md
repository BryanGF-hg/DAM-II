# Reporte de proyecto

## Información de generación

- **Fecha:** 2026-09-22 19:33:09 +0200
- **Usuario:** hiro
- **UID:** 1000
- **Equipo:** hiro-Lenovo-ideapad-330S-14IKB
- **Sistema operativo:** Linux
- **Versión del kernel:** 6.17.0-35-generic
- **Arquitectura:** x86_64
- **Directorio de ejecución:** `/home/hiro/desktop`
- **Proyecto documentado:** `/home/hiro/Documents/GitHub/DAM-II/SGE/002-Instalacion y configuracion de sistemas ERP-CRM`
- **HMAC-SHA-256 de autenticidad:** `c0145eb795ad5aabdae76699c24b30574fa1e2a686d0b58a80ab6afdca61d05a`

> El HMAC-SHA-256 se calcula sobre el documento completo usando un secreto incluido en el programa y 64 ceros en el propio campo del HMAC. El secreto no se escribe en el informe. Este mecanismo permite comprobar integridad y que el documento fue generado con el mismo secreto.

## Estructura del proyecto

```
/home/hiro/Documents/GitHub/DAM-II/SGE/002-Instalacion y configuracion de sistemas ERP-CRM
└── 001-TIpos de instalacion
    ├── 001-darkorange
    │   ├── api
    │   │   └── superapi.php
    │   ├── codigo.js
    │   ├── estilos.css
    │   ├── index.html
    │   ├── modulos
    │   ├── nucleos
    │   └── util
    ├── 002-darkorange
    │   ├── api
    │   │   └── superapi.php
    │   ├── codigo.js
    │   ├── estilos.css
    │   ├── index.html
    │   ├── modulos
    │   ├── nucleos
    │   └── util
    └── 003-darkorange
        ├── api
        │   └── superapi.php
        ├── codigo.js
        ├── estilos.css
        ├── index.html
        ├── modulos
        ├── nucleos
        └── util
```

## Bases de datos SQLite

Esta sección documenta únicamente el esquema de las bases SQLite detectadas. No se vuelcan registros ni datos de usuario.

No se han encontrado bases SQLite con extensiones .db, .sqlite o .sqlite3.

## Código (intercalado)

# 002-Instalacion y configuracion de sistemas ERP-CRM
## 001-TIpos de instalacion
### 001-darkorange
**codigo.js**
```js
fetch("api/superapi.php?ruta=entidades")
.then(function(respuesta){return respuesta.json()})
.then(function(datos){
  console.log(datos)
  let menu = document.querySelector("nav")      
  datos.forEach(function(dato){
    menu.innerHTML += '<a href="">'+dato+'</a>'
  })
})
```
**estilos.css**
```css
html,body{padding:0px;margin:0px;font-family:Dejavu Sans Mono;width:100%;height:100%}
body{display:flex;flex-direction:column;}
header{flex:1;color:white;background:darkorange;}
main{flex:20;display:flex;}
nav{flex:1;background:darkorange;}
section{flex:8;}
header h1{padding:0px;margin:0px;font-size:20px;}
```
**index.html**
```html
<!DOCTYPE HTML>
<html>
  <head>
   <title>darkorange</title>
   <meta charset="utf-8">
   <link rel="stylesheet" href="estilos.css">
  </head>
  <body>
    <header>
     <h1>test | test</h1>
    </header>
    <main>
      <nav>
        <a href="">Enlace</a>
        <a href="">Enlace</a>
        <a href="">Enlace</a>
        <a href="">Enlace</a>
        <a href="">Enlace</a>
        <a href="">Enlace</a>
        <a href="">Enlace</a>
        <a href="">Enlace</a>      
      </nav>
      <section>
      </section>
    </main>   
    <script src="codigo.js"></script>
  </body>
</html>
```
#### api
**superapi.php**
```php
<?php
 switch($_GET['ruta']){
 		case "entidades":
      echo '
      	["clientes","productos","ventas","rrhh"]
      ';
      break;  	
 }
?>
```
#### modulos
#### nucleos
#### util
### 002-darkorange
**codigo.js**
```js
fetch("api/superapi.php?ruta=entidades")
.then(function(respuesta){return respuesta.json()})
.then(function(datos){
  console.log(datos)
  let menu = document.querySelector("nav")      
  datos.forEach(function(dato){
    menu.innerHTML += '<a href="">'+dato+'</a>'
  })
})
```
**estilos.css**
```css
html,body{padding:0px;margin:0px;font-family:Dejavu Sans Mono;width:100%;height:100%}
body{display:flex;flex-direction:column;}
header{flex:1;color:white;background:darkorange;padding:10px;}
main{flex:20;display:flex;}
nav{flex:1;background:darkorange;display:flex;flex-direction:column;
padding:10px;gap:10px;}
section{flex:8;}
header h1{padding:0px;margin:0px;font-size:20px;}
nav a{background:white;color:darkorange;text-decoration:none;
padding:10px;}
```
**index.html**
```html
<!DOCTYPE HTML>
<html>
  <head>
   <title>darkorange</title>
   <meta charset="utf-8">
   <link rel="stylesheet" href="estilos.css">
  </head>
  <body>
    <header>
     <h1>darkorange | darkorange</h1>
    </header>
    <main>
      <nav>  
      </nav>
      <section>
      </section>
    </main>   
    <script src="codigo.js"></script>
  </body>
</html>
```
#### api
**superapi.php**
```php
<?php
 switch($_GET['ruta']){
 		case "entidades":
      echo '
      	["clientes","productos","ventas","rrhh"]
      ';
      break;  	
 }
?>
```
#### modulos
#### nucleos
#### util
### 003-darkorange
**codigo.js**
```js
fetch("api/superapi.php?ruta=entidades")
.then(function(respuesta){return respuesta.json()})
.then(function(datos){
	console.log(datos)
  let menu = document.querySelector("nav")
  datos.forEach(function(dato){
  	menu.innerHTML += '<a href="">'+dato+'</a>'
  })
})

fetch("api/superapi.php?ruta=tabla")
.then(function(respuesta){return respuesta.json()})
.then(function(datos){
	console.log(datos)
 	let seccion = document.querySelector("section")
  let cadenatabla = ""
  cadenatabla += "<table>";
  // Primero pinto las cabeceras de columna
  cadenatabla += "<tr>";
  Object.keys(datos.clientes[0]).forEach(function(clave){
  	cadenatabla += "<th>"+clave+"</th>";
  })
  cadenatabla += "</tr>";
  // Primero pinto las cabeceras de columna
  // Ahora pinto el cuerpo de la tabla
  
  datos.clientes.forEach(function(cliente){
    cadenatabla += "<tr>";
  	Object.keys(cliente).forEach(function(clave){
      cadenatabla += "<td>"+cliente[clave]+"</td>";
    });
    cadenatabla += "</tr>";
  })
  
  // Ahora pinto el cuerpo de la tabla
  cadenatabla += "</table>";
  seccion.innerHTML = cadenatabla
})
```
**estilos.css**
```css
html,body{padding:0px;margin:0px;font-family:Dejavu Sans Mono;width:100%;height:100%}
body{display:flex;flex-direction:column;}
header{flex:1;color:white;background:darkorange;padding:10px;}
main{flex:20;display:flex;}
nav{flex:1;background:darkorange;display:flex;flex-direction:column;
padding:10px;gap:10px;}
section{flex:8;}
header h1{padding:0px;margin:0px;font-size:20px;}
nav a{background:white;color:darkorange;text-decoration:none;
padding:10px;}
section{padding:10px;}
table{border:1px solid darkorange;width:100%;}
table th{background:darkorange;color:white;}
table td{padding:5px;}
```
**index.html**
```html
<!DOCTYPE HTML>
<html>
  <head>
   <title>darkorange</title>
   <meta charset="utf-8">
   <link rel="stylesheet" href="estilos.css">
  </head>
  <body>
    <header>
     <h1>darkorange | darkorange</h1>
    </header>
    <main>
      <nav>  
      </nav>
      <section>
      </section>
    </main>   
    <script src="codigo.js"></script>
  </body>
</html>
```
#### api
**superapi.php**
```php
<?php
 switch($_GET['ruta']){
 		case "entidades":
    	echo '
      	["clientes","productos","ventas","rrhh"]
      ';
      break;
    case "tabla":
    	echo '
      	{
          "clientes": [
            {
              "id": 1,
              "nombre": "Laura",
              "apellidos": "Martínez García",
              "email": "laura.martinez@example.com",
              "telefono": "600123456",
              "ciudad": "Valencia",
              "edad": 34
            },
            {
              "id": 2,
              "nombre": "Carlos",
              "apellidos": "Sánchez López",
              "email": "carlos.sanchez@example.com",
              "telefono": "611234567",
              "ciudad": "Madrid",
              "edad": 42
            },
            {
              "id": 3,
              "nombre": "Marta",
              "apellidos": "Gómez Navarro",
              "email": "marta.gomez@example.com",
              "telefono": "622345678",
              "ciudad": "Alicante",
              "edad": 29
            },
            {
              "id": 4,
              "nombre": "David",
              "apellidos": "Ruiz Fernández",
              "email": "david.ruiz@example.com",
              "telefono": "633456789",
              "ciudad": "Castellón",
              "edad": 37
            },
            {
              "id": 5,
              "nombre": "Elena",
              "apellidos": "Torres Romero",
              "email": "elena.torres@example.com",
              "telefono": "644567890",
              "ciudad": "Barcelona",
              "edad": 31
            },
            {
              "id": 6,
              "nombre": "Javier",
              "apellidos": "Moreno Pérez",
              "email": "javier.moreno@example.com",
              "telefono": "655678901",
              "ciudad": "Valencia",
              "edad": 46
            },
            {
              "id": 7,
              "nombre": "Sara",
              "apellidos": "Vidal Ortega",
              "email": "sara.vidal@example.com",
              "telefono": "666789012",
              "ciudad": "Sevilla",
              "edad": 25
            },
            {
              "id": 8,
              "nombre": "Alejandro",
              "apellidos": "Gil Molina",
              "email": "alejandro.gil@example.com",
              "telefono": "677890123",
              "ciudad": "Murcia",
              "edad": 39
            },
            {
              "id": 9,
              "nombre": "Lucía",
              "apellidos": "Navarro Díaz",
              "email": "lucia.navarro@example.com",
              "telefono": "688901234",
              "ciudad": "Valencia",
              "edad": 28
            },
            {
              "id": 10,
              "nombre": "Pablo",
              "apellidos": "Herrera Campos",
              "email": "pablo.herrera@example.com",
              "telefono": "699012345",
              "ciudad": "Zaragoza",
              "edad": 51
            }
          ]
        }
      ';
      break;
 }
?>
```
#### modulos
#### nucleos
#### util
