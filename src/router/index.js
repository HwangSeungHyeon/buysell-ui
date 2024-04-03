import {createRouter, createWebHistory} from "vue-router";
import PresentationView from "../views/Presentation/PresentationView.vue";
import AboutView from "../views/LandingPages/AboutUs/AboutView.vue";
import ContactView from "../views/LandingPages/ContactUs/ContactView.vue";
import AuthorView from "../views/LandingPages/Author/AuthorView.vue";
import PageHeaders from "../layouts/sections/page-sections/page-headers/HeadersView.vue";
import PageFeatures from "../layouts/sections/page-sections/features/FeaturesView.vue";
import NavigationNavbars from "../layouts/sections/navigation/navbars/NavbarsView.vue";
import NavigationNavTabs from "../layouts/sections/navigation/nav-tabs/NavTabsView.vue";
import NavigationPagination from "../layouts/sections/navigation/pagination/PaginationView.vue";
import InputAreasInputs from "../layouts/sections/input-areas/inputs/InputsView.vue";
import InputAreasForms from "../layouts/sections/input-areas/forms/FormsView.vue";
import ACAlerts from "../layouts/sections/attention-catchers/alerts/AlertsView.vue";
import ACModals from "../layouts/sections/attention-catchers/modals/ModalsView.vue";
import ACTooltipsPopovers from "../layouts/sections/attention-catchers/tooltips-popovers/TooltipsPopoversView.vue";
import ElAvatars from "../layouts/sections/elements/avatars/AvatarsView.vue";
import ElBadges from "../layouts/sections/elements/badges/BadgesView.vue";
import ElBreadcrumbs from "../layouts/sections/elements/breadcrumbs/BreadcrumbsView.vue";
import ElButtons from "../layouts/sections/elements/buttons/ButtonsView.vue";
import ElButtonGroups from "../layouts/sections/elements/button-groups/ButtonGroupsView.vue";
import ElDropdowns from "../layouts/sections/elements/dropdowns/DropdownsView.vue";
import ElProgressBars from "../layouts/sections/elements/progress-bars/ProgressBarsView.vue";
import ElToggles from "../layouts/sections/elements/toggles/TogglesView.vue";
import ElTypography from "../layouts/sections/elements/typography/TypographyView.vue";
import SignUp from "@/views/LandingPages/SignIn/SignUp.vue";
import SignUpAuth from "@/views/LandingPages/SignIn/SignUpAuth.vue";
import CreatePost from "@/views/LandingPages/posts/CreatePost.vue";
import PurchaseForm from "@/views/LandingPages/posts/PurchaseForm.vue";
import ProductForm from "@/views/LandingPages/posts/ProductForm.vue";
import PostEditForm from "@/views/LandingPages/posts/PostEditForm.vue";
import FourTPay from "@/views/Pay/FourTPay.vue";
import Deposit from "@/views/Pay/Deposit.vue";
import Withdraw from "@/views/Pay/Withdraw.vue";
import Login from "@/views/LandingPages/SignIn/Login.vue";
import WishListView from "@/views/WishList/WishListView.vue";
import MySalesView from "@/views/MySales/MySalesView.vue";
import SearchResults from "@/views/Presentation/SearchResults.vue";
import OtherSalesView from "@/views/MySales/OtherSalesView.vue";
import store from "@/store";
import Review from "@/views/MySales/Review.vue";
import PurchaseHistory from "@/views/MySales/PurchaseHistory.vue";
import CreateReview from "@/views/MySales/CreateReview.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "presentation",
      component: PresentationView,
    },
    {
      path: "/pages/landing-pages/about-us",
      name: "about",
      component: AboutView,
    },
    {
      path: "/pages/landing-pages/contact-us",
      name: "contactus",
      component: ContactView,
    },
    {
      path: "/pages/landing-pages/author",
      name: "author",
      component: AuthorView,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/sections/page-sections/page-headers",
      name: "page-headers",
      component: PageHeaders,
    },
    {
      path: "/sections/page-sections/features",
      name: "page-features",
      component: PageFeatures,
    },
    {
      path: "/sections/navigation/navbars",
      name: "navigation-navbars",
      component: NavigationNavbars,
    },
    {
      path: "/sections/navigation/nav-tabs",
      name: "navigation-navtabs",
      component: NavigationNavTabs,
    },
    {
      path: "/sections/navigation/pagination",
      name: "navigation-pagination",
      component: NavigationPagination,
    },
    {
      path: "/sections/input-areas/inputs",
      name: "inputareas-inputs",
      component: InputAreasInputs,
    },
    {
      path: "/sections/input-areas/forms",
      name: "inputareas-forms",
      component: InputAreasForms,
    },
    {
      path: "/sections/attention-catchers/alerts",
      name: "ac-alerts",
      component: ACAlerts,
    },
    {
      path: "/sections/attention-catchers/modals",
      name: "ac-modals",
      component: ACModals,
    },
    {
      path: "/sections/attention-catchers/tooltips-popovers",
      name: "ac-tooltips-popovers",
      component: ACTooltipsPopovers,
    },
    {
      path: "/sections/elements/avatars",
      name: "el-avatars",
      component: ElAvatars,
    },
    {
      path: "/sections/elements/badges",
      name: "el-badges",
      component: ElBadges,
    },
    {
      path: "/sections/elements/breadcrumbs",
      name: "el-breadcrumbs",
      component: ElBreadcrumbs,
    },
    {
      path: "/sections/elements/buttons",
      name: "el-buttons",
      component: ElButtons,
    },
    {
      path: "/sections/elements/button-groups",
      name: "el-button-groups",
      component: ElButtonGroups,
    },
    {
      path: "/sections/elements/dropdowns",
      name: "el-dropdowns",
      component: ElDropdowns,
    },
    {
      path: "/sections/elements/progress-bars",
      name: "el-progress-bars",
      component: ElProgressBars,
    },
    {
      path: "/sections/elements/toggles",
      name: "el-toggles",
      component: ElToggles,
    },
    {
      path: "/sections/elements/typography",
      name: "el-typography",
      component: ElTypography,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
    {
      path: "/auth",
      name: "auth",
      component: SignUpAuth,
    },
    {
      path: "/createPost",
      name: "createPost",
      component: CreatePost,
    },
    {
      path: `/posts/:postId`,
      name: "posts",
      component: ProductForm,
    },
    {
      path: "/posts/:postId/purchase",
      name: "purchase",
      component: PurchaseForm,
      beforeEnter: (to, from, next) => {
        if (store.state.isAccessAllowed){
          next();
        } else{
          alert("구매 버튼을 눌러야만 접근 가능한 페이지입니다.");
          next('/');
        }
      }
    },
    {
      path: "/posts/:postId/orders",
      name: "orders",
      component: PresentationView
    },
    {
      path: "/postedit",
      name: "postedit",
      component: PostEditForm,
    },
    {
      path: "/four-t-pay",
      name: "four-t-pay",
      component: FourTPay,
    },
    {
      path: "/deposit",
      name: "deposit",
      component: Deposit,
    },
    {
      path: "/withdraw",
      name: "withdraw",
      component: Withdraw,
    },
    {
      path: "/wishlist",
      name: "wishlist",
      component: WishListView,
    },
    {
      path: "/mysales",
      name: "mysales",
      component: MySalesView,
    },
    {
      path: "/posts/search",
      name: "search",
      component: SearchResults,
    },
    {
      path: "/othersales/:memberId",
      name: "othersales",
      component: OtherSalesView,
    },
    {
      path: "/review/:memberId",
      name: "review",
      component: Review,
    },
    {
      path: "/PurchaseHistory",
      name: "PurchaseHistory",
      component: PurchaseHistory,
    },
    {
      path: "/posts/:postId/reviews",
      name: "CreateReviews",
      component: CreateReview
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (from.path.startsWith('/posts/') && from.name === 'purchase') {
    store.commit('denyAccess');
  }
  if (to.path === '/posts/search' && !to.query.keyword) {
    next({ path: '/' }); // 메인 페이지로 리디렉션
  } else {
    next(); // 그 외의 경우 정상적으로 라우팅 진행
  }
});

export default router;
