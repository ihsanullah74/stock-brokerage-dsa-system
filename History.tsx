import { useEffect, useState } from 'react';
import { RotateCcw, Trash2, Plus, Clock } from 'lucide-react';

interface HistoryProps {
  onUndo: () => void;
  apiBase: string;
}

interface Action {
  action: string;
  timestamp: string;
  data?: any;
}

export default function History({ onUndo, apiBase }: HistoryProps) {
  const [history, setHistory] = useState<Action[]>([]);
  const [totalActions, setTotalActions] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBase}/stocks/history`);
      const data = await response.json();
      setHistory(data.history);
      setTotalActions(data.total_actions);
    } catch (error) {
      console.error('History error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUndo = async () => {
    onUndo();
    await new Promise(resolve => setTimeout(resolve, 500));
    fetchHistory();
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Action History & Undo</h1>
        <p className="text-slate-400 text-lg">Stack-based operation tracking with LIFO principle</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Clock size={28} className="text-blue-400" />
                Action Timeline
              </h2>
              <span className="text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                Stack: {totalActions} items
              </span>
            </div>

            {history.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-slate-400">No actions yet. Start adding stocks to build history.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {[...history].reverse().map((action, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-lg border border-blue-500/10 hover:border-blue-500/30 transition-all">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${
                      action.action === 'add'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {action.action === 'add' ? <Plus size={20} /> : <Trash2 size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-white font-semibold capitalize">
                          {action.action === 'add' ? 'Added Stock' : 'Deleted Stock'}
                        </p>
                        <span className="text-xs text-slate-500">{formatTime(action.timestamp)}</span>
                      </div>
                      <p className="text-slate-400 text-sm mt-1">
                        {action.data?.company || action.data?.symbol || 'Stock'}
                        {action.data?.symbol && ` (${action.data.symbol})`}
                        {action.data?.price && ` - $${action.data.price.toFixed(2)}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-8">
            <h3 className="text-white font-bold mb-4">How Stack (LIFO) Works</h3>
            <div className="space-y-4 text-slate-300 text-sm">
              <div>
                <p className="font-semibold text-white mb-2">Last-In-First-Out (LIFO)</p>
                <p>The most recent action is at the top of the stack and will be undone first.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Stack Operations</p>
                <p className="font-mono text-xs bg-slate-900/50 p-2 rounded">
                  • Push: Add action → O(1)<br/>
                  • Pop: Remove action → O(1)<br/>
                  • Peek: View last action → O(1)
                </p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Real-World Examples</p>
                <p>Browser back button, text editor undo, function call stack</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4">Undo Control</h3>
            <button
              onClick={handleUndo}
              disabled={totalActions === 0}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                totalActions === 0
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
              }`}
            >
              <RotateCcw size={20} />
              {totalActions === 0 ? 'Nothing to Undo' : 'Undo Last Action'}
            </button>

            <div className="mt-6 space-y-3">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-slate-400 text-xs mb-2">Total Actions</p>
                <p className="text-white text-2xl font-bold">{totalActions}</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-slate-400 text-xs mb-2">Last Action</p>
                <p className="text-white font-mono text-sm">
                  {history.length > 0 ? history[history.length - 1].action.toUpperCase() : 'None'}
                </p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-slate-400 text-xs mb-2">Stack Status</p>
                <p className="text-white text-sm">
                  {totalActions === 0 ? 'Empty' : `${totalActions} item${totalActions !== 1 ? 's' : ''}`}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4">Stack Visualization</h3>
            <div className="space-y-1">
              {history.length === 0 ? (
                <div className="text-center py-6">
                  <div className="border-2 border-dashed border-slate-600 rounded-lg py-4 text-slate-500 text-sm">
                    Empty Stack
                  </div>
                </div>
              ) : (
                <>
                  {[...history].reverse().slice(0, 3).map((action, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border text-center text-sm font-mono transition-all ${
                        idx === 0
                          ? 'bg-gradient-to-r from-blue-500/30 to-blue-600/30 border-blue-500/50 text-white'
                          : 'bg-slate-900/50 border-slate-700 text-slate-400'
                      }`}
                    >
                      {action.action.toUpperCase()}
                      {idx === 0 && <span className="ml-2 text-xs">← Top (Next to Undo)</span>}
                    </div>
                  ))}
                  {history.length > 3 && (
                    <div className="text-center text-xs text-slate-500 py-2">+{history.length - 3} more</div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4">Key Characteristics</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold mt-0.5">•</span>
                <span>LIFO order preserved</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold mt-0.5">•</span>
                <span>O(1) time complexity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold mt-0.5">•</span>
                <span>Linear space usage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold mt-0.5">•</span>
                <span>One element at top</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
