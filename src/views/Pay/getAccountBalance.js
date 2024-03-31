import { onMounted, ref } from 'vue';
import axios from 'axios';
import setMaterialInput from "@/assets/js/material-input";

export function getAccountBalance(){
    const accountBalance = ref('0,000');

    onMounted(async () => {
        setMaterialInput();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(`/members/my/accounts`);
            accountBalance.value = response.data.accountBalance;
        } catch (error) {
            console.error('잔액 정보를 가져오지 못했습니다:', error);
        }
    });

    return {
        accountBalance
    };
}