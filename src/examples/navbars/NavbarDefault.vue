<template>
  <nav class="navbar navbar-expand-lg top-0 col-lg-10 mx-auto">
    <div :class="getContainerClass()" class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <RouterLink
            class="navbar-brand d-none d-md-block"
            :class="getBrandClass()"
            :to="{ name: 'presentation' }"
            rel="tooltip"
            title="Designed and Coded by Creative Tim"
            data-placement="bottom"
            style="font-size: 1.5rem; margin-top: -11px"
        >
          <img
              src="@/assets/img/noooo.png"
              alt="Vue MK Header"
              width="100%"
              height="40"
          />
        </RouterLink>
        <li class="nav-item dropdown dropdown-hover mx-1" style="list-style: none;">
          <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="navbarDropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style="white-space: nowrap; display: flex; align-items: center;"
          >
            카테고리
            <img :src="getArrowColor()" alt="down-arrow" class="arrow ms-2 d-lg-block d-none" />
            <img :src="getArrowColor()" alt="down-arrow" class="arrow ms-1 d-lg-none d-block ms-auto" />
          </a>
          <ul
              class="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3"
              aria-labelledby="navbarDropdownMenuLink"
          >
            <li v-for="category in categories" :key="category.value" @click="selectCategory(category)">
              <router-link :to="{ name: 'presentation', query: { category: category.value } }" class="dropdown-item">
                {{ category.label }}
              </router-link>
            </li>
          </ul>
        </li>
      </div>
      <section class="mx-auto">
        <MaterialInput
          class="input-group-dynamic mb-1 me-10"
          icon="search"
          type="text"
          placeholder="Search"
          v-model="formData.keyword"
          :value="formData.keyword"
          @input="formData.keyword = $event.target.value"
          @keyup.enter="performSearch"
        />
      </section>
      <div class="d-flex align-items-center">
        <button
          class="navbar-toggler shadow-none ms-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navigation"
          aria-controls="navigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon mt-2"
            ><span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </span>
        </button>
        <div
          class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
          id="navigation"
        >
          <ul class="navbar-nav navbar-nav-hover">
            <li
              class="nav-item d-flex align-items-center me-2"
              v-if="isAuthenticated"
            >
              <router-link to="/createPost">
                <MaterialButton
                  class="btn btn-sm mb-0"
                  variant="gradient"
                  color="success"
                  fullWidth
                >
                  상품등록
                </MaterialButton>
              </router-link>
            </li>
            <li class="nav-item d-flex align-items-center">
              <button
                v-if="isAuthenticated"
                class="btn btn-sm mb-0"
                @click="handleLogout"
                :class="action.color"
              >
                로그아웃
              </button>
              <router-link v-else :to="action.route">
                <button class="btn btn-sm mb-0" :class="action.color">
                  {{ action.label }}
                </button>
              </router-link>
            </li>
            <li
              class="nav-item dropdown dropdown-hover mx-2"
              v-if="isAuthenticated"
            >
              <a
                role="button"
                class="nav-link ps-2 d-flex cursor-pointer align-items-center"
                :class="getTextColor()"
                id="dropdownMenuPages"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  class="material-icons opacity-6 me-2 text-md"
                  :class="getTextColor()"
                >
                  dashboard</i
                >

                <img
                  :src="getArrowColor()"
                  alt="down-arrow"
                  class="arrow ms-2 d-lg-block d-none"
                />
                <img
                  :src="getArrowColor()"
                  alt="down-arrow"
                  class="arrow ms-1 d-lg-none d-block ms-auto"
                />
              </a>
              <div
                class="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3"
                aria-labelledby="dropdownMenuPages"
              >
                <div class="row d-none d-lg-block">
                  <div class="col-12 px-4 py-2">
                    <div class="row">
                      <div class="position-relative">
                        <div
                          class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1"
                        >
                          개인
                        </div>
                        <RouterLink
                          :to="{ name: 'about' }"
                          class="dropdown-item border-radius-md"
                        >
                          <span>My Page</span>
                        </RouterLink>
                        <RouterLink
                          :to="{ name: 'four-t-pay' }"
                          class="dropdown-item border-radius-md"
                        >
                          <span>Four-T-Pay</span>
                        </RouterLink>
                        <RouterLink
                          :to="{ name: 'author' }"
                          class="dropdown-item border-radius-md"
                        >
                          <span>Profile</span>
                        </RouterLink>
                        <RouterLink
                          :to="{ name: 'wishlist' }"
                          class="dropdown-item border-radius-md"
                        >
                          <span>WishList</span>
                        </RouterLink>
                        <RouterLink
                          :to="{ name: 'mysales' }"
                          class="dropdown-item border-radius-md"
                        >
                          <span>MySales</span>
                        </RouterLink>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-lg-none">
                  <div
                    class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-0"
                  >
                    개인
                  </div>
                  <RouterLink
                    :to="{ name: 'about' }"
                    class="dropdown-item border-radius-md"
                  >
                    <span>My Page</span>
                  </RouterLink>
                  <RouterLink
                    :to="{ name: 'four-t-pay' }"
                    class="dropdown-item border-radius-md"
                  >
                    <span>Four-T-Pay</span>
                  </RouterLink>
                  <RouterLink
                    :to="{ name: 'author' }"
                    class="dropdown-item border-radius-md"
                  >
                    <span>Profile</span>
                  </RouterLink>
                  <RouterLink
                    :to="{ name: 'wishlist' }"
                    class="dropdown-item border-radius-md"
                  >
                    <span>WishList</span>
                  </RouterLink>
                  <RouterLink
                    :to="{ name: 'mysales' }"
                    class="dropdown-item border-radius-md"
                  >
                    <span>MySales</span>
                  </RouterLink>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref, watch } from "vue";
import { useRouter} from "vue-router";
import { useWindowsWidth } from "@/assets/js/useWindowsWidth";
import MaterialInput from "@/components/MaterialInput.vue";
import ArrDark from "@/assets/img/down-arrow-dark.svg";
import DownArrWhite from "@/assets/img/down-arrow-white.svg";
import MaterialButton from "@/components/MaterialButton.vue";
import { checkAccessToken } from "@/utils/auth";

const categories = [
  { value: "BEAUTY", label: "뷰티" },
  { value: "FASHION", label: "의류" },
  { value: "KITCHEN", label: "주방" },
  { value: "BOOK", label: "책" },
  { value: "CHILDCARE", label: "육아" },
  { value: "INTERIOR", label: "인테리어" },
  { value: "GAME", label: "게임" },
  { value: "CAR_SUPPLIES", label: "자동차 용품" },
  { value: "FOOD", label: "음식" },
  { value: "SPORTS", label: "스포츠" },
  { value: "DIGITAL", label: "디지털" },
  { value: "PET", label: "반려동물" },
  { value: "OTHERS", label: "기타" },
];
const router = useRouter();
const formData = ref({ keyword: '' });
const isAuthenticated = ref(false);
if (localStorage.getItem("token")) {
  isAuthenticated.value = true;
}
if (router) {
  router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    if (token) {
      // 토큰이 있는 경우 로그인 상태로 설정
      isAuthenticated.value = true;
      // 토큰 체크 및 만료 시간 확인
      checkAccessToken(token);
    } else {
      // 토큰이 없는 경우 로그아웃 상태로 설정
      isAuthenticated.value = false;
    }
    next(); // 반드시 next()를 호출해야 다음 단계로 진행합니다.
  });
}
function handleLogout() {
  checkAccessToken()
  localStorage.removeItem(`token`);
  isAuthenticated.value=false;
  alert("로그아웃 되었습니다")
  router.push(`/`);
}
const props = defineProps({
  action: {
    type: Object,
    route: String,
    color: String,
    label: String,
    default: () => ({
      route: "/login",
      color: "bg-gradient-success",
      label: "로그인",
    }),
  },
  transparent: {
    type: Boolean,
    default: false,
  },
  light: {
    type: Boolean,
    default: false,
  },
  dark: {
    type: Boolean,
    default: false,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
  darkText: {
    type: Boolean,
    default: false,
  },
});

let textDark = ref(props.darkText);
const { type } = useWindowsWidth();

if (type.value === "mobile") {
  textDark.value = true;
} else if (type.value === "desktop" && textDark.value === false) {
  textDark.value = false;
}
watch(
  () => type.value,
  (newValue) => {
    if (newValue === "mobile") {
      textDark.value = true;
    } else {
      textDark.value = false;
    }
  }
);

// set arrow  color
function getArrowColor() {
  if (props.transparent && textDark.value) {
    return ArrDark;
  } else if (props.transparent) {
    return DownArrWhite;
  } else {
    return ArrDark;
  }
}

const getTextColor = () => {
  let color;
  if (props.transparent && textDark.value) {
    color = "text-dark";
  } else if (props.transparent) {
    color = "text-white";
  } else {
    color = "text-dark";
  }

  return color;
};

const getBrandClass = () => [
  (props.transparent && textDark.value) || !props.transparent
    ? "text-dark font-weight-bolder ms-sm-0"
    : "text-white font-weight-bolder ms-sm-0",
];

const getContainerClass = () => [
  props.transparent || props.light || props.dark
    ? "container"
    : "container-fluid px-0",
];

function performSearch() {
  if (!formData.value.keyword) {
    alert("검색어를 입력해주세요");
    return;
  }
  router.push({ path: '/posts/search', query: { keyword: formData.value.keyword} });
}

function selectCategory(category) {
  // console.log(category.value);
  router.push({ name: "presentation", query: { category: category.value } });
}
</script>