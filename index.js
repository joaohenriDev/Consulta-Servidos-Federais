const puppeteer = require('puppeteer');

const cpfs = [
  '41467272000',
  '12574082672',
  '31988717949',
  '13238019449',
  '22413170200',
  '16170474220',
  '12834777268',
  '41700457772',
  '70322864704',
  '10311947204',
  '23593113953',
  '14324768668',
  '13556681153',
  '91355354820',
  '22082220249'
];

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const url = 'https://portaldatransparencia.gov.br/servidores/consulta?ordenarPor=nome&direcao=asc';

  for (const cpf of cpfs) {
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('#btn-cpf-1', { timeout: 15000 });
    await page.click('#btn-cpf-1');
    await page.waitForSelector('#cpf', { timeout: 15000 });
    await page.type('#cpf', cpf);

    await page.waitForFunction(() => {
      const btn = document.querySelector('button.br-button.primary.btn-adicionar');
      return btn && !btn.disabled && btn.offsetParent !== null;
    }, { timeout: 15000 });

    await page.evaluate(() => {
      const btn = document.querySelector('button.br-button.primary.btn-adicionar');
      if (btn) btn.click();
    });

    await page.waitForSelector('button.btn-consultar', { timeout: 15000 });
    await page.click('button.btn-consultar');
    await page.waitForSelector('a[aria-label="Detalhar"]', { timeout: 15000 });

    await page.evaluate(() => {
      const detalhar = document.querySelector('a[aria-label="Detalhar"]');
      if (detalhar) detalhar.click();
    });

    await page.waitForSelector('button.header', { timeout: 10000 });

    await page.evaluate(() => {
      const botoes = Array.from(document.querySelectorAll('button.header'));
      const botaoHistorico = botoes.find(btn =>
        btn.textContent.includes('Histórico dos vínculos com o Poder Executivo Federal')
      );
      if (botaoHistorico) botaoHistorico.click();
    });

    await page.waitForSelector('#group-historico-poder-executivo', { timeout: 10000 });

    await page.waitForFunction(() => {
      const el = document.querySelector('h2');
      return el && el.textContent.includes('Servidor Público Federal');
    }, { timeout: 10000 });

    await new Promise(resolve => setTimeout(resolve, 10000));
    console.log(`Processado CPF: ${cpf}`);
  }
  // await browser.close();
})();
