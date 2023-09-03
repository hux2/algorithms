import sys

input = sys.stdin.readline

n, m = map(int, input().split())

count = (n * m) - 1

sys.stdout.write(str(count))
