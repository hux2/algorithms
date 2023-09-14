import sys

input = sys.stdin.readline

n = int(input())

if n % 2 == 1:
    sys.stdout.write("0\n")
else:
    two = int(pow(3, n / 2))
    if n > 3:
        four = int(pow(2, (n - 2) / 2))
    else:
        four = 0
sys.stdout.write(str(two + four))

# ddd이 d풀이법은 맞지 않음.
# 2블럭과 4블럭의 경우를 모두 더하면 될 것 같은데.. 이 두 블럭이 또 조합되는 경우까지 생각해야 함.
# 재원님.. 어찌하여 이런 문제를 .. 너무 고통스러워요.
