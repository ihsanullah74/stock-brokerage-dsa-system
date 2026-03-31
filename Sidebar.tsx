import { BarChart3, Plus, Eye, TrendingUp, History, Info, Home } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'features', label: 'Features', icon: Info },
    { id: 'addstock', label: 'Add Stock', icon: Plus },
    { id: 'viewstocks', label: 'View Stocks', icon: Eye },
    { id: 'analysis', label: 'Analysis', icon: TrendingUp },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-slate-950 to-slate-900 border-r border-blue-500/20 flex flex-col h-screen">
      <div className="p-6 border-b border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <BarChart3 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">StockXs</h1>
            <p className="text-blue-300 text-xs">DSA Analysis</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-blue-500/20">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <p className="text-slate-400 text-sm mb-2">DSA Algorithms</p>
          <div className="space-y-1 text-xs text-blue-300">
            <p>• Binary Search Tree</p>
            <p>• Merge Sort (O(n log n))</p>
            <p>• Binary Search</p>
            <p>• Stack (LIFO)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
