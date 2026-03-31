def merge_sort(stocks):
    if len(stocks) <= 1:
        return stocks

    mid = len(stocks) // 2
    left = merge_sort(stocks[:mid])
    right = merge_sort(stocks[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i]['price'] <= right[j]['price']:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result
