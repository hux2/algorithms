import sys

input = sys.stdin.readline

n = int(input())
m = list(map(int, input().split(' ')))

for i in range(1, n):
    m[i] = max(m[i], m[i] + m[i-1])

sys.stdout.write(str(max(m)))
