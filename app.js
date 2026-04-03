const marketIndexes = [
  { name: 'NIFTY 50', value: 22485.1, move: 0.84 },
  { name: 'BANK NIFTY', value: 48210.5, move: -0.31 },
  { name: 'SENSEX', value: 73995.8, move: 0.66 },
];

const topGainers = [
  { symbol: 'ADANIENT', price: 3262.1, change: 5.73 },
  { symbol: 'TATASTEEL', price: 179.2, change: 4.22 },
  { symbol: 'SBIN', price: 862.8, change: 3.65 },
  { symbol: 'HINDALCO', price: 662.4, change: 3.32 },
  { symbol: 'M&M', price: 2284.2, change: 2.91 },
];

const topLosers = [
  { symbol: 'HCLTECH', price: 1449.4, change: -2.43 },
  { symbol: 'ULTRACEMCO', price: 9252.7, change: -1.94 },
  { symbol: 'BAJAJFINSV', price: 1615.2, change: -1.72 },
  { symbol: 'NESTLEIND', price: 2472.9, change: -1.23 },
  { symbol: 'SUNPHARMA', price: 1610.8, change: -1.02 },
];

const latestNews = [
  { title: 'RBI policy cues keep banking stocks volatile', source: 'Market Desk', clicked: true },
  { title: 'IT earnings optimism lifts select large-caps', source: 'Earnings Wire', clicked: false },
  { title: 'Oil cools off; paint and airline names rally', source: 'Commodities Now', clicked: true },
  { title: 'Auto sales preview: SUVs continue to lead volumes', source: 'Auto Finance', clicked: false },
];

const blogs = [
  { title: 'How to build a morning stock-watch routine', tag: 'Beginner' },
  { title: 'PE Ratio vs PEG Ratio: what matters more?', tag: 'Analysis' },
  { title: 'Bank NIFTY options: risk management checklist', tag: 'Options' },
  { title: 'Global cues that move Indian indices quickly', tag: 'Macro' },
];

const sectionNews = {
  stocks: [
    'Reliance expands energy transition roadmap for FY27',
    'Infosys wins large AI transformation deal in Europe',
    'ICICI Bank loan growth outpaces private bank peers',
  ],
  financial: [
    'SEBI proposes tighter disclosure standards for small-caps',
    'GST collection growth signals resilient domestic demand',
    'Bond yields ease as inflation trend remains controlled',
  ],
  world: [
    'US Fed commentary keeps global risk assets range-bound',
    'Brent crude dips on inventory surprise',
    'Asian markets mixed as tech shares consolidate',
  ],
};

const mutualFunds = [
  { name: 'Nippon India Small Cap Fund', cagr3y: '29.4%' },
  { name: 'Quant Mid Cap Fund', cagr3y: '27.8%' },
  { name: 'SBI Contra Fund', cagr3y: '25.9%' },
  { name: 'Parag Parikh Flexi Cap', cagr3y: '24.6%' },
  { name: 'Motilal Oswal Midcap Fund', cagr3y: '24.1%' },
];

const stockNewsMap = {
  ADANIENT: ['Strong order book outlook for infra and energy businesses', 'Analysts raise target after margin expansion signs'],
  TATASTEEL: ['Global steel prices rebound helps realizations', 'Capex discipline improves debt metrics'],
  SBIN: ['Credit growth beats street estimates for quarter', 'NIM outlook stable despite deposit repricing'],
  HCLTECH: ['Large-deal TCV in focus ahead of earnings call', 'Brokerages trim estimates on cautious guidance'],
};

const stockFundamentalsMap = {
  ADANIENT: { PE: '42.1', ROE: '9.8%', DebtEquity: '1.6', EPS: '78.4' },
  TATASTEEL: { PE: '18.4', ROE: '15.3%', DebtEquity: '0.9', EPS: '9.7' },
  SBIN: { PE: '10.6', ROE: '17.7%', DebtEquity: '1.8', EPS: '81.2' },
  HCLTECH: { PE: '24.9', ROE: '22.5%', DebtEquity: '0.1', EPS: '58.6' },
};

const inr = (value) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

