# 입력
# 첫 번째 줄에는 2차원 세계의 세로 길이 H과 2차원 세계의 가로 길이 W가 주어진다. (1 ≤ H, W ≤ 500)

# 두 번째 줄에는 블록이 쌓인 높이를 의미하는 0이상 H이하의 정수가 2차원 세계의 맨 왼쪽 위치부터 차례대로 W개 주어진다.

# 따라서 블록 내부의 빈 공간이 생길 수 없다.
# 또 2차원 세계의 바닥은 항상 막혀있다고 가정하여도 좋다.

# 출력
# 2차원 세계에서는 한 칸의 용량은 1이다. 고이는 빗물의 총량을 출력하여라.

# 빗물이 전혀 고이지 않을 경우 0을 출력하여라.

import sys

# 높이와 너비 받아서 저장
h, w = map(int, sys.stdin.readline().split())

# 각 블록의 높이를 받아서 배열로 저장
heightArr = sys.stdin.readline().split()


# 빗물이 고인 양을 위한 변수
count: int = 0


def func(array, index: int):
    leftTop = array[0]
    rightTop = array[index]
    myTop = array[index]

    # 왼쪽 배열에서 내 위치의 블록보다 높은 블록을 찾기
    for i in range(0, index):
        if (int(leftTop) < int(array[i])):
            leftTop = array[i]

    # 오른쪽 배열에서 내 위치의 블록보다 높은 블록을 찾기
    for j in range(index + 1, len(array)):
        if (int(rightTop) < int(array[j])):
            rightTop = array[j]

    # 좌우 블록이 내 블록보다 높은 경우, 그 중 더 낮은 블록까지만 물이 고일 수 있음
    # 좌우 블록 중 더 낮은 블록을 저장
    smallTop = leftTop
    if (int(leftTop) > int(rightTop)):
        smallTop = rightTop

    water = int(smallTop) - int(myTop)
    if (water < 0):
        water = 0

    # 좌우 블록 중 더 낮은 블록까지만 빗물이 고일 수 있으므로 해당 차이값을 리턴
    return water


# 첫번째와 마지막 블록을 제외한 가운데 블록을 하나씩 순회하며 빗물 양을 계산
for i in range(1, w):
    result = func(heightArr, i)
    count += result


sys.stdout.write(str(count) + '\n')


# 0 0 0 0 0
# 1 0 0 1 1
# 1 1 1 1 1
