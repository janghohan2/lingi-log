# 51번 ~ 60번
## 51. N-Queens
가로, 세로 N*N 에 Queen의 이동 동선이 겹치지 않게 N개의 Queen을 놓을 수 있는 방법?
### 풀이 아이디어
* Queen은 가로 세로, 대각선 방향으로 이동이 가능하다.
* 여기서 1줄엔 Queen 하나씩만 놓아야 한다는 조건을 하나 찾을 수 있다.
* 왼쪽 위 첫번째 줄을 0번쨔로 보면, k 번쨰 줄에 Queen을 놓을 땐 0 ~ k-1번째 줄을 대상으로 동선이 겹치는 Queen이 있는 지 column check, cross line check을 해 준다.
* 이 과정을 0 ~ n-1 번 까지 반복한다.
## 52. N-Queens II
51번과 거의 유사한 문제.
## 53. Maximum Subarray
크기 n의 int array nums를 받았을 때, nums의 sub array 중 sub array 인자가 가장 큰 sub array를 찾으면 된다.\
합의 Maximum 값만 구하면 된다.
### 풀이 아이디어
우리는 Sub array의 startIdx, endIdx를 알 필요 없이 '합'만 구하면 된다.
* `maxSum[i]` 을 nums[i] 일때 합의 max 값\
`prev[i]`를 nums[i] + max(prev[i-1], 0) 라 했을 때(초기값 : nums[0])
    * maxSum[i] = max(maxSum[i-1], nums[i] + max(prev[i-1], 0))

이라고 할 수 있다.\
maxSum[0] = nums[0], prev[0] = nums[0]이라 하고, 1부터 nums.length-1 까지 루프를 돌며 maxSum[i]를 찾으면 된다.
## 54. Spiral Matrix
m * n 배열 matrix가 주어졌을 때, matrix[0][0]부터 시계방향으로 돌며 배열의 값을 읽어 1차원 배열에 담아 출력.\
예를 들어 이렇게.
```
Input:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
Output: [1,2,3,6,9,8,7,4,5]
```
### 풀이 아이디어
단순하게 (0,0) 부터 (0, 1), (0, 2) ... (0, n-1), (1, n-1), (2, n-1) ... (m-1, n-1) ... 이렇게 읽어주면 된다.
## 55. Jump Game
양수 integer 배열 nums가 주어진다. nums[i]의 의미는 i번 인덱스 에서 최대 `i+nums[i]`번 인덱스 까지 jump 가능하다는 의미 이다.\
이 때, 0번 인덱스 부터 출발해서 nums 배열의 마지막 인덱스까지 이동 가능한지 여부를 체크해서 반환해주면 된다.
### 풀이 아이디어


## 56. Merge Intervals
## 57. Insert Interval
## 58. Length of Last Word
## 59. Spiral Matrix II
## 60. Permutation Sequence