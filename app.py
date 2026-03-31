from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import uuid
from algorithms.bst import BinarySearchTree
from algorithms.sorting import merge_sort
from algorithms.search import binary_search, linear_search
from algorithms.stack import ActionStack

app = Flask(__name__)
CORS(app)

stocks_data = []
bst = BinarySearchTree()
action_stack = ActionStack()

def create_stock(company, symbol, price):
    return {
        'id': str(uuid.uuid4()),
        'company': company,
        'symbol': symbol,
        'price': float(price),
        'created_at': datetime.now().isoformat()
    }

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'message': 'Stock Analysis API running'}), 200

@app.route('/api/stocks', methods=['GET'])
def get_stocks():
    return jsonify(stocks_data), 200

@app.route('/api/stocks', methods=['POST'])
def add_stock():
    try:
        data = request.get_json()
        company = data.get('company', '').strip()
        symbol = data.get('symbol', '').strip().upper()
        price = data.get('price')

        if not company or not symbol or price is None:
            return jsonify({'error': 'Missing required fields'}), 400

        try:
            price = float(price)
            if price < 0:
                return jsonify({'error': 'Price must be positive'}), 400
        except ValueError:
            return jsonify({'error': 'Invalid price format'}), 400

        stock = create_stock(company, symbol, price)
        stocks_data.append(stock)
        bst.insert(company, symbol, price, stock['id'])

        action_stack.push({
            'action': 'add',
            'timestamp': datetime.now().isoformat(),
            'data': stock
        })

        return jsonify(stock), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stocks/<stock_id>', methods=['DELETE'])
def delete_stock(stock_id):
    try:
        global stocks_data
        stock = next((s for s in stocks_data if s['id'] == stock_id), None)

        if not stock:
            return jsonify({'error': 'Stock not found'}), 404

        stocks_data = [s for s in stocks_data if s['id'] != stock_id]
        bst.clear()
        for s in stocks_data:
            bst.insert(s['company'], s['symbol'], s['price'], s['id'])

        action_stack.push({
            'action': 'delete',
            'timestamp': datetime.now().isoformat(),
            'data': stock
        })

        return jsonify({'message': 'Stock deleted', 'stock': stock}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stocks/sorted', methods=['GET'])
def get_sorted_stocks():
    try:
        sorted_stocks = merge_sort(stocks_data.copy())
        return jsonify({
            'stocks': sorted_stocks,
            'algorithm': 'Merge Sort',
            'complexity': 'O(n log n)'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stocks/bst', methods=['GET'])
def get_bst_sorted():
    try:
        bst_sorted = bst.inorder_traversal()
        return jsonify({
            'stocks': bst_sorted,
            'algorithm': 'Binary Search Tree (Inorder)',
            'complexity': 'O(n)'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stocks/search/company', methods=['POST'])
def search_company():
    try:
        data = request.get_json()
        company = data.get('company', '').strip()

        if not company:
            return jsonify({'error': 'Company name required'}), 400

        result = binary_search(stocks_data, company)

        return jsonify({
            'result': result,
            'found': result is not None,
            'algorithm': 'Binary Search',
            'complexity': 'O(log n)'
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stocks/search/symbol', methods=['POST'])
def search_symbol():
    try:
        data = request.get_json()
        symbol = data.get('symbol', '').strip().upper()

        if not symbol:
            return jsonify({'error': 'Symbol required'}), 400

        result = linear_search(stocks_data, symbol)

        return jsonify({
            'result': result,
            'found': result is not None,
            'algorithm': 'Linear Search',
            'complexity': 'O(n)'
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stocks/undo', methods=['POST'])
def undo_action():
    try:
        if action_stack.is_empty():
            return jsonify({'message': 'No actions to undo'}), 200

        action = action_stack.pop()

        if action['action'] == 'add':
            global stocks_data
            stocks_data = [s for s in stocks_data if s['id'] != action['data']['id']]
        elif action['action'] == 'delete':
            stocks_data.append(action['data'])

        bst.clear()
        for s in stocks_data:
            bst.insert(s['company'], s['symbol'], s['price'], s['id'])

        return jsonify({
            'message': f"Undone: {action['action']} action",
            'action': action,
            'current_stocks': stocks_data
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stocks/history', methods=['GET'])
def get_history():
    try:
        history = action_stack.get_operations()
        return jsonify({
            'history': history,
            'total_actions': action_stack.size(),
            'data_structure': 'Stack (LIFO)'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stocks/analysis', methods=['GET'])
def get_analysis():
    try:
        if not stocks_data:
            return jsonify({
                'total': 0,
                'average': 0,
                'min': 0,
                'max': 0,
                'variance': 0,
                'top_companies': [],
                'message': 'No stocks data'
            }), 200

        prices = [s['price'] for s in stocks_data]
        total = sum(prices)
        average = total / len(prices)
        min_price = min(prices)
        max_price = max(prices)

        variance = sum((p - average) ** 2 for p in prices) / len(prices)

        sorted_stocks = sorted(stocks_data, key=lambda x: x['price'], reverse=True)
        top_companies = sorted_stocks[:5]

        return jsonify({
            'total': len(stocks_data),
            'sum': total,
            'average': round(average, 2),
            'min': min_price,
            'max': max_price,
            'variance': round(variance, 2),
            'top_companies': top_companies,
            'all_stocks': stocks_data
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
