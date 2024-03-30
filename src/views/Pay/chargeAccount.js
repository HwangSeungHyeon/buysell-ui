import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from "vue-router";

export function chargeAccount(){
    const formData = ref({ money: '' });
    const router = useRouter();

    const submitForm = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인 정보가 만료되었습니다. 다시 로그인을 해주세요.");
            await router.push("/login");
            return;
        }

        if(!formData.value.money || Number(formData.value.money) <= 0){
            alert("올바른 값을 입력해주세요.")
            return;
        }

        try {
            await axios.patch(`/members/my/accounts/deposit`, null, {
                params: { money: Number(formData.value.money) },
                headers: {
                    Authorization: `${token}`
                },
            });
            alert("입금이 완료되었습니다.");
            await router.push("/four-t-pay");
        } catch (error) {
            console.error("입금 실패:", error);
            alert("입금 처리 중 오류가 발생했습니다.");
        }
    };

    return{
        formData,
        submitForm
    }
}