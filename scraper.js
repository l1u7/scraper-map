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
    await page.waitForSelector('.hfpxzc');

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
        while (scroll < 1100) {
            await asyncScroll();  // Espera a que el scroll termine antes de continuar
        }

        console.log("Scroll finalizado.");
    });


    const results = await page.evaluate(() => {
        const elements = document.querySelectorAll('.hfpxzc');
        const links = Array.from(elements).map(el => el.href);
        return links;
    });


    let datosTotales = [];

    var i = 0;
    const locacion = await browser.newPage();
    while (i < results.length) {
        await locacion.goto(results[i], { waitUntil: 'networkidle0' });

        const nuevoDatos = await locacion.evaluate(() => {

            let elements = document.querySelectorAll('.CsEnBe');
            let nombre = document.querySelector('.DUwDvf.lfPIob').innerText;
            let valoracion = document.querySelector('.F7nice > span > span')?.innerText || '0' ;
            let direccion = ''
            let href = ''
            let phone = '';

            for (let i = 0; i < elements.length; i++) {
                let element = elements[i];
                let itemName = element.dataset.itemId;

                if (itemName === 'address') {
                    direccion = element.querySelector('.fontBodyMedium')?.innerText || 'n/a';
                } else if (itemName === 'authority') {
                    href = element?.href || 'n/a';
                } else if (itemName.startsWith('phone')) {
                    phone = itemName?.split(':')[2] || 'n/a';
                }
            }

            let filas = document.querySelectorAll('.eK4R0e.fontBodyMedium > tbody > tr')
            let horarios = Array.from(filas).map(el => {
                const columnas = el.querySelectorAll('td');
                return {
                    dia: columnas[0].innerText,
                    hora: columnas[1].innerText
                }
            })

            let datos = {
                nombre,
                valoracion,
                direccion,
                href,
                phone,
                horarios
            }
        
            return datos;
        });

        datosTotales.push(nuevoDatos); 
        i++;
    } 

    await browser.close(); 
    return new Promise(resolve => {resolve(datosTotales)});
};



module.exports = {
    localesEn
}
