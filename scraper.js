const puppeteer = require('puppeteer');

(async () => {
    // Lanzar el navegador y abrir una nueva página
    const browser = await puppeteer.launch({ headless: false }); // Modo no encubierto para ver el proceso
    const page = await browser.newPage();

    // Navegar a Google Maps y buscar panaderías en Nueva York
    await page.goto('https://www.google.com/maps', { waitUntil: 'networkidle2' });

    // Esperar hasta que la barra de búsqueda esté disponible y escribir en ella
    await page.waitForSelector('#searchboxinput');
    await page.type('#searchboxinput', 'panaderías en Nueva York');
    await page.keyboard.press('Enter');

    // Esperar a que los resultados de búsqueda se carguen
    await page.waitForSelector('.Nv2PK.THOPZb.CpccDe');

    await page.waitForSelector(".m6QErb.DxyBCb.kA9KIf.dS8AEf.XiKgde.ecceSd");
    
    // Hacer scroll al segundo elemento
    await page.evaluate(async () => {
        const elementoAscroll = document.querySelectorAll('.m6QErb.DxyBCb.kA9KIf.dS8AEf.XiKgde.ecceSd')[1];
        let scroll = 0;
        
        // Función que hace scroll asincrónicamente
        const asyncScroll = async () => {
            return new Promise(resolve => {
                setTimeout(() => {
                    scroll += 100;
                    elementoAscroll.scrollTo(0, scroll);
                    console.log(`scroll (0, ${scroll})`);
    
                    resolve(scroll);
                }, 500);  // Espera 500ms antes de hacer scroll
            });
        };
    
        // Loop asincrónico para ejecutar el scroll
        while (scroll < 2000) {
            await asyncScroll();  // Espera a que el scroll termine antes de continuar
        }
    
        console.log("Scroll finalizado.");
    });
  
    
    const bakeries = await page.evaluate(() => {
        console.log(`Intermedio`);

        let box = document.querySelectorAll(".m6QErb.DxyBCb.kA9KIf.dS8AEf.XiKgde")[2]
        const results = Array.from(document.querySelectorAll('.Nv2PK.THOPZb.CpccDe'));
        
        return results.length;
    });

    console.log(bakeries);
 
    
    // // Cerrar el navegador
    // await browser.close();
})();
