const puppeteer = require('puppeteer');

async function scrapeSite() {
  const url = 'https://www.scrapethissite.com/pages/simple/';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const result = await page.evaluate(() => {
    const scrapedCountries = [];
    const countries = document.querySelectorAll('.country-name');
    const capitals = document.querySelectorAll('.country-capital');
    countries.forEach((country, index) => {
      scrapedCountries.push({
        name: country.innerText,
        capital: capitals[index].innerText,
      });
    });
    return scrapedCountries;
  });
  /* console.log(result); */
  await browser.close();
  return result;
}

module.exports = { scrapeSite };
