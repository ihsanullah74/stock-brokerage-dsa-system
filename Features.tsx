import { GitBranch, Zap, Search, RotateCcw } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: 'Binary Search Tree (BST)',
      icon: GitBranch,
      complexity: 'O(log n) avg, O(n) worst',
      description: 'Efficiently stores and retrieves stock data with automatic price-based sorting.',
      operations: [
        { name: 'Insert', time: 'O(log n)' },
        { name: 'Search', time: 'O(log n)' },
        { name: 'Inorder Traversal', time: 'O(n)' }
      ],
      benefits: [
        'Automatic sorting by price',
        'Fast insertion and lookup',
        'Balanced structure reduces operations'
      ]
    },
    {
      title: 'Merge Sort',
      icon: Zap,
      complexity: 'O(n log n) guaranteed',
      description: 'Divides and conquers - consistently fast sorting regardless of data arrangement.',
      operations: [
        { name: 'Divide', time: 'O(log n)' },
        { name: 'Conquer', time: 'O(log n)' },
        { name: 'Merge', time: 'O(n)' }
      ],
      benefits: [
        'Guaranteed O(n log n) performance',
        'Stable sorting algorithm',
        'Excellent for large datasets'
      ]
    },
    {
      title: 'Binary Search',
      icon: Search,
      complexity: 'O(log n)',
      description: 'Rapidly finds companies in sorted data by eliminating half the search space each iteration.',
      operations: [
        { name: 'Compare Middle', time: 'O(1)' },
        { name: 'Eliminate Half', time: 'O(log n)' },
        { name: 'Find Match', time: 'O(log n)' }
      ],
      benefits: [
        'Logarithmic search time',
        'Works on sorted data',
        'Extremely fast for large lists'
      ]
    },
    {
      title: 'Stack (LIFO)',
      icon: RotateCcw,
      complexity: 'O(1) for all operations',
      description: 'Last-In-First-Out structure for undo functionality. Perfect for action history.',
      operations: [
        { name: 'Push', time: 'O(1)' },
        { name: 'Pop', time: 'O(1)' },
        { name: 'Peek', time: 'O(1)' }
      ],
      benefits: [
        'Instant push/pop operations',
        'Perfect for undo/redo',
        'Minimal memory overhead'
      ]
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Featured Algorithms</h1>
        <p className="text-slate-400 text-lg">Explore the core data structures powering our stock analysis system</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div key={idx} className="bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-8 hover:border-blue-500/30 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{feature.title}</h2>
                  <p className="text-blue-400 font-mono text-sm">{feature.complexity}</p>
                </div>
              </div>

              <p className="text-slate-300 mb-6">{feature.description}</p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {feature.operations.map((op, i) => (
                  <div key={i} className="bg-slate-900/50 rounded-lg p-3 text-center">
                    <p className="text-white font-medium text-sm">{op.name}</p>
                    <p className="text-blue-400 font-mono text-xs mt-1">{op.time}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <p className="text-slate-400 font-semibold text-sm">Key Benefits:</p>
                {feature.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-green-400 font-bold mt-0.5">✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-slate-800/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Why These Algorithms?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-3">Real-World Applications</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• Database indexing (BST)</li>
              <li>• Sorting large datasets (Merge Sort)</li>
              <li>• Search engines (Binary Search)</li>
              <li>• Browser back button (Stack)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Performance Benefits</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• Logarithmic complexity reduces operations</li>
              <li>• Guaranteed performance on large data</li>
              <li>• Memory efficient structures</li>
              <li>• Scalable to millions of records</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
