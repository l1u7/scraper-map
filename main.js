const fs = require('fs/promises'); // Importar el módulo fs/promises
const scraper = require('./scraper.js')
const datos = require('./recursos.js');



async function main() {
   
    for (var i = 0; i < datos.busquedas.length; i++) { 

      const nombreBusqueda = datos.busquedas[i]

      try {

        const tituloArchivo = nombreBusqueda.replaceAll(' ', '-'); 
        const resultados = await scraper.localesEn(nombreBusqueda); 

        await abrirYEscribirArchivo(
        './datos/' + tituloArchivo + '.json', 
            JSON.stringify(resultados, null, 2)
        );
        
      } catch (error) {
        console.log('Hubo un error en: ', nombreBusqueda)
      }


        
    }  

}


async function abrirYEscribirArchivo(rutaArchivo, texto) {
  let fileHandle;
  try {
    fileHandle = await fs.open(rutaArchivo, 'a'); // 'a' (append): crea el archivo si no existe y escribe al final del archivo
    await fileHandle.write(texto);
    console.log(`Texto guardado correctamente en ${rutaArchivo}`);
  } catch (error) {
    console.error(`Ocurrió un error al manejar el archivo: ${error.message}`);
  } finally {
    if (fileHandle) {
      await fileHandle.close();
    }
  }
}

main();