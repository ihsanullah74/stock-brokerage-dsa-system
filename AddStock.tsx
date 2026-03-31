import { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';

interface AddStockProps {
  onAddStock: (company: string, symbol: string, price: number) => void;
  loading: boolean;
}

export default function AddStock({ onAddStock, loading }: AddStockProps) {
  const [company, setCompany] = useState('');
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!company.trim()) newErrors.company = 'Company name is required';
    if (!symbol.trim()) newErrors.symbol = 'Stock symbol is required';
    if (!price) newErrors.price = 'Price is required';
    else if (isNaN(Number(price)) || Number(price) < 0) newErrors.price = 'Enter a valid positive price';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddStock(company, symbol, Number(price));
      setCompany('');
      setSymbol('');
      setPrice('');
      setErrors({});
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Add New Stock</h1>
        <p className="text-slate-400 text-lg">Create a new stock entry with company details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">Company Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g., Apple Inc."
                  className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                    errors.company ? 'border-red-500' : 'border-blue-500/20'
                  } text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all`}
                />
                {errors.company && <p className="text-red-400 text-sm mt-2">{errors.company}</p>}
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Stock Symbol</label>
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  placeholder="e.g., AAPL"
                  maxLength={5}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                    errors.symbol ? 'border-red-500' : 'border-blue-500/20'
                  } text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all uppercase`}
                />
                {errors.symbol && <p className="text-red-400 text-sm mt-2">{errors.symbol}</p>}
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g., 150.25"
                  className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                    errors.price ? 'border-red-500' : 'border-blue-500/20'
                  } text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all`}
                />
                {errors.price && <p className="text-red-400 text-sm mt-2">{errors.price}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                {loading ? 'Adding Stock...' : 'Add Stock'}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <AlertCircle size={20} />
              Quick Tips
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>• Use real company names for clarity</li>
              <li>• Symbols are auto-converted to uppercase</li>
              <li>• Prices support up to 2 decimals</li>
              <li>• Data is stored in BST for fast retrieval</li>
              <li>• Each stock gets a unique ID</li>
            </ul>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4">Data Structure: BST</h3>
            <p className="text-slate-300 text-sm mb-4">Your stock is automatically inserted into a Binary Search Tree for efficient storage and retrieval.</p>
            <div className="bg-slate-900/50 rounded-lg p-3 font-mono text-xs text-blue-300">
              <pre>{`Insert O(log n)
Search O(log n)
Traverse O(n)`}</pre>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4">Example Stocks</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <p>Apple (AAPL) - $150.25</p>
              <p>Google (GOOGL) - $140.50</p>
              <p>Microsoft (MSFT) - $380.00</p>
              <p>Tesla (TSLA) - $240.75</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
