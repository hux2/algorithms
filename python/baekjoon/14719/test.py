import sys

h, w = map(int, sys.stdin.readline().split())

heightArr = sys.stdin.readline().split()
count: int = 0


def func(array, index):
    left = array[:index]
    right = array[(index + 1):]

    leftTop = 0
    rightTop = 0
    myTop = array[index]

    for i in left:
        if (i > myTop):
            if (int(leftTop) < int(i)):
                leftTop = i
    for i in right:
        if (i > myTop):
            if (int(rightTop) < int(i)):
                rightTop = i

    if (leftTop == 0 or rightTop == 0):
        return 0
    smallTop = leftTop
    if (leftTop > rightTop):
        smallTop = rightTop

    return int(smallTop) - int(myTop)


for i in range(1, w - 1):
    result = func(heightArr, i)
    count += result


sys.stdout.write(str(count) + '\n')
