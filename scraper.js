const puppeteer = require('puppeteer');

function pausa(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
   

const localesEn = async (search) => {
    // Lanzar el navegador y abrir una nueva página
    const browser = await puppeteer.launch({ headless: false }); // Modo no encubierto para ver el proceso
    const page = await browser.newPage();

    // Navegar a Google Maps y buscar panaderías en Nueva York
    await page.goto('https://www.google.com/maps', { waitUntil: 'networkidle0' });

    // Esperar hasta que la barra de búsqueda esté disponible y escribir en ella
    await page.waitForSelector('#searchboxinput');
    await page.type('#searchboxinput', search);
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
        while (scroll < 100) {
            await asyncScroll();  // Espera a que el scroll termine antes de continuar
        }
    
        console.log("Scroll finalizado.");
    });
  
    
    const results = await page.evaluate(() => {
        const elements = document.querySelectorAll('.Nv2PK.THOPZb.CpccDe');
        const links = Array.from(elements).map(el => el.querySelector('a').href);
        return links;
    });

    var i = 0;
    const locacion = await browser.newPage();
    while (i < results.length) {
        await locacion.goto(results[i], { waitUntil: 'networkidle0'});
        
        console.log(results[i]);
        await pausa(1000); 
        i++;
    }
     
    await browser.close();
};

module.exports = {
    localesEn
}
 