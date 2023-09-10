import sys

input = sys.stdin.readline
t = int(input())
list = [1, 1, 1, 2, 2]
for i in range(5, 100):
    list.append(list[i - 1] + list[i - 5])
for _ in range(t):
    n = int(input())
    sys.stdout.write(str(list[n - 1]))
