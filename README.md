# 학생 관리 서비스 (Fetch API + MockAPI CRUD)

22301015 심지섭 

---

## 1. Deployment


- GitHub (Organization Repo) : https://github.com/2026-2-OSS/assign09-c01-22301015
- Vercel : https://2026ossassign4-1.vercel.app/
- MockAPI Endpoint : https://6adea73d4e88f1bba4a53cc5.mockapi.io/students 

---

## 2. Service

**주제:** 학생 관리 (이름, 나이, 전공, 학년, 성별)

**MockAPI Resource:** `students` 
- id - String
- name - String
- age - Number
- major - String
- grade - Number
- gender - String
- createdAt - String

**CRUD 기능**

`조회`(GET)
- 페이지가 열리면 목록을 불러와 화면에 출력

`추가`(POST)

- Form 입력값을 서버에 저장하고 목록 갱신

`수정`(PUT) 
- 목록의 수정 버튼으로 Form에 값을 채운 뒤 서버에 반영 

`삭제`(DELETE) 
- confirm() 확인 후 서버 데이터 삭제 


**입력 검증 (추가·수정 공통)**

1. 이름은 2자 이상
2. 나이: 1보다 작을 경우 안 됨 
3. 전공은 비어 있으면 안 됨
4. 학년은 1~6 사이
5. 성별은 반드시 선택

**기타:** `filter()`로 이름 또는 전공이 검색어와 일치하는 학생 검색, 요청 실패 시 `alert()`로 오류 메시지 표시, 새로고침해도 서버 데이터 유지

---

## 3. Key Learning

1. **fetch()와 async/await:** 서버 응답을 기다리려면 `await`을 써야 하고, `await`은 `async` 함수 안에서만 쓸 수 있다. `response.ok`로 성공 여부를 확인하고 `try/catch`로 실패를 처리해야 화면에 오류 안내를 줄 수 있다는 것을 배웠다.
2. **REST API와 JSON:** CRUD가 GET / POST / PUT(PATCH) / DELETE에 각각 대응하고, 데이터는 JSON으로 주고받는다. PUT은 리소스 전체 교체, PATCH는 일부 변경이라는 차이를 알게 되었다.
3. **replaceChildren()** 데이터가 바뀔 때마다 `replaceChildren()`으로 목록을 비우고 다시 그려야 화면과 서버가 일치한다는 것을 배웠다.

---

## 4. AI / Search Usage
- 도구 : Claude
- 사용 목적 : 코드 구조 조언, 오류 원인 분석
- 참고 또는 반영한 기능 : 
    1. 오타 확인
    2. 요청 실패 처리 
    3. updateStudent() 
- 직접 수정한 내용 : 
    1. 오타 수정 - fecth → fetch, replaceChild → replaceChildren 
    2. 요청 실패 처리 - catch() 
    3. updateStudent() - PATCH -> PUT
- 배운 점 : 
    1. 오타를 확인하지 않고 반복되는 작업에 대해서 복사, 붙여넣기를 했었는데, 제 눈에는 어느 부분에 문제가 있었는지 확인하기 어려웠고 많은 시간이 소요되었는데 AI에게 물어보면서 빠르게 확인할 수 있었습니다. 그래도 다음부터는 코드를 작성할 때 처음부터 실수를 하지 말아야 겠다는 생각을 가지게 되었습니다. 
    2. 수정 요청이 실패했을 때 Console의 빨간 에러 메시지를 직접 읽어 보고, MockAPI 서버가 PATCH를 CORS로 허용하지 않아서 생긴 문제라는 것을 알게 되었습니다. 코드가 틀린 것이 아니라 서버가 허용하는 메서드에 맞춰야 한다는 것과 PUT(전체 교체)과 PATCH(일부 변경)의 차이를 배웠습니다.
    3. await은 async 함수 안에서만 쓸 수 있고, await이 없으면 요청이 실패해도 catch가 오류를 잡지 못한다는 것을 배웠습니다. 
- 본인 추정 AI 기여율 : 35% - html, css는 직접 작성했고, js에서 오타, try/catch, 에러 발생 원인에만 AI를 사용하였기에 35%라고 생각합니다.   

---

## 5. Problem & Solution / Reflection

**문제 1. Failed to fetch**
- 원인: pdf에 나와 있는 코드를 참고해서 진행했는데 `Method PATCH is not allowed by Access-Control-Allow-Methods in preflight response`가 나왔습니다. 
- 해결: method를 `PATCH` 대신 `PUT`으로 변경했더니 해결되었습니다. 

**문제 2. 수정 취소 버튼을 누르면 "이름은 2자 이상 입력하세요" 알림**
- 원인: `<form>` 안의 `<button>`은 type을 적지 않으면 기본이 submit이라 취소와 동시에 Form이 제출됩니다.
- 해결: 취소 버튼에 `type="button"` 추가하여 해결했습니다.

**Reflection**
- REST API의 순서를 처음에는 이해하기 보다는 PDF 강의 자료를 보고 따라 작성하는 방식으로 진행했는데, 결국 서버 전송과 응답받는 순서를 알지 못하면 코드 작성하는 것에 어려움이 있다는 것을 알게 되어서, 여러 번 코드를 작성해보면서 익숙해질 수 있었습니다. 