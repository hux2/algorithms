import sys

input = sys.stdin.readline

n, k = map(int, input().split())

w = [0 for _ in range(n)]
v = [0 for _ in range(n)]

for i in range(n):
    w[i], v[i] = map(int, input().split())
