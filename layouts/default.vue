<template lang="pug">
section
    #allTheNav 
      .nav
        Menu
    #main(:class="[fullNav && !mobile  ? 'marginedStart' : (mobile ? 'notMargined' :'collapseMargin' )] ")
      nav.navbar(  :class="{'marginedStart': fullNav && !mobile,'collapseMargin': !mobile && !fullNav,'notMargined': mobile && !fullNav,'navbar-scroll': showNavbar}" class="!pt-4 z-20 ") 
        .flex.items-center.justify-between(:class="{'rtl:!pr-[32px] !pl-[32px] !pr-[120px] rtl:!pl-[120px] ' : !mobile , '!px-[20px] '  : mobile}")
          .headings
            button.toggle-icon(@click="openNav" :class="{'margined' : !fullNav}"): Icon.text-sm(name="ph:list-bold")
          .tools.flex.gap-3.items-center
            .lang-switcher  
              a(:href="switchLocalePath(locale==='ar' ? 'en' :'ar')")
                     el-button(  round  ) 
                        Icon.mx-1(name="ph:globe-simple")
                        | {{ locale==='ar' ? 'English' : 'العربية'  }}
            el-dropdown(class="outline-0")
                  div.flex.gap-2.items-center.outline-0.border-0 
                        Avatar(:src="user?.profilePicture" :text="user?.enFullName" small table )
                        .text 
                            p.text-sm.font-medium.mb-2 {{user?.enFullName}}
                            p.text-xs.font-medium.opacity-50 {{ user?.email }}
                        Icon.text-xl(name="iconamoon:arrow-down-2")
                  template(#dropdown='')
                    el-dropdown-menu
                        NuxtLink(:to="localePath('/profile')"): el-dropdown-item
                            p.text-xs {{$t("profile")}}
                        el-dropdown-item(@click="logout")
                            p.text-xs {{$t("logout")}}
                   
        .mt-4
      .slot-content(class="!mt-24" :class="{'rtl:!pr-[32px] !pl-[32px] !pr-[120px] rtl:!pl-[120px]' : !mobile, '!px-[20px] '  : mobile}")
          slot
</template>
<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { useAuthStore } from "~/stores/auth";
const { locale, tm, rt, localeProperties } = useI18n();
const auth = useAuthStore();
const { user } = storeToRefs(auth);
auth.setLocale(locale.value);
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
import { storeToRefs } from "pinia";
import { useMain } from "~/stores/common";
const mainData = useMain();
const { fullNav, mobile, hideNav } = storeToRefs(mainData);
const { width, height } = useWindowSize();
const router = useRouter();

const route = useRoute();
// await auth.checkAuthority();

useHead({
  htmlAttrs: {
    dir: localeProperties.value.dir,
  },
});

const showNavbar = ref(false);
const showDropdown = ref(false);
function toggleDropdown(val: boolean) {
  showDropdown.value = val;
}
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  showNavbar.value = window.scrollY > 10;
};

if (process.client) {
  window.addEventListener("click", () => {
    showDropdown.value = false;
  });
}

const mykey = ref("1");

function checkwidth() {
  if (width.value < 990) {
    mobile.value = true;
  } else {
    mobile.value = false;
  }
}
function openNav() {
  fullNav.value = !fullNav.value;
  if (mobile.value) {
    hideNav.value = !hideNav.value;
  }
}
function logout() {
  localStorage.removeItem("access_token");
  router.push(localePath("/auth/login"));
}

checkwidth();

watch(width, () => {
  checkwidth();
});
</script>

<style lang="scss" scoped>
.website-body {
  .slot-content {
    padding: 0 !important;
    margin-top: 4rem !important;
  }
}
#main {
  height: fit-content;
  margin-top: 50px;
  transition: all 0.2s ease-in;
}
.toggleMenu {
  position: fixed;
  z-index: 3;

  bottom: 38px;
  left: 260px;
  transition: all 0.2s ease-in;
  &.margined {
    left: 0px;
  }
}
#allTheNav {
  position: relative;
  left: 0;
  .nav {
    top: 0;
    background-color: white;
    z-index: 100;
    left: 0;
    position: fixed;
    padding-bottom: 3rem;
  }
}
.navbar {
  position: fixed;
  width: 100%;
  transition: all 0.2s ease-in;
  background-color: white;
  top: 0;
  left: 0;
  border-bottom: 1px solid $border;
}

.top {
  .logo {
    position: absolute;
    height: 70px;
    padding: 2rem;
    z-index: 1000;
    border-radius: 0px 0 50px 0px;
    left: 0;
    // width: calc(100% + 5px);
    top: 0;
    width: 100%;
  }
}
.myicon {
  color: white;
  background-color: $primary;
  padding: 0.5rem;
  border-radius: 50%;
}
.marginedStart {
  margin-left: 260px;
  width: calc(100% - 260px);
}
.collapseMargin {
  margin-left: 80px;
  width: calc(100% - 80px) !important;
}
.notMargined {
  margin-left: 0px;
  width: 100% !important;
}
.background-overlay {
  &::before {
    content: "";
    background-color: rgba(0, 0, 0, 0.411);
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
