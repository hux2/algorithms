import sys

input = sys.stdin.readline

n, k = map(int, input().split())

s = [[0, 0]]
ns = [[0 for _ in range(k + 1)] for _ in range(n + 1)]

for _ in range(n):
    s.append(list(map(int, input().split())))

for i in range(1, n + 1):
    for j in range(1, k + 1):
        w = s[i][0]
        v = s[i][1]

        if j < w:
            ns[i][j] = ns[i - 1][j]
        else:
            ns[i][j] = max(v + ns[i - 1][j - w], ns[i - 1][j])

sys.stdout.write(str(ns[n][k]))

# 답은 맞았는데 겁나게 오래걸림
