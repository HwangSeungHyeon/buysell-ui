import { ref } from "vue";
import jwt_decode from "jwt-decode";

// 로그인 여부를 저장하는 변수
const isAuthenticated = ref(false);

// 로그인 시 엑세스 토큰을 체크하고 만료 시간을 확인합니다.
function checkAccessToken(token) {
  try {
    // 엑세스 토큰 디코딩하여 토큰 정보 가져오기
    const decodedToken = jwt_decode(token);
    console.log("decode", decodedToken);
    const expiration = new Date(decodedToken.exp * 1000); // 토큰 만료 시간
    console.log("exp", expiration);
    // 현재 시간과 토큰 만료 시간 비교
    const now = new Date();
    if (now > expiration) {
      // 토큰이 만료되었으므로 로그아웃
      logout();
    }
  } catch (error) {

  }
}

// 로그아웃 함수
function logout() {
  localStorage.removeItem("token");
  isAuthenticated.value = false;
  alert("로그아웃 되었습니다");
}

// 초기화 함수: 페이지 로드 시 토큰 확인
function initialize() {
  const token = localStorage.getItem("token");
  if (token) {
    // 토큰이 있는 경우 로그인 상태로 설정
    isAuthenticated.value = true;
    // 토큰 체크 및 만료 시간 확인
    checkAccessToken(token);
  }
}
// 페이지 로드 시 초기화 함수 호출
initialize();

// 다른 컴포넌트에서 사용 가능하도록 export
export { isAuthenticated, checkAccessToken, logout };