import { TrendingUp, Database, Zap, Activity } from 'lucide-react';

interface Stock {
  id: string;
  company: string;
  symbol: string;
  price: number;
  created_at: string;
}

interface HomeProps {
  stocks: Stock[];
}

export default function Home({ stocks }: HomeProps) {
  const stats = [
    {
      label: 'Total Stocks',
      value: stocks.length,
      icon: Database,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Average Price',
      value: stocks.length > 0 ? `$${(stocks.reduce((a, b) => a + b.price, 0) / stocks.length).toFixed(2)}` : '$0.00',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Highest Price',
      value: stocks.length > 0 ? `$${Math.max(...stocks.map(s => s.price)).toFixed(2)}` : '$0.00',
      icon: Zap,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Active Algorithms',
      value: '4',
      icon: Activity,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome to StockXs</h1>
        <p className="text-slate-400 text-lg">Advanced Stock Analysis with Data Structures & Algorithms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-6 hover:border-blue-500/30 transition-all">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="text-white" size={24} />
              </div>
              <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
              <p className="text-white text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Algorithms</h2>
          <div className="space-y-4">
            <div className="p-4 bg-slate-900/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all">
              <h3 className="text-white font-semibold mb-2">Binary Search Tree (BST)</h3>
              <p className="text-slate-400 text-sm">O(log n) insertion and search. Stores stocks sorted by price.</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all">
              <h3 className="text-white font-semibold mb-2">Merge Sort</h3>
              <p className="text-slate-400 text-sm">O(n log n) guaranteed performance. Efficient stock sorting.</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all">
              <h3 className="text-white font-semibold mb-2">Binary Search</h3>
              <p className="text-slate-400 text-sm">O(log n) lookup. Find companies instantly on sorted data.</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all">
              <h3 className="text-white font-semibold mb-2">Stack (LIFO)</h3>
              <p className="text-slate-400 text-sm">O(1) operations. Undo actions with Last-In-First-Out principle.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Start</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold text-sm mt-0.5 flex-shrink-0">1</div>
              <div>
                <p className="text-white font-medium">Add Stocks</p>
                <p className="text-slate-400 text-sm">Navigate to "Add Stock" and create entries with company name, symbol, and price.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold text-sm mt-0.5 flex-shrink-0">2</div>
              <div>
                <p className="text-white font-medium">Sort & Search</p>
                <p className="text-slate-400 text-sm">View stocks and test different sorting and search algorithms.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400 font-bold text-sm mt-0.5 flex-shrink-0">3</div>
              <div>
                <p className="text-white font-medium">Analyze Data</p>
                <p className="text-slate-400 text-sm">Check the Analysis page for charts and statistical insights.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 font-bold text-sm mt-0.5 flex-shrink-0">4</div>
              <div>
                <p className="text-white font-medium">Test Undo</p>
                <p className="text-slate-400 text-sm">Use Stack-based undo to revert your last actions instantly.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg">
            <p className="text-white font-semibold mb-2">System Status</p>
            <div className="space-y-2 text-sm text-slate-300">
              <p>✓ Backend API: Connected</p>
              <p>✓ All Algorithms: Active</p>
              <p>✓ Database: In-Memory</p>
              <p>✓ Status: Production Ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
