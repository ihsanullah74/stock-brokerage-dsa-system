import { useState, useEffect } from 'react';
import { Trash2, Zap, Search, Cpu } from 'lucide-react';

interface Stock {
  id: string;
  company: string;
  symbol: string;
  price: number;
  created_at: string;
}

interface ViewStocksProps {
  stocks: Stock[];
  onDelete: (stockId: string) => void;
  apiBase: string;
}

export default function ViewStocks({ stocks, onDelete, apiBase }: ViewStocksProps) {
  const [displayStocks, setDisplayStocks] = useState(stocks);
  const [searchResults, setSearchResults] = useState<Stock | null>(null);
  const [companySearch, setCompanySearch] = useState('');
  const [symbolSearch, setSymbolSearch] = useState('');
  const [sortMethod, setSortMethod] = useState('original');
  const [searchMethod, setSearchMethod] = useState('company');

  useEffect(() => {
    setDisplayStocks(stocks);
    setSortMethod('original');
  }, [stocks]);

  const handleMergeSort = async () => {
    try {
      const response = await fetch(`${apiBase}/stocks/sorted`);
      const data = await response.json();
      setDisplayStocks(data.stocks);
      setSortMethod('mergesort');
    } catch (error) {
      console.error('Sort error:', error);
    }
  };

  const handleBSTSort = async () => {
    try {
      const response = await fetch(`${apiBase}/stocks/bst`);
      const data = await response.json();
      setDisplayStocks(data.stocks);
      setSortMethod('bst');
    } catch (error) {
      console.error('Sort error:', error);
    }
  };

  const handleSearchCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companySearch.trim()) return;

    try {
      const response = await fetch(`${apiBase}/stocks/search/company`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: companySearch })
      });
      const data = await response.json();
      setSearchResults(data.result);
      setSearchMethod('company');
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleSearchSymbol = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbolSearch.trim()) return;

    try {
      const response = await fetch(`${apiBase}/stocks/search/symbol`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: symbolSearch })
      });
      const data = await response.json();
      setSearchResults(data.result);
      setSearchMethod('symbol');
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const clearSearch = () => {
    setSearchResults(null);
    setCompanySearch('');
    setSymbolSearch('');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">View Stocks</h1>
        <p className="text-slate-400 text-lg">Manage stocks with sorting and search capabilities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Zap size={20} />
              Sorting Algorithms
            </h3>
            <div className="space-y-3">
              <button
                onClick={handleMergeSort}
                className={`w-full py-2 px-4 rounded-lg transition-all font-medium ${
                  sortMethod === 'mergesort'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-900/50 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Merge Sort O(n log n)
              </button>
              <button
                onClick={handleBSTSort}
                className={`w-full py-2 px-4 rounded-lg transition-all font-medium ${
                  sortMethod === 'bst'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-900/50 text-slate-300 hover:bg-slate-800'
                }`}
              >
                BST Inorder O(n)
              </button>
              <button
                onClick={() => {
                  setDisplayStocks(stocks);
                  setSortMethod('original');
                }}
                className={`w-full py-2 px-4 rounded-lg transition-all font-medium ${
                  sortMethod === 'original'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-900/50 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Original Order
              </button>
            </div>
          </div>

          <div className="mt-6 bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Cpu size={20} />
              Algorithm Info
            </h3>
            <p className="text-slate-400 text-sm">
              {sortMethod === 'mergesort' && 'Merge Sort divides data, sorts halves, then merges. Guaranteed O(n log n) performance.'}
              {sortMethod === 'bst' && 'BST Inorder traversal visits left subtree, node, then right. Produces sorted output in O(n).'}
              {sortMethod === 'original' && 'Showing stocks in original insertion order. Click a sorting method to reorganize.'}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Search size={20} />
              Binary Search (Company)
            </h3>
            <form onSubmit={handleSearchCompany} className="space-y-3">
              <input
                type="text"
                value={companySearch}
                onChange={(e) => setCompanySearch(e.target.value)}
                placeholder="Search by company name (Binary Search)"
                className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-blue-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-medium"
                >
                  Search O(log n)
                </button>
                {searchResults && <button
                  onClick={clearSearch}
                  className="flex-1 py-2 px-4 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all font-medium"
                >
                  Clear
                </button>}
              </div>
            </form>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Search size={20} />
              Linear Search (Symbol)
            </h3>
            <form onSubmit={handleSearchSymbol} className="space-y-3">
              <input
                type="text"
                value={symbolSearch}
                onChange={(e) => setSymbolSearch(e.target.value.toUpperCase())}
                placeholder="Search by symbol (Linear Search)"
                className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-blue-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 uppercase"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all font-medium"
                >
                  Search O(n)
                </button>
                {searchResults && <button
                  onClick={clearSearch}
                  className="flex-1 py-2 px-4 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all font-medium"
                >
                  Clear
                </button>}
              </div>
            </form>
          </div>
        </div>
      </div>

      {searchResults && (
        <div className="mb-8 bg-slate-800/40 backdrop-blur-md border border-green-500/30 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4">Search Result</h3>
          <div className="bg-slate-900/50 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-white font-semibold">{searchResults.company}</p>
              <p className="text-slate-400 text-sm">{searchResults.symbol} - ${searchResults.price.toFixed(2)}</p>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">Found</span>
          </div>
        </div>
      )}

      <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-blue-500/10">
          <h3 className="text-white font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            All Stocks ({displayStocks.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          {displayStocks.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-400">No stocks added yet. Go to Add Stock to create entries.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-900/50 border-b border-blue-500/10">
                <tr>
                  <th className="px-6 py-4 text-left text-slate-300 font-semibold">Company</th>
                  <th className="px-6 py-4 text-left text-slate-300 font-semibold">Symbol</th>
                  <th className="px-6 py-4 text-left text-slate-300 font-semibold">Price</th>
                  <th className="px-6 py-4 text-left text-slate-300 font-semibold">Added</th>
                  <th className="px-6 py-4 text-center text-slate-300 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayStocks.map((stock) => (
                  <tr key={stock.id} className="border-b border-blue-500/5 hover:bg-slate-900/30 transition-all">
                    <td className="px-6 py-4 text-white font-medium">{stock.company}</td>
                    <td className="px-6 py-4 text-slate-300 font-mono">{stock.symbol}</td>
                    <td className="px-6 py-4 text-white font-mono">${stock.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{new Date(stock.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => onDelete(stock.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
