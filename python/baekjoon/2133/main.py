import sys

input = sys.stdin.readline

n = int(input())

if n % 2 == 1:
    print(0)
else:
    dp = [0 for _ in range(n + 1)]

    dp[0] = 1
    dp[2] = 3

    if n > 3:
        for i in range(2, n + 2, 2):
            dp[i] = dp[i - 2] * 3
            j = i - 4
            while (j >= 0):
                dp[i] += 2 * dp[j]
                j -= 2

    print(dp[n])
