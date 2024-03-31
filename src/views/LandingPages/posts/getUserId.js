import { useJwt } from "@vueuse/integrations/useJwt";

const getUserId = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = useJwt(token);
    // console.log("user", userId);
    return decoded.payload.value.sub;
  } else {
    // 토큰이 없는 경우 처리
    return null;
  }
};

export default getUserId;