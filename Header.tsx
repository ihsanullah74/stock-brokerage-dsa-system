import { Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-slate-900/50 backdrop-blur-md border-b border-blue-500/10 px-8 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-white text-2xl font-bold">Stock Analysis</h2>
        <p className="text-slate-400 text-sm">Real-time Data Structures & Algorithms Demo</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 bg-slate-800/30 rounded-lg px-4 py-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          </div>
          <span className="text-slate-300 text-sm">API Connected</span>
        </div>

        <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all">
          <User size={20} />
        </button>
      </div>
    </header>
  );
}
