import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from "vue-router";
import { getAccountBalance } from "@/views/Pay/getAccountBalance";

export function withDraw(){
    const formData = ref({ money: '' });
    const router = useRouter();
    const { accountBalance } = getAccountBalance();

    const submitForm = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인 정보가 만료되었습니다. 다시 로그인을 해주세요.");
            await router.push("/login");
            return;
        }

        if (!formData.value.money || Number(formData.value.money) <= 0) {
            alert("올바른 값을 입력해주세요.");
            return;
        }

        if (Number(formData.value.money) > accountBalance.value) {
            alert("출금할 금액을 확인해주세요.");
            return;
        }

        try {
            await axios.patch(`/members/my/accounts/withdraw`, null, {
                params: { money: Number(formData.value.money) },
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            alert("출금이 완료되었습니다.");
            await router.push("/four-t-pay");
        } catch (error) {
            console.error("출금 실패:", error);
            alert("출금 처리 중 오류가 발생했습니다.");
        }
    };

    return{
        formData,
        submitForm
    }
}