class TreeNode:
    def __init__(self, company, symbol, price, stock_id):
        self.company = company
        self.symbol = symbol
        self.price = price
        self.stock_id = stock_id
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, company, symbol, price, stock_id):
        if self.root is None:
            self.root = TreeNode(company, symbol, price, stock_id)
        else:
            self._insert_recursive(self.root, company, symbol, price, stock_id)

    def _insert_recursive(self, node, company, symbol, price, stock_id):
        if price < node.price:
            if node.left is None:
                node.left = TreeNode(company, symbol, price, stock_id)
            else:
                self._insert_recursive(node.left, company, symbol, price, stock_id)
        else:
            if node.right is None:
                node.right = TreeNode(company, symbol, price, stock_id)
            else:
                self._insert_recursive(node.right, company, symbol, price, stock_id)

    def inorder_traversal(self):
        result = []
        self._inorder_recursive(self.root, result)
        return result

    def _inorder_recursive(self, node, result):
        if node is not None:
            self._inorder_recursive(node.left, result)
            result.append({
                'company': node.company,
                'symbol': node.symbol,
                'price': node.price,
                'stock_id': node.stock_id
            })
            self._inorder_recursive(node.right, result)

    def search(self, price):
        return self._search_recursive(self.root, price)

    def _search_recursive(self, node, price):
        if node is None:
            return None
        if node.price == price:
            return node
        elif price < node.price:
            return self._search_recursive(node.left, price)
        else:
            return self._search_recursive(node.right, price)

    def clear(self):
        self.root = None
