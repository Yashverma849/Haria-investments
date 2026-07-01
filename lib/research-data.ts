export type BlogCategory = "technical-analysis" | "market-reports" | "trading-signals";

export interface ResearchArticle {
  id: string;
  title: string;
  category: BlogCategory;
  publishDate: string;
  author: string;
  readTime: string;
  summary: string;
  content: string; // Detailed HTML contents
  image: string;
  tags: string[];
}

export const categoryLabels: Record<BlogCategory, string> = {
  "technical-analysis": "Technical Analysis",
  "market-reports": "Market Reports",
  "trading-signals": "Trading Signals",
};

export const researchArticles: ResearchArticle[] = [
  {
    id: "gold-cup-handle-breakout",
    title: "Gold's Multi-Year Cup & Handle Breakout Confirmed",
    category: "technical-analysis",
    publishDate: "July 1, 2026",
    author: "Haria Technical Research Desk",
    readTime: "6 min read",
    summary: "An in-depth technical examination of gold's price actions, charting patterns, key support/resistance zones, and momentum indicators pointing to a long-term bullish trend.",
    image: "https://images.unsplash.com/photo-1610374792793-f016b77ca51a?w=800&q=80",
    tags: ["Gold", "Technical Analysis", "Breakout", "Chart Patterns"],
    content: `
      <h2>Executive Summary</h2>
      <p>Gold has successfully resolved a massive multi-year consolidation pattern, confirming a classic 'Cup and Handle' breakout on the monthly scale. This structural development marks the beginning of a primary bullish expansion cycle, with key technical objectives pointing to significantly higher levels over the 12-to-24-month horizon.</p>

      <h3>1. The Structural Macro Pattern</h3>
      <p>The 'Cup' segment of the pattern spans from the 2020 all-time highs of $2,075 down to the cyclical lows of $1,615 established in late 2022. The subsequent recovery back to $2,075 formed the right-side lip of the cup. Throughout 2024 and 2025, gold formed a shallow, downward-sloping consolidation channel—the 'Handle'—retaining its bullish posture above the crucial $1,900 support level.</p>

      <h3>2. Breakout and Volume Validation</h3>
      <p>The breakout above the major resistance ceiling at $2,075-2,100 was accompanied by a noticeable expansion in volume on major futures exchanges (COMEX) and massive inflows into physical gold ETFs. The subsequent retest of this breakout zone held successfully as support, fulfilling a key requirement of structural technical breakouts.</p>

      <div class="my-6 p-4 rounded-lg bg-white/[0.04] border border-white/10">
        <h4 class="font-bold text-white mb-2">Key Technical Levels:</h4>
        <ul class="list-disc list-inside space-y-1 text-white/80">
          <li><strong>Immediate Resistance:</strong> $2,450 / $2,500</li>
          <li><strong>Major Breakout Support:</strong> $2,100 (Strong Floor)</li>
          <li><strong>Fibonacci Extension Targets:</strong> $2,680 (1.618%) and $3,150 (2.618%)</li>
        </ul>
      </div>

      <h3>3. Momentum Indicators and Moving Averages</h3>
      <p>The Monthly Relative Strength Index (RSI) has entered the bullish expansion zone (60-70) without showing signs of blow-off exhaustion. Simultaneously, the 10-month and 20-month Exponential Moving Averages (EMA) have formed a wide bullish fan, illustrating accelerating trend strength. On the weekly chart, the MACD indicator remains firmly in positive territory, with the signal lines crossing upward, signaling strong buying pressure.</p>

      <h3>4. Strategic Tactical Outlook</h3>
      <p>For long-term wealth builders and tactical asset allocators, pullback dips toward the breakout level ($2,100-$2,200) present high-probability accumulation opportunities. Stop-loss risk invalidation for the macro setup is placed below the handle swing low of $1,880 on a monthly closing basis.</p>
    `,
  },
  {
    id: "precious-metals-supply-demand",
    title: "Q2 2026 Global Precious Metals Supply-Demand Dynamics",
    category: "market-reports",
    publishDate: "June 25, 2026",
    author: "Haria Macro Strategy Group",
    readTime: "8 min read",
    summary: "An institutional-grade breakdown of mine outputs, recycling supplies, central bank net purchases, and retail ETF flows shaping commodity markets.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
    tags: ["Gold", "Silver", "Macro Economics", "Supply & Demand"],
    content: `
      <h2>Market Overview</h2>
      <p>The second quarter of 2026 has witnessed unprecedented shifts in the global supply and demand metrics for precious metals. Ongoing geopolitical tensions and central bank hedging have driven physical demand to record highs, despite minor supply contractions from major mining jurisdictions.</p>

      <h3>1. Demand-Side Drivers: Central Banks Lead the Charge</h3>
      <p>Official sector buying remains the primary pillar of support for gold. Central banks added a net 280 metric tonnes to their reserves in Q2 2026, representing a 14% year-on-year increase. Emerging market central banks continue to diversify away from fiat currency reserves, seeking sanctuary in physical bullion assets.</p>

      <h3>2. Industrial and Retail Demand</h3>
      <p>Silver's industrial demand continues to outpace expectations, fueled by the accelerating solar PV manufacturing sector and automotive electrification. Photovoltaic silver demand rose by 22% this quarter alone, widening the structural market deficit for the fifth consecutive year. Retail bar and coin demand saw moderate growth in Asian markets, offset by slight liquidations in European retail channels.</p>

      <div class="my-6 overflow-x-auto">
        <table class="w-full text-left text-sm border-collapse">
          <thead>
            <tr class="border-b border-white/20 bg-white/[0.04]">
              <th class="p-3 font-semibold text-white">Sector (Metric Tonnes)</th>
              <th class="p-3 font-semibold text-white">Q2 2025</th>
              <th class="p-3 font-semibold text-white">Q2 2026</th>
              <th class="p-3 font-semibold text-white">YoY Change</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-white/10">
              <td class="p-3 text-white/90">Central Bank Purchases</td>
              <td class="p-3 text-white/80">245 t</td>
              <td class="p-3 text-white/80">280 t</td>
              <td class="p-3 text-emerald-400 font-semibold">+14.3%</td>
            </tr>
            <tr class="border-b border-white/10">
              <td class="p-3 text-white/90">Industrial Use (Silver)</td>
              <td class="p-3 text-white/80">14,200 t</td>
              <td class="p-3 text-white/80">17,350 t</td>
              <td class="p-3 text-emerald-400 font-semibold">+22.1%</td>
            </tr>
            <tr class="border-b border-white/10">
              <td class="p-3 text-white/90">Jewelry Fabrication</td>
              <td class="p-3 text-white/80">520 t</td>
              <td class="p-3 text-white/80">490 t</td>
              <td class="p-3 text-rose-400 font-semibold">-5.7%</td>
            </tr>
            <tr class="border-b border-white/10">
              <td class="p-3 text-white/90">Total Mine Supply</td>
              <td class="p-3 text-white/80">860 t</td>
              <td class="p-3 text-white/80">842 t</td>
              <td class="p-3 text-rose-400 font-semibold">-2.1%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>3. Supply-Side Dynamics: Mining Bottle-Necks</h3>
      <p>Global gold mine production declined by 2.1% due to strict environmental audits in South America and operational suspensions in South African deep-level mines. Recycling supplies increased slightly as high spot prices tempted retail sellers, but this offset only a fraction of the primary mine supply contraction.</p>

      <h3>4. Outlook and Strategic Asset Allocation</h3>
      <p>With industrial deficits mounting in silver and central banks showing price-insensitive demand for gold, the macro fundamentals strongly support a 'buy-and-hold' physical allocation. The structural supply deficit in silver suggests higher beta price appreciation potential relative to gold as physical stock levels decline.</p>
    `,
  },
  {
    id: "crude-oil-reversal-signal",
    title: "Crude Oil Futures: Short-Term Reversal Signal Triggered",
    category: "trading-signals",
    publishDate: "June 20, 2026",
    author: "Haria Algorithmic Trading Desk",
    readTime: "4 min read",
    summary: "Our proprietary algorithm and momentum indicators have triggered a short-term sell signal on crude oil futures. Here are the target levels and stop-loss placements.",
    image: "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?w=800&q=80",
    tags: ["Crude Oil", "Futures Trading", "Trading Signal", "Technical Analysis"],
    content: `
      <h2>Signal Alert: Bearish Reversal</h2>
      <p>Our proprietary short-term momentum and volume spread algorithm (Haria Momentum Tracker V4) has triggered a bearish reversal sell signal on August Crude Oil futures (CLQ26) on the daily time frame.</p>

      <h3>1. Signal Criteria & Technical Setup</h3>
      <p>The signal was generated upon the completion of the following technical triggers:</p>
      <ul>
        <li><strong>Bearish Engulfing Pattern:</strong> Daily price action engulfed the previous three sessions' range on high volume.</li>
        <li><strong>RSI Bearish Divergence:</strong> Price printed higher highs at $84.50 while the 14-day RSI printed lower highs at 64.2 (declining momentum).</li>
        <li><strong>Moving Average Rejection:</strong> Price failed to sustain trade above the declining 200-day Simple Moving Average (SMA), closing below the 20-day EMA.</li>
      </ul>

      <div class="my-6 p-4 rounded-lg bg-rose-950/20 border border-rose-900/40">
        <h4 class="font-bold text-rose-400 mb-2">Trade Execution Parameters:</h4>
        <ul class="list-disc list-inside space-y-1 text-white/80">
          <li><strong>Position / Action:</strong> Short Sell / Sell Limit</li>
          <li><strong>Entry Range:</strong> $82.50 – $83.20</li>
          <li><strong>Stop-Loss:</strong> $84.90 (Daily Close invalidation level)</li>
          <li><strong>Target Target 1:</strong> $78.00 (Major support)</li>
          <li><strong>Target Target 2:</strong> $75.50 (Key swing low)</li>
        </ul>
      </div>

      <h3>2. Risk Management Protocol</h3>
      <p>Position sizing must be adjusted strictly according to personal risk parameters, keeping individual exposure under 1.5% of total trading equity. If the daily close is recorded above $84.90, the trade must be exited immediately to protect capital from further upside momentum. We recommend trailing the stop-loss to break-even once Target 1 is reached.</p>
    `,
  },
  {
    id: "silver-weekly-rsi-divergence",
    title: "Silver Near Key Support: Bullish Divergence on Weekly Chart",
    category: "technical-analysis",
    publishDate: "June 15, 2026",
    author: "Haria Technical Research Desk",
    readTime: "5 min read",
    summary: "Silver prices are hovering around the critical $28 zone. We analyze the daily and weekly charts, showing strong bullish divergence on the RSI and MACD indicators.",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&q=80",
    tags: ["Silver", "Technical Analysis", "RSI", "Support Levels"],
    content: `
      <h2>Technical Outlook: Bullish Consolidation</h2>
      <p>Silver has retraced over 15% from its recent local highs, creating a high-probability tactical entry point as it enters a dense horizontal support zone aligned with long-term moving averages.</p>

      <h3>1. The $28.00 Base Support</h3>
      <p>The $28.00 horizontal zone is a critical pivot point in silver's multi-year structural chart. Having served as stubborn resistance throughout 2021-2023, it has now flipped to become a major structural demand zone. The 50-week Simple Moving Average (SMA) is currently rising to meet this level at $27.85, reinforcing its strength.</p>

      <h3>2. Weekly RSI Divergence</h3>
      <p>While the price action printed a lower low in mid-June, the weekly Relative Strength Index (RSI) printed a significantly higher low, remaining above the oversold 30 threshold. This divergence indicates that selling pressure is exhausting rapidly, paving the way for a sharp technical rebound.</p>

      <div class="my-6 p-4 rounded-lg bg-white/[0.04] border border-white/10">
        <h4 class="font-bold text-white mb-2">Levels to Monitor:</h4>
        <ul class="list-disc list-inside space-y-1 text-white/80">
          <li><strong>Strong Support Zone:</strong> $27.80 - $28.20</li>
          <li><strong>Initial Target:</strong> $31.50 (Swing high)</li>
          <li><strong>Secondary Target:</strong> $34.00 (Cycle high)</li>
        </ul>
      </div>

      <h3>3. Macro Catalysts</h3>
      <p>This technical setup is supported by robust fundamental indicators, including growing silver paste demand in the global solar panel industry and supply disruptions from primary mining regions. From a risk-to-reward perspective, long positions accumulated in this support zone offer clean invalidation points just below $26.80.</p>
    `,
  },
  {
    id: "inflation-hedge-comparative-study",
    title: "Inflation Hedges: Comparative Study of Gold vs. Bitcoin in 2026",
    category: "market-reports",
    publishDate: "June 10, 2026",
    author: "Haria Research Strategy Group",
    readTime: "9 min read",
    summary: "A data-driven report comparing the performance, volatility, and correlation of gold and digital assets against core inflation metrics during recent economic shifts.",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
    tags: ["Inflation", "Gold", "Bitcoin", "Portfolio Allocation"],
    content: `
      <h2>Introduction</h2>
      <p>As central banks navigate high interest rates and sticky structural inflation, investors are seeking clarity on the relative performance of traditional and digital inflation hedges. This study analyzes monthly asset returns, drawdown profiles, and rolling correlation indices to provide an objective framework for asset allocation.</p>

      <h3>1. Historical Volatility Profiles</h3>
      <p>Gold continues to display its hallmark stability, with its 30-day annualized volatility hovering between 11% and 14% over the past 18 months. In contrast, Bitcoin's annualized volatility remains elevated at 48% to 55%. For conservative wealth protection, gold's low-volatility profile remains unmatched, while Bitcoin serves as a high-beta satellite asset.</p>

      <h3>2. Correlation with Core CPI and Real Yields</h3>
      <p>Gold maintains a strong negative correlation (-0.62) with 10-year US Treasury real yields, rallying when real yields decline. Bitcoin displays a weaker correlation with real yields, instead showing a higher positive correlation with global liquidity indices and risk-on equity markets (NASDAQ index).</p>

      <div class="my-6 p-4 rounded-lg bg-white/[0.04] border border-white/10">
        <h4 class="font-bold text-white mb-2">Key Asset Comparison Matrix:</h4>
        <table class="w-full text-left text-sm mt-2">
          <thead>
            <tr class="border-b border-white/20">
              <th class="pb-2 font-semibold text-white">Metric</th>
              <th class="pb-2 font-semibold text-white">Physical Gold</th>
              <th class="pb-2 font-semibold text-white">Bitcoin (Digital Gold)</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-white/10">
              <td class="py-2 text-white/80">Annualized Volatility</td>
              <td class="py-2 text-white/80">12% - 15% (Low)</td>
              <td class="py-2 text-white/80">45% - 60% (High)</td>
            </tr>
            <tr class="border-b border-white/10">
              <td class="py-2 text-white/80">Liquidity Access</td>
              <td class="py-2 text-white/80">T+1 (Physical/ETF)</td>
              <td class="py-2 text-white/80">Instant 24/7 (Exchange)</td>
            </tr>
            <tr class="border-b border-white/10">
              <td class="py-2 text-white/80">Max Drawdown (3y)</td>
              <td class="py-2 text-white/80">-14.2%</td>
              <td class="py-2 text-white/80">-68.5%</td>
            </tr>
            <tr class="border-b border-white/10">
              <td class="py-2 text-white/80">Regulatory Clarity</td>
              <td class="py-2 text-white/80">Established (Sovereign)</td>
              <td class="py-2 text-white/80">Evolving (Spot ETFs)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>3. Portfolio Allocation Recommendations</h3>
      <p>Our quantitative modeling suggests that a diversified hedge portfolio should rely on gold as the core foundation (5% to 8% allocation) to stabilize returns, with Bitcoin limited to a satellite tactical slice (1% to 2%) for growth upside, adjusted to individual risk tolerance.</p>
    `,
  },
  {
    id: "copper-demand-rebound-buy",
    title: "Copper Rebound Signal: Industrial Demand Picks Up",
    category: "trading-signals",
    publishDate: "June 05, 2026",
    author: "Haria Algorithmic Trading Desk",
    readTime: "5 min read",
    summary: "A buy signal has been identified for spot copper as inventory levels at major warehouses decline and manufacturing PMI numbers cross the expansion threshold.",
    image: "https://images.unsplash.com/photo-1558486012-817176f84c6d?w=800&q=80",
    tags: ["Copper", "Industrial Metals", "Trading Signal", "PMI Data"],
    content: `
      <h2>Signal Alert: Bullish Momentum Triggered</h2>
      <p>Spot Copper (HG1!) has triggered a bullish breakout buy signal on our daily trend-following system following a successful break above the key consolidation range of $4.40 per pound.</p>

      <h3>1. Trend Breakout and Warehouse Data</h3>
      <p>The signal is backed by strong physical and macroeconomic indicators:</p>
      <ul>
        <li><strong>LME Inventory Declines:</strong> London Metal Exchange copper stocks dropped by 18,500 tonnes this week, indicating tight physical supply.</li>
        <li><strong>PMI Expansion:</strong> Major manufacturing PMI indices crossed 51.5, signaling industrial growth and rising demand for base metals.</li>
        <li><strong>Bullish Flag Pattern:</strong> A clean consolidation flag broke to the upside on high volume, confirming trend continuation.</li>
      </ul>

      <div class="my-6 p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
        <h4 class="font-bold text-emerald-400 mb-2">Trade Execution Parameters:</h4>
        <ul class="list-disc list-inside space-y-1 text-white/80">
          <li><strong>Position / Action:</strong> Go Long / Buy Limit</li>
          <li><strong>Entry Range:</strong> $4.42 – $4.48</li>
          <li><strong>Stop-Loss:</strong> $4.29 (Below flag support)</li>
          <li><strong>Target Target 1:</strong> $4.75 (Previous resistance)</li>
          <li><strong>Target Target 2:</strong> $4.98 (Psychological high)</li>
        </ul>
      </div>

      <h3>2. Tactical Execution</h3>
      <p>Ensure stop-loss orders are configured actively to manage downside risk. A clean daily close below $4.29 invalidates this momentum setup, indicating a false breakout. Trail stops below the rising 10-day EMA once the position is in profit.</p>
    `,
  },
];
