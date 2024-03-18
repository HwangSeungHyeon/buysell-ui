/*
=========================================================
* Vue Material Kit 2 - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-material-kit-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const imagesPrefix =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/sections";

import imgFeatures from "@/assets/img/features.png";
import imgPagination from "@/assets/img/pagination.png";
import imgAlert from "@/assets/img/alerts.jpg";
import imgPopover from "@/assets/img/popovers.jpg";
import imgModal from "@/assets/img/modals.jpg";
import imgDropdowns from "@/assets/img/dropdowns.jpg";

export default [
  {
    heading: "등록 된 상품",
    description: "게시 된 상품을 조회 할 수 있습니다.",
    items: [
      {
        image: `${imagesPrefix}/headers.jpg`,
        title: "Page Headers",
        subtitle: "10 Examples",
        route: "page-headers",
        pro: false,
      },
      {
        image: imgFeatures,
        title: "Features",
        subtitle: "14 Examples",
        route: "page-features",
        pro: false,
      },
      {
        image: `${imagesPrefix}/navbars.jpg`,
        title: "Navbars",
        subtitle: "4 Examples",
        route: "navigation-navbars",
        pro: false,
      },
      {
        image: `${imagesPrefix}/nav-tabs.jpg`,
        title: "Nav Tabs",
        subtitle: "2 Nav Tabs",
        route: "navigation-navtabs",
        pro: false,
      },
      {
        image: imgPagination,
        title: "Pagination",
        subtitle: "3 Examples",
        route: "navigation-pagination",
        pro: false,
      },
      {
        image: `${imagesPrefix}/forms.jpg`,
        title: "Forms",
        subtitle: "3 Examples",
        route: "inputareas-forms",
        pro: false,
      },
      {
        image: `${imagesPrefix}/inputs.jpg`,
        title: "Inputs",
        subtitle: "6 Examples",
        route: "inputareas-inputs",
        pro: false,
      },
      {
        image: imgPopover,
        title: "Tooltips & Popovers",
        subtitle: "2 Examples",
        route: "ac-tooltips-popovers",
        pro: false,
      },
      {
        image: imgModal,
        title: "Modals",
        subtitle: "5 Examples",
        route: "ac-modals",
        pro: false,
      },
      {
        image: `${imagesPrefix}/buttons.jpg`,
        title: "Buttons",
        subtitle: "6 Examples",
        route: "el-buttons",
        pro: false,
      },
      {
        image: `${imagesPrefix}/avatars.jpg`,
        title: "Avatars",
        subtitle: "2 Examples",
        route: "el-avatars",
        pro: false,
      },
      {
        image: imgDropdowns,
        title: "Dropdowns",
        subtitle: "2 Examples",
        route: "el-dropdowns",
        pro: false,
      },
      {
        image: `${imagesPrefix}/switch.jpg`,
        title: "Toggles",
        subtitle: "2 Examples",
        route: "el-toggles",
        pro: false,
      },
      {
        image: `${imagesPrefix}/breadcrumbs.jpg`,
        title: "Breadcrumbs",
        subtitle: "1 Example",
        route: "el-breadcrumbs",
        pro: false,
      },
      {
        image: `${imagesPrefix}/badges.jpg`,
        title: "Badges",
        subtitle: "3 Examples",
        route: "el-badges",
        pro: false,
      },
      {
        image: `${imagesPrefix}/progress.jpg`,
        title: "Progress Bars",
        subtitle: "4 Examples",
        route: "el-progress-bars",
        pro: false,
      },
      {
        image: `${imagesPrefix}/typography.jpg`,
        title: "Typography",
        subtitle: "2 Examples",
        route: "el-typography",
        pro: false,
      },
      {
        image: imgAlert,
        title: "Alerts",
        subtitle: "4 Examples",
        route: "ac-alerts",
        pro: false,
      },
    ],
  },
];
