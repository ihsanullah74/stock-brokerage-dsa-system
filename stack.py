class ActionStack:
    def __init__(self):
        self.items = []
        self.operations = []

    def push(self, action):
        self.items.append(action)
        self.operations.append({
            'action': action.get('action'),
            'timestamp': action.get('timestamp'),
            'data': action.get('data')
        })

    def pop(self):
        if not self.is_empty():
            self.operations.pop()
            return self.items.pop()
        return None

    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

    def get_operations(self):
        return self.operations

    def clear(self):
        self.items.clear()
        self.operations.clear()
