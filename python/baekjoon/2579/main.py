import sys

input = sys.stdin.readline

n = int(input().rstrip())

i = 0
stair = []
result = []
while i < n:
    stair.append(int(input().rstrip()))
    i += 1


result.append(stair[0])
result.append(stair[0] + stair[1])
result.append(max(stair[0] + stair[2], stair[1] + stair[2]))

for i in range(3, n):
    result.append(max(result[i - 2] + stair[i],
                  stair[i - 1] + stair[i] + result[i - 3]))

sys.stdout.write((str(result.pop())))


#########


input = sys.stdin.readline

n = int(input())

stairs = [0] * 301
for i in range(1, n + 1):
    stairs[i] = int(input())

dp = [0] * 301
dp[1] = stairs[1]
dp[2] = stairs[1] + stairs[2]
dp[3] = max(stairs[1] + stairs[3], stairs[2] + stairs[3])

for i in range(4, n + 1):
    dp[i] = max(dp[i - 3] + stairs[i - 1] + stairs[i], dp[i - 2] + stairs[i])

print(dp[n])
