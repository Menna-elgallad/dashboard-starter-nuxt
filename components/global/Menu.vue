<template lang="pug">
div.relative

  div.background-overlay.fixed.top-0.left-0.w-screen.h-full(class='z-[100]' v-if="mobile && !hideNav" @click="hideNav = true")
  transition(:name='mobile ? "side" : "none"')
    el-menu.el-menu-vertical-demo(class='!pl-[5px] h-[100vh] card-auto ' :class="{'overflow-x-hidden' : !fullNav }"   v-if="mobile ? !hideNav : true" :collapse='mobile ? false : !fullNav' )
      .py-5.flex.items-center.gap-3(class="ltr:ml-1 rtl:mr-1 ")
        img( class="cursor-pointer !h-[65px] " src="/images/Logo.png"   @click="router.push('/')")
        p.text-sm.font-meduim Admin Panel
      //- img.py-5( class="cursor-pointer !h-[80px] !w-[71px] !max-w-[71px]" src="/images/Logo-small.svg" v-else @click="router.push('/')" )
      
      template(v-for="(navLink , index) in menu ")
          el-sub-menu(:index='`${index+1}`' v-if="navLink.submenu"  )
              template(#title='')
                div
                  i.el-icon(:class="navLink.icon")
                span {{navLink.name}}
              el-menu-items(v-for="(subLink , subIndex) in navLink.submenu")
                  el-menu-item(:index="`${index+1}-${subIndex+1}`" :class="{'disabled-link' : getDisabled(subLink.role)  }" v-if="getDisabled(subLink.role)") {{subLink.name}}
                  NuxtLink(:to="localePath(subLink.link)" v-else ): el-menu-item(:index="subLink.link"   @click="mobileNavigate(subLink.link)" :class="{'is-active' : route.fullPath.includes(subLink.link) && subLink.link!=='/' }"  ) {{subLink.name}}
          template(v-else) 
              el-menu-item(:index='`${index+1}`' :class="{'disabled-link' : getDisabled(navLink.role)  }"  v-if="navLink.link!=='/' && getDisabled(navLink.role) " )
                  el-icon 
                    Setting 
                  template(#title)  {{navLink.name}} 
              NuxtLink(:to="localePath(navLink.link)" v-else )
                el-menu-item(:index='navLink.link'   @click="mobileNavigate(navLink.link)" :class="{'is-active' : route.fullPath.includes(navLink.link) && navLink.link!=='/' }"  )
                          i.el-icon(:class="navLink.icon")
                          template(#title)  {{navLink.name}}

</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useMain } from "~/stores/common";
const { t } = useI18n();
const localePath = useLocalePath();

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const mainStore = useMain();
const { fullNav, mobile, hideNav } = storeToRefs(mainStore);
const { permissions } = storeToRefs(mainStore);
const route = useRoute();
const router = useRouter();
function mobileNavigate(link: string) {
  // router.push(localePath(link));
  if (mobile.value) {
    hideNav.value = true;
  }
}

function getDisabled(role) {
  if (permissions.value.length) {
    return !permissions.value?.includes(role);
  } else {
    return false;
  }
}

const menu = [
  {
    link: "/",
    name: t("home"),
    icon: "myicon home-icon",
    submenu: false,
  },
  {
    submenu: [
      {
        link: "/tables",
        name: t("table"),
      },
      {
        link: "/forms",
        name: t("form"),
      },
    ],
    name: t("tools"),
    icon: "myicon setting-icon",
  },
];
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 260px;
}
</style>
