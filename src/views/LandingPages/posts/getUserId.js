import { useJwt } from "@vueuse/integrations/useJwt";

const getUserId = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = useJwt(token);
    const userId = decoded.payload.value.sub;
    // console.log("user", userId);
    return userId;
  } else {
    // 토큰이 없는 경우 처리
    console.error("토큰이 없습니다.");
    return null;
  }
};

export default getUserId;