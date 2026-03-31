import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './views/Home';
import Features from './views/Features';
import AddStock from './views/AddStock';
import ViewStocks from './views/ViewStocks';
import Analysis from './views/Analysis';
import History from './views/History';
import './index.css';

function App() {
  const [activeView, setActiveView] = useState('home');
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    fetchStocks();
  }, [refreshKey]);

  const fetchStocks = async () => {
    try {
      const response = await fetch(`${API_BASE}/stocks`);
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const refreshData = () => {
    setRefreshKey(prev => prev + 1);
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddStock = async (company: string, symbol: string, price: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/stocks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, symbol, price })
      });

      if (response.ok) {
        showMessage('success', `Stock ${symbol} added successfully!`);
        refreshData();
        setActiveView('viewstocks');
      } else {
        showMessage('error', 'Failed to add stock');
      }
    } catch (error) {
      showMessage('error', 'Connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStock = async (stockId: string) => {
    try {
      const response = await fetch(`${API_BASE}/stocks/${stockId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showMessage('success', 'Stock deleted successfully!');
        refreshData();
      }
    } catch (error) {
      showMessage('error', 'Failed to delete stock');
    }
  };

  const handleUndo = async () => {
    try {
      const response = await fetch(`${API_BASE}/stocks/undo`, {
        method: 'POST'
      });

      if (response.ok) {
        showMessage('success', 'Action undone!');
        refreshData();
      }
    } catch (error) {
      showMessage('error', 'Failed to undo');
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          {message && (
            <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-medium z-50 ${
              message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}>
              {message.text}
            </div>
          )}

          {activeView === 'home' && <Home stocks={stocks} />}
          {activeView === 'features' && <Features />}
          {activeView === 'addstock' && <AddStock onAddStock={handleAddStock} loading={loading} />}
          {activeView === 'viewstocks' && <ViewStocks stocks={stocks} onDelete={handleDeleteStock} apiBase={API_BASE} />}
          {activeView === 'analysis' && <Analysis stocks={stocks} apiBase={API_BASE} />}
          {activeView === 'history' && <History onUndo={handleUndo} apiBase={API_BASE} />}
        </main>
      </div>
    </div>
  );
}

export default App;
