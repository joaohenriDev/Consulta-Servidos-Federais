const puppeteer = require('puppeteer');

const cpfs = [
  '41467272000', '12574082672', '31988717949', '22413170200',
  '16170474220', '12834777268', '41700457772', '70322864704',
  '10311947204', '23593113953', '14324768668', '13556681153',
  '91355354820', '22082220249', '13238019449'
];

const url = 'https://portaldatransparencia.gov.br/servidores/consulta?ordenarPor=nome&direcao=asc';

// Delay auxiliar para simular ações humanas
async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function clearAndTypeSlow(page, selector, text) {
  await page.evaluate(sel => {
    const el = document.querySelector(sel);
    if (el) el.value = '';
  }, selector);

  for (const char of text) {
    await page.type(selector, char);
    await delay(100);
  }
}

async function clickWithScroll(page, selector, delayAfter = 500) {
  await page.evaluate(sel => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await delay(500);
  await page.click(selector);
  await delay(delayAfter);
}

async function waitAndClickDetalhar(page) {
  await page.waitForFunction(() => {
    const btns = Array.from(document.querySelectorAll('a[aria-label="Detalhar"]'));
    return btns.length > 0 && btns[0].offsetParent !== null;
  }, { timeout: 10000 });

  await delay(1000);
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('a[aria-label="Detalhar"]'));
    if (btns.length) btns[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await delay(700);
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('a[aria-label="Detalhar"]'));
    if (btns.length) btns[0].click();
  });
}


// Abre a seção de histórico dos vínculos
async function openHistoricoVinculos(page) {
  try {
    await page.waitForFunction(() => {
      const btn = Array.from(document.querySelectorAll('button.header'))
        .find(b => b.textContent.includes('Histórico dos vínculos com o Poder Executivo Federal'));
      return btn && !btn.disabled && btn.offsetParent !== null;
    }, { timeout: 10000 });

    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button.header'))
        .find(b => b.textContent.includes('Histórico dos vínculos com o Poder Executivo Federal'));
      if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    await delay(700);

    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button.header'))
        .find(b => b.textContent.includes('Histórico dos vínculos com o Poder Executivo Federal'));
      if (btn) btn.click();
    });
  } catch {
    console.warn('Botão "Histórico dos vínculos com o Poder Executivo Federal" não encontrado ou não clicável.');
  }
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });

  const page = await browser.newPage();

  for (const cpf of cpfs) {
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Rejeita cookies
    await page.evaluate(() => {
      const rejectBtn = document.querySelector('#accept-minimal-btn');
      if (rejectBtn) rejectBtn.click();
    });

    await page.waitForSelector('#btn-cpf-1', { timeout: 15000 });
    await clickWithScroll(page, '#btn-cpf-1', 800);

    await page.waitForSelector('#cpf', { timeout: 15000 });
    await clearAndTypeSlow(page, '#cpf', cpf);

    await page.waitForFunction(() => {
      const btn = document.querySelector('button.br-button.primary.btn-adicionar');
      return btn && !btn.disabled && btn.offsetParent !== null;
    }, { timeout: 15000 });

    await page.evaluate(() => {
      const btn = document.querySelector('button.br-button.primary.btn-adicionar');
      if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await delay(700);

    await Promise.all([
      page.waitForFunction(cpf => 
        Array.from(document.querySelectorAll('.br-tag')).some(tag => tag.textContent.includes(cpf)), 
        { timeout: 10000 }, cpf),
      page.evaluate(() => {
        const btn = document.querySelector('button.br-button.primary.btn-adicionar');
        if (btn) btn.click();
      })
    ]);

    await page.waitForSelector('button.btn-consultar', { timeout: 15000 });
    await clickWithScroll(page, 'button.btn-consultar', 1000);

    try {
      await waitAndClickDetalhar(page);
    } catch {
      console.warn(`Nenhum resultado encontrado para CPF ${cpf}. Pulando para o próximo...`);
      continue;
    }

    await openHistoricoVinculos(page);

    await delay(10000); // Tempo para visualização antes de ir para o próximo CPF
    console.log(`✅ Processado CPF: ${cpf}`);
  }

  // await browser.close();
})();
