<script setup>
import logoDark from "@/assets/img/logo-ct-dark.png";
defineProps({
  brand: {
    type: Object,
    name: String,
    logo: String,
    route: "",
    default: () => ({
      name: "Material Kit 2",
      logo: logoDark,
      route: "/",
    }),
  },
  socials: {
    type: Array,
    icon: String,
    link: String,
    default: () => [
      {
        icon: '<i class="fab fa-facebook text-lg opacity-8"></i>',
        link: "https://www.facebook.com/CreativeTim/",
      },
      {
        icon: '<i class="fab fa-twitter text-lg opacity-8"></i>',
        link: "https://twitter.com/creativetim",
      },
      {
        icon: '<i class="fab fa-dribbble text-lg opacity-8"></i>',
        link: "https://dribbble.com/creativetim",
      },
      {
        icon: '<i class="fab fa-github text-lg opacity-8"></i>',
        link: "https://github.com/creativetimofficial",
      },
      {
        icon: '<i class="fab fa-youtube text-lg opacity-8"></i>',
        link: "https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w",
      },
    ],
  },
  menus: {
    type: Array,
    name: String,
    items: {
      type: Array,
      name: String,
      href: String,
    },
    default: () => [
      {
        name: "company",
        items: [
          {
            name: "about us",
            href: "https://www.creative-tim.com/presentation",
          },
          {
            name: "freebies",
            href: "https://www.creative-tim.com/templates/free",
          },
          {
            name: "premium tools",
            href: "https://www.creative-tim.com/templates/premium",
          },
          { name: "blog", href: "https://www.creative-tim.com/blog" },
        ],
      },
      {
        name: "resources",
        items: [
          { name: "illustrations", href: "https://iradesign.io/" },
          {
            name: "bits & snippets",
            href: "https://www.creative-tim.com/bits",
          },
          {
            name: "affiliate program",
            href: "https://www.creative-tim.com/affiliates/new",
          },
        ],
      },
      {
        name: "help & support",
        items: [
          {
            name: "contact us",
            href: "https://www.creative-tim.com/contact-us",
          },
          {
            name: "knowledge center",
            href: "https://www.creative-tim.com/knowledge-center",
          },
          {
            name: "custom development",
            href: "https://services.creative-tim.com/",
          },
          {
            name: "sponsorships",
            href: "https://www.creative-tim.com/sponsorships",
          },
        ],
      },
      {
        name: "legal",
        items: [
          {
            name: "terms & conditions",
            href: "https://www.creative-tim.com/terms",
          },
          {
            name: "privacy policy",
            href: "https://www.creative-tim.com/privacy",
          },
          {
            name: "licenses (EULA)",
            href: "https://www.creative-tim.com/license",
          },
        ],
      },
    ],
  },
});
</script>
<template>
  <footer class="footer mt-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="text-center">
            <p class="text-dark text-sm font-weight-normal">
              All rights reserved. Copyright ©
              {{ new Date().getFullYear() }}
              BuySell by
              <a href="https://github.com/HwangSeungHyeon/buysell" target="_blank"
                >40(Four-T)</a
              >.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
