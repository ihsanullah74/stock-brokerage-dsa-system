import { useEffect, useRef, useState } from 'react';
import { TrendingUp, BarChart3, Target, Zap } from 'lucide-react';
import Chart from 'chart.js/auto';

interface Stock {
  id: string;
  company: string;
  symbol: string;
  price: number;
  created_at: string;
}

interface AnalysisProps {
  stocks: Stock[];
  apiBase: string;
}

export default function Analysis({ stocks, apiBase }: AnalysisProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnalysis();
  }, [stocks]);

  const fetchAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBase}/stocks/analysis`);
      const data = await response.json();
      setAnalysis(data);

      if (data.all_stocks && data.all_stocks.length > 0) {
        renderChart(data.all_stocks);
      }
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderChart = (chartStocks: Stock[]) => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const sortedStocks = [...chartStocks].sort((a, b) => a.price - b.price);
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sortedStocks.map(s => s.symbol),
        datasets: [
          {
            label: 'Stock Price ($)',
            data: sortedStocks.map(s => s.price),
            backgroundColor: sortedStocks.map((_, i) => {
              const colors = [
                'rgba(59, 130, 246, 0.8)',
                'rgba(168, 85, 247, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(249, 115, 22, 0.8)',
                'rgba(236, 72, 153, 0.8)',
              ];
              return colors[i % colors.length];
            }),
            borderColor: sortedStocks.map((_, i) => {
              const colors = [
                'rgb(59, 130, 246)',
                'rgb(168, 85, 247)',
                'rgb(34, 197, 94)',
                'rgb(249, 115, 22)',
                'rgb(236, 72, 153)',
              ];
              return colors[i % colors.length];
            }),
            borderWidth: 2,
            borderRadius: 8,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#e2e8f0',
              font: { size: 12 }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#cbd5e1' },
            grid: { color: 'rgba(59, 130, 246, 0.1)' }
          },
          x: {
            ticks: { color: '#cbd5e1' },
            grid: { color: 'rgba(59, 130, 246, 0.1)' }
          }
        }
      }
    });
  };

  if (loading) {
    return <div className="p-8 text-white">Loading analysis...</div>;
  }

  if (!analysis || analysis.total === 0) {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold text-white mb-2">Analysis</h1>
        <p className="text-slate-400 mb-8">No stocks data yet. Add stocks to see analysis.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Stock Analysis</h1>
        <p className="text-slate-400 text-lg">Real-time statistical analysis and visualization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm font-semibold">Total Stocks</p>
            <BarChart3 className="text-blue-400" size={20} />
          </div>
          <p className="text-white text-3xl font-bold">{analysis.total}</p>
          <p className="text-slate-500 text-xs mt-2">Entries in portfolio</p>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm font-semibold">Average Price</p>
            <TrendingUp className="text-purple-400" size={20} />
          </div>
          <p className="text-white text-3xl font-bold">${analysis.average}</p>
          <p className="text-slate-500 text-xs mt-2">Mean stock value</p>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm font-semibold">Min Price</p>
            <Target className="text-green-400" size={20} />
          </div>
          <p className="text-white text-3xl font-bold">${analysis.min.toFixed(2)}</p>
          <p className="text-slate-500 text-xs mt-2">Lowest value</p>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm font-semibold">Max Price</p>
            <Zap className="text-orange-400" size={20} />
          </div>
          <p className="text-white text-3xl font-bold">${analysis.max.toFixed(2)}</p>
          <p className="text-slate-500 text-xs mt-2">Highest value</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-8">
          <h2 className="text-white text-2xl font-bold mb-6">Price Distribution</h2>
          <canvas ref={chartRef}></canvas>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4">Statistical Summary</h3>
            <div className="space-y-3">
              <div>
                <p className="text-slate-400 text-sm">Total Value</p>
                <p className="text-white text-xl font-bold">${analysis.sum.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Price Variance</p>
                <p className="text-white text-xl font-bold">{analysis.variance}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Range</p>
                <p className="text-white text-xl font-bold">${(analysis.max - analysis.min).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4">Top 5 Companies</h3>
            <div className="space-y-2">
              {analysis.top_companies.map((stock: Stock, idx: number) => (
                <div key={stock.id} className="flex items-center justify-between py-2 border-b border-blue-500/10 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-blue-400">#{idx + 1}</span>
                    <div>
                      <p className="text-white font-medium text-sm">{stock.symbol}</p>
                      <p className="text-slate-500 text-xs">{stock.company}</p>
                    </div>
                  </div>
                  <p className="text-white font-bold">${stock.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-8">
        <h2 className="text-white text-2xl font-bold mb-6">Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-2">Highest Price</p>
            <p className="text-white font-bold">${analysis.max.toFixed(2)} - {analysis.top_companies[0]?.symbol}</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-2">Lowest Price</p>
            <p className="text-white font-bold">${analysis.min.toFixed(2)}</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-2">Price Spread</p>
            <p className="text-white font-bold">${(analysis.max - analysis.min).toFixed(2)}</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-2">Diversity</p>
            <p className="text-white font-bold">{analysis.total} companies tracked</p>
          </div>
        </div>
      </div>
    </div>
  );
}
