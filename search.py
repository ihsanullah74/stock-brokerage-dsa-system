def binary_search(stocks, target_company):
    stocks_sorted = sorted(stocks, key=lambda x: x['company'].lower())
    left, right = 0, len(stocks_sorted) - 1

    while left <= right:
        mid = (left + right) // 2
        mid_company = stocks_sorted[mid]['company'].lower()
        target_lower = target_company.lower()

        if mid_company == target_lower:
            return stocks_sorted[mid]
        elif mid_company < target_lower:
            left = mid + 1
        else:
            right = mid - 1

    return None

def linear_search(stocks, target_symbol):
    target_lower = target_symbol.lower()
    for stock in stocks:
        if stock['symbol'].lower() == target_lower:
            return stock
    return None
