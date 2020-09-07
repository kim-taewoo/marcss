# MARCSS

#### 웹앱 주소

https://marcss.netlify.app/

### 소개

MARCSS 는 **MARKDOWN** 과 **CSS** 의 합성어로, 마크다운 문법과 CSS 문법을 이용해 발표 슬라이드를 제작할 수 있는 웹앱입니다. 

일반적인 마크다운 문법으로 내용을 작성한 후, 별도의 스타일링 탭에서 전체 슬라이드, 혹은 개별 슬라이드의 CSS 스타일링이 가능합니다. 

발표를 위한 전체화면 모드로의 진입이 가능합니다.

마크다운과 스타일링을 개별적으로 업로드하거나 다운로드 할 수 있기 때문에, 내용이나 스타일링을 재사용 할 수 있습니다. 

MARCSS 는 별도의 라이브러리 사용 없이 오직 **Vanilla Javascript** 만을 이용해서 제작되었습니다. 

### 기능

#### 문법(마크다운)

1. 테이블을 제외한 대다수의 마크다운 문법이 지원됩니다.
1. `---` 만 있는 줄을 기준으로 슬라이드가 구분됩니다. 

#### 문법(CSS)

1. `전체` 셀렉트 값을 선택해서 CSS 를 작성하면 슬라이드 전체에 공통적으로 적용됩니다. (일종의 발표 테마 역할)
1. 슬라이드 번호 값을 선택하면 해당 번호의 슬라이드에 적용될 CSS 를 작성할 수 있습니다. 
1. 아무런 CSS 선택자 없이 `{}` 중괄호 속에 CSS 문법을 작성하면 해당 슬라이드 전체(하나의 큰 `<div>` 태그) 를 대상으로 CSS 를 작성합니다.
1. 마크다운이 어떤 html 요소로 변환되었는지 안다면 해당 태그를 선택자로 이용해 스타일링 할 수 있습니다. (예: `# Title` 처럼 작성된 마크다운은 `h1` 태그로 변환되므로 `h1 {}` 처럼 CSS 스타일링이 가능합니다.)
1. 위처럼 일반적인 CSS 문법을 지원하기 때문에 `:nth-of-type()` 같은 CSS 선택자를 활용하면 이미지 태그 등도 원하는대로 스타일링 할 수 있습니다.
1. 추가적으로, `@next {}`, `@prev {}` 와 같이 MARCSS 전용 CSS 선택자를 지원합니다. 해당 선택자들은 슬라이드 전환효과를 위한 것입니다. `@next` 는 다음 슬라이드인 상태일 때 어떤 스타일링 속성을 가지고 있어야 할지, `@prev` 는 이전 슬라이드인 상태일 때 어떤 스타일링 속성을 가지고 있어야 하는지를 정의합니다.

#### 전체화면 모드



#### 사용성 증진을 위한 기능

1. 마크다운 입력부, CSS 셀렉트 값에 따라 슬라이드 미리보기 출력부의 스크롤이 조절됩니다. 즉, 마크다운 텍스트의 일부를 클릭하거나, CSS 셀렉트 값을 변경할 때마다 미리보기 스크롤이 동기화됩니다.
1. 마찬가지로 미리보기 슬라이드를 클릭하면 해당 슬라이드에 맞는 마크다운 영역으로 스크롤 되고, CSS 셀렉트 값 또한 변경됩니다. 

#### 파일 가져오기, 내보내기 기능

1. 마크다운 파일을 가져오거나 내보내기 할 수 있습니다.
1. 스타일링 파일을 가져오거나 내보내기 할 수 있습니다. (현재는 MARCSS 에서 내보내기 한 값만을 JSON 형식으로 지원합니다.)
1. 마크다운과 스타일링이 모두 포함된 JSON 형식의 통합 파일도 가져오거나 내보내기 할 수 있습니다. 