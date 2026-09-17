# 최승숙 여사님 생신 축하 식사 웹 초대장 🌸

정갈하고 따뜻한 분위기의 모바일 웹 청첩장/초대장입니다.  
가족 및 친지분들(약 10명 내외)을 모시는 자리에 어울리도록 품격 있는 감성 디자인과 편리한 편의 기능을 담았습니다.

---

## 📅 행사 정보
- **일시:** 2026년 9월 27일 (일요일) 낮 12:00
- **장소:** [팔복 판교점 (판교엠타워 1층)](https://naver.me/GWe2U1UG)
- **주소:** 경기도 성남시 분당구 판교역로241번길 22 판교엠타워 1층 (삼평동 694)
- **주차:** 판교엠타워 지상 2층 ~ 5층 주차장 (**3시간 무료 주차** 지원, 식사 후 카운터 등록)
- **주최:** 아들 박보현, 딸 박지현 올림

---

## ✨ 주요 기능
1. **모바일 최적화 레이아웃**
   - 스마트폰 화면 비율(폭 480px)에 최적화된 감성 카드 뷰
   - 부드러운 스크롤 애니메이션 및 은은한 한지/수채화 톤앤매너
2. **달력 & D-Day 실시간 카운트다운**
   - 2026년 9월 27일 일요일 하이라이트 캘린더
   - 구글 캘린더 등록 링크 및 일정 파일(`.ics`) 다운로드 지원
3. **오시는 길 & 길찾기 앱 연동**
   - 원클릭 도로명 주소 복사 (클립보드 토스트 알림)
   - 네이버 지도, 카카오맵, 티맵 앱 바로가기 원클릭 버튼
   - 건물 지상 2~5층 3시간 무료 주차 상세 안내
4. **소셜 공유 최적화**
   - 카카오톡/문자 공유 시 전용 미리보기 카드(제목, 설명, 섬네일) 자동 반영 (Open Graph 메타태그)
   - 링크 복사 및 Web Share API 지원

---

## 🚀 GitHub Pages 무료 호스팅 배포 방법

GitHub에 새 리포지토리를 만들고 이 프로젝트를 올리면 누구나 접속 가능한 웹 링크(`https://spkys.github.io/<저장소이름>/`)가 생성됩니다.

### 1단계: GitHub에서 새 저장소 생성
1. [GitHub New Repository](https://github.com/new)에 접속합니다.
2. Repository name에 원하는 이름(예: `invitation` 또는 `mom-birthday`)을 입력합니다.
3. **Public**으로 설정하고 **Create repository** 버튼을 누릅니다.

### 2단계: 로컬에서 푸시 (터미널)
프로젝트 폴더(`/home/spkys/etc`)에서 아래 명령어를 실행합니다:

```bash
# 원격 저장소 연결 (저장소 이름이 invitation인 경우)
git remote add origin https://github.com/spkys/invitation.git

# main 브랜치로 푸시
git branch -M main
git push -u origin main
```
*(GitHub 로그인 또는 Personal Access Token 입력이 필요할 수 있습니다)*

### 3단계: GitHub Pages 켜기
1. 생성한 GitHub 리포지토리 페이지에서 상단 **Settings** 탭 클릭
2. 좌측 메뉴에서 **Pages** 클릭
3. **Build and deployment** 섹션의:
   - **Source**: `Deploy from a branch` 선택
   - **Branch**: `main`, 폴더는 `/(root)` 선택 후 **Save** 클릭
4. 약 1~2분 후 페이지 상단에 안내되는 배포 URL(예: `https://spkys.github.io/invitation/`)로 접속하시면 즉시 웹 초대장이 공개 서비스됩니다!

---

## 📝 커스터마이징 안내
- 문구 수정: `index.html` 파일의 **초대의 글** 및 **안내 말씀** 내용을 필요에 따라 자유롭게 변경하실 수 있습니다.