function renderMarketIndexes() {
  const parent = document.getElementById('marketIndexes');
  parent.innerHTML = marketIndexes
    .map(
      (idx) => `
      <div class="index-card">
        <strong>${idx.name}</strong>
        <span>${idx.value.toLocaleString('en-IN')}</span>
        <span class="${idx.move >= 0 ? 'up' : 'down'}">${idx.move >= 0 ? '+' : ''}${idx.move}% today</span>
      </div>
    `
    )
    .join('');
}

function stockItemTemplate(stock) {
  return `
    <div class="stock-item">
      <button class="stock-link" data-symbol="${stock.symbol}">${stock.symbol}</button>
      <div>
        <div>${inr(stock.price)}</div>
        <strong class="${stock.change >= 0 ? 'up' : 'down'}">${stock.change >= 0 ? '+' : ''}${stock.change}%</strong>
      </div>
    </div>
  `;
}

function renderLists() {
  document.getElementById('topGainers').innerHTML = topGainers.map(stockItemTemplate).join('');
  document.getElementById('topLosers').innerHTML = topLosers.map(stockItemTemplate).join('');
  document.getElementById('latestNews').innerHTML = latestNews
    .map(
      (item) => `
      <div class="news-item">
        <strong>${item.title}</strong>
        <div class="muted">${item.source}${item.clicked ? ' • Most clicked' : ''}</div>
      </div>
    `
    )
    .join('');

  document.getElementById('blogFeed').innerHTML = blogs
    .map(
      (item) => `
      <article class="blog-item">
        <strong>${item.title}</strong>
        <div class="muted">${item.tag}</div>
      </article>
    `
    )
    .join('');

  document.getElementById('mutualFunds').innerHTML = mutualFunds
    .map(
      (fund) => `
      <div class="fund-item">
        <strong>${fund.name}</strong>
        <span class="up">${fund.cagr3y}</span>
      </div>
    `
    )
    .join('');
}

function renderSection(tab) {
  const parent = document.getElementById('sectionContent');
  parent.innerHTML = sectionNews[tab]
    .map(
      (headline, index) => `
      <article class="news-item">
        <strong>${headline}</strong>
        <div class="muted">Slide ${index + 1} • Fundamental insight summary</div>
      </article>
    `
    )
    .join('');
}

function openStockModal(symbol) {
  const modal = document.getElementById('stockModal');
  document.getElementById('modalTitle').innerText = `${symbol} - Chart, News & Fundamentals`;

  const stockNews = stockNewsMap[symbol] || ['No new headlines found for this stock.'];
  document.getElementById('stockNews').innerHTML = stockNews
    .map((headline) => `<article class="news-item"><strong>${headline}</strong></article>`)
    .join('');

  const fundamentals = stockFundamentalsMap[symbol] || { PE: '-', ROE: '-', DebtEquity: '-', EPS: '-' };
  document.getElementById('stockFundamentals').innerHTML = Object.entries(fundamentals)
    .map(([metric, value]) => `<div class="fundamental-item"><span class="muted">${metric}</span><strong>${value}</strong></div>`)
    .join('');

  modal.showModal();
}

function setupInteractions() {
  document.querySelectorAll('.tab-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      renderSection(button.dataset.tab);
    });
  });

  document.body.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('stock-link')) {
      openStockModal(target.dataset.symbol);
    }
  });

  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('stockModal').close();
  });

  document.getElementById('sipForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const monthly = Number(document.getElementById('monthlyAmount').value);
    const annualRate = Number(document.getElementById('annualReturn').value);
    const years = Number(document.getElementById('years').value);

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    const corpus = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const invested = monthly * months;

    document.getElementById('sipResult').innerHTML = `
      Estimated Corpus: <span class="up">${inr(corpus)}</span><br>
      Total Invested: ${inr(invested)}<br>
      Wealth Gain: <span class="up">${inr(corpus - invested)}</span>
    `;
  });
}

function init() {
  renderMarketIndexes();
  renderLists();
  renderSection('stocks');
  setupInteractions();

  document.getElementById('sipForm').dispatchEvent(new Event('submit'));
}

init();
