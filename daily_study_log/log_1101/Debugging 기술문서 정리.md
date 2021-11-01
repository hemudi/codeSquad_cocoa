# Debugging in VScode

> ### __코드에서 버그를 제거하는 과정__

## 💬 VSCode 에서 Debugging 하는 방법
  1. F5
  2. 상단 메뉴 : 실행(Run) > 디버깅 시작(Start Debugging)
  3. 좌측 메뉴 : 실행 및 디버그(Run and Debug)

## 💬 Breakpoints
- 중단점
- 코드 실행 중 중단하고 싶은 부분
- 디버깅을 하면 지정한 breakpoint에서 실행 중단 후 해당 시점의 실행 정보를 검사할 수 있음.
- 편집기 왼쪽 여백에 빨간 점으로 표시
- 설정 방법
  - 편집기 왼쪽 여백의 지정 라인 클릭
  - 코드 클릭 후 F9

## 💬 Watch
- 코드의 실행에 따른 여러 개의 변수 또는 표현식(Expression)의 값을 표시하는 섹션
- 디버깅시 좌측에 출력
- Watch 섹션의 빈 공간을 더블클릭 하거나 우측 상단의 + 버튼을 클릭하여 검사하고자 하는 변수 또는 표현식을 추가 가능
- 현재 디버깅 중인 프로그램 안에 정의된 변수와 그와 관련된 표현식만 검사 가능

## 💬 Call Stack
- 함수와 메서드가 호출되는 순서가 표시되는 섹션
- 프로그램의 실행 흐름을 파악하는데 유용

## 💬 Step
- step over(F10) : 중괄호 포함(함수 외부로) 다음 라인으로 이동
- step into(F11) : 함수 내부로 들어가며 다음 라인으로 이동
- step out(Shift + F11) : 현재 함수의 나머지 부분 실행 후 일시 중지

> Reference
- [Visual Studio Code : Debugging](https://code.visualstudio.com/docs/editor/debugging)
- [[VsCode] 디버깅 breakpoints, watch, step](https://velog.io/@proshy/VScode-디버깅-breakpoints-watch-step#step-over--step-into--step-out)
- [VSCode 디버깅 기능 알아보기](https://reese-dev.netlify.app/etc/vscode_debugging/)
- [Visual Studio Code(VSCode) NodeJS 디버그 모드 사용하기](https://notstop.co.kr/927/)