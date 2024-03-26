<script setup>
import { RouterLink } from "vue-router";
import { ref, watch } from "vue";
import { useWindowsWidth } from "../../assets/js/useWindowsWidth";
//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
// images
import ArrDark from "@/assets/img/down-arrow-dark.svg";
import DownArrWhite from "@/assets/img/down-arrow-white.svg";
import MaterialButton from "@/components/MaterialButton.vue";

const isAuthenticated = ref(false);

if (sessionStorage.getItem("token")) {
  isAuthenticated.value = true;
}

function logout() {
  sessionStorage.removeItem("token");
  isAuthenticated.value = false;
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
    ? "text-dark font-weight-bolder ms-sm-3"
    : "text-white font-weight-bolder ms-sm-3",
];

const getContainerClass = () => [
  props.transparent || props.light || props.dark
    ? "container"
    : "container-fluid px-0",
];
</script>
<template>
  <nav class="navbar navbar-expand-lg top-0">
    <div :class="getContainerClass()">
      <RouterLink
        class="navbar-brand d-none d-md-block"
        :class="getBrandClass()"
        :to="{ name: 'presentation' }"
        rel="tooltip"
        title="Designed and Coded by Creative Tim"
        data-placement="bottom"
      >
        BuySell
      </RouterLink>
      <section>
        <MaterialInput
          class="input-group-dynamic mb-1"
          icon="search"
          type="text"
          placeholder="Search"
        />
      </section>
      <div class="d-flex align-items-center">
        <div
          role="button"
          class="nav-link ps-2 d-flex cursor-pointer align-items-end justify-content-end"
          :class="getTextColor()"
          id="dropdownMenuPages"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          `
        </div>
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
          <ul class="navbar-nav navbar-nav-hover ms-auto">
            <router-link to="/orders">
              <MaterialButton
                class="my-4 mb-2"
                variant="gradient"
                color="success"
                fullWidth
              >
                상품등록
              </MaterialButton>
            </router-link>
            <li class="nav-item dropdown dropdown-hover mx-2">
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
                          <span>profile</span>
                        </RouterLink>
                        <RouterLink
                          :to="{ name: 'wishlist' }"
                          class="dropdown-item border-radius-md"
                        >
                          <span>wishlist</span>
                        </RouterLink>
<!--                        <RouterLink-->
<!--                          :to="{ name: 'mysales' }"-->
<!--                          class="dropdown-item border-radius-md"-->
<!--                        >-->
<!--                          <span>MySales</span>-->
<!--                        </RouterLink>-->
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
                    <span>profile</span>
                  </RouterLink>
                  <RouterLink
                    :to="{ name: 'wishlist' }"
                    class="dropdown-item border-radius-md"
                  >
                    <span>wishlist</span>
                  </RouterLink>
<!--                  <RouterLink-->
<!--                    :to="{ name: 'mysales' }"-->
<!--                    class="dropdown-item border-radius-md"-->
<!--                  >-->
<!--                    <span>MySales</span>-->
<!--                  </RouterLink>-->
                </div>
              </div>
            </li>
            <li class="nav-item">
              <button
                v-if="isAuthenticated"
                class="btn btn-sm mb-0"
                @click="logout"
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
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
