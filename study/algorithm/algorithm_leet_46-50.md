# 46번 ~ 50번
2019-09-01 ~ 2019-09-07

## 46. Permutations
주어진 input으로 찾을 수 있는 모든 순열 찾기. 중복값은 없다.
### 풀이 아이디어
소스코드로 대체
```java
class Solution {
    public List<List<Integer>> permute(int[] num) {
        List<List<Integer>> result = new ArrayList<List<Integer>>();
        permute(result, num, 0);
        return result;
    }
    
    private void permute(List<List<Integer>> result, int[] num, int start) {
		if (start >= num.length) {
			List<Integer> current = new ArrayList<Integer>();
			for (int a : num) {
			    current.add(a);
			}
			result.add(current);
		} else {
			for (int i=start; i<num.length; i++) {
				swap(num, start, i);
				permute(result, num, start+1);
				swap(num, start, i);
			}
		}
	}
	
	private void swap(int[] num, int i, int j) {
		int temp = num[i];
		num[i] = num[j];
		num[j] = temp;
	}
}
```

## 47. Permutations2
46번 문제와 비슷하다.
### 풀이 아이디어
사용 여부를 체크 해주는 배열을 사용하여 중복 숫자에 대한 처리를 해주면 된다.

## 48. Rotate Image
n * n 2d matrix를 오른쪽으로 90도 회전 시켜서 출력해주면 되는 문제.\
### 풀이 아이디어
예를 들어\
&nbsp;&nbsp;&nbsp;(0, 0) => (0, n)\
&nbsp;&nbsp;&nbsp;(0, 1) => (1, n)\
&nbsp;&nbsp;&nbsp;...\
&nbsp;&nbsp;&nbsp;(0, n) => (n, n)\
식으로, row, column 간 변환 규칙을 찾으면 됨.

## 49. Group Anagrams
string 배열이 주어진다.\
같은 문자로 이루어진 문자열마다 list를 만들어 반환 해 준다.\
예를 들어 
```
Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
```
`eat`와 `tea`는 a * 1, e * 1, t * 1로 이루어져 있어 같은 리스트로 묶을 수 있다.
### 풀이 아이디어
인풋으로 들어오는 문자열은 알파벳 소문자만 들어온다.\
각 string에 어떤 알파벳이 몇 번 쓰였는지 기록 해 두면 같은 알파벳으로 만들어진 문자열을 찾을 수 있다.\
알파벳은 26자이기 때문에 크기 26 짜리 int 배열을 만들면\
0|1|2|3|4|5|...|18|18|20|...|24|25
-|-|-|-|-|-|-|-|-|-|-|-|-
1|0|0|0|1|0|...|0|1|0|...|0|0
가 되고, 이 값들을 이어붙여 map에 key로 집어 넣으면 같은 알파벳으로 만들어진 문자열을 찾을 수 있다.

## 50. Pow(x, n)
