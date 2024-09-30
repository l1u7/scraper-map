# Google Maps Scraper

Este proyecto tiene como objetivo buscar sitios en Google Maps y realizar un scraping de la información relevante utilizando **Puppeteer**. El proyecto está diseñado para extraer información de lugares en base a textos de búsqueda que se encuentran en el archivo `recursos.js`.

## Descripción del Proyecto

El proyecto utiliza Puppeteer, una librería de automatización de navegadores, para navegar por Google Maps y extraer información de lugares específicos en función de términos de búsqueda predefinidos.

- El archivo principal que ejecuta el proceso es `main.js`.
- Los textos de búsqueda, es decir, las palabras clave que definen los lugares a buscar, se almacenan en el archivo `recursos.js`.

### Características:

- Automatiza la búsqueda en Google Maps.
- Realiza scraping de la información de los lugares encontrados.
- Guarda o procesa los datos obtenidos de forma estructurada en un nuevo archivo dentro de la carpeta "datos".

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes:

- **Node.js**: [Descargar Node.js](https://nodejs.org/)
- **Puppeteer**: Librería de automatización para control de navegadores.

Para instalar Puppeteer y las demás dependencias, ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm install 
node main.js
