import sys

a, b = map(int, sys.stdin.readline().split())

default = (1, 2, 3, 4, 5, 6, 7, 8)

array = default[:a]


def func(index: int, output, prev):
    if (index >= b):
        sys.stdout.write(output + '\n')
    else:
        for num in array:
            if (prev != num and prev <= num):
                func(index + 1, output + str(num) + ' ', num)


func(0, "", 0)
