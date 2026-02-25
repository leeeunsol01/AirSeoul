# ✈️ Air Seoul
팀원들과의 공통 관심사를 바탕으로 에어서울을 선정하여 사용자 경험을 개선하여 리뉴얼했습니다.

## 🛠️ 기술스택
- JavaScript
- jQuery
- Scss
- Swiper

## 📌 주요 기능
- 반응형 웹 구현 (Media Query 활용)
- 빠른 예약 입력 및 선택 값 실시간 UI 반영
- 항공권 가격 데이터를 활용한 막대 그래프 구현


## 🧠 설계 및 구현 과정
### 1. 반응형 웹 구현 
- 모바일, 태블릿, PC 환경에 맞춰 레이아웃 분기 설계
- 태블릿 구간의 해상도 차이를 고려하여 2개의 브레이크포인트로 세분화 구현
- 콘텐츠 레이아웃 붕괴를 방지하기 위해 브레이크포인트를 전략적으로 설정

| 반응형 웹 |
| :--: |
| ![반응형 웹](images/Responsive.gif) |

```css
@media all and (min-width: 601px) and (max-width: 768px) {...}
@media all and (min-width: 769px) and (max-width: 1024px) {...}
@media all and (min-width: 1025px) {...}
```
