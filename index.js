const puppeteer = require('puppeteer');

const cpfs = [
  '41467272000',
  '',
];

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const url = 'https://portaldatransparencia.gov.br/servidores/consulta?ordenarPor=nome&direcao=asc';

  for (const cpf of cpfs) {
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Clica no botão "CPF"
    await page.waitForSelector('#btn-cpf-1', { timeout: 15000 });
    await page.click('#btn-cpf-1');

    // Espera o campo de texto 
    await page.waitForSelector('#cpf', { timeout: 15000 });

    // Digitar o CPF
    await page.type('#cpf', cpf);

    // Clicar no botão "Adicionar"
    await page.waitForFunction(() => {
      const btn = document.querySelector('button.br-button.primary.btn-adicionar');
      return btn && !btn.disabled && btn.offsetParent !== null;
    }, { timeout: 15000 });
    await page.evaluate(() => {
      const btn = document.querySelector('button.br-button.primary.btn-adicionar');
      if (btn) btn.click();
    });

    // Clicar no botão "Consultar"
    await page.waitForSelector('button.btn-consultar', { timeout: 15000 });
    await page.click('button.btn-consultar');

    // "Detalhar" e clicar
    await page.waitForSelector('a[aria-label="Detalhar"]', { timeout: 15000 });
    await page.click('a[aria-label="Detalhar"]');

    console.log(`Processado CPF: ${cpf}`);

    await page.waitForTimeout(2000);
  }

  await browser.close();
})();
