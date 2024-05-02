<template lang="pug">
section
    #allTheNav 
      .nav
        Menu
    #main(:class="[fullNav && !mobile  ? 'marginedStart' : (mobile ? 'notMargined' :'collapseMargin' )] ")
      nav.navbar(  :class="{'marginedStart': fullNav && !mobile,'collapseMargin': !mobile && !fullNav,'notMargined': mobile && !fullNav,'navbar-scroll': showNavbar}" class="!pt-4 z-20 navbar") 
        .flex.items-center.justify-between(:class="{'rtl:!pr-[32px] !pl-[32px] !pr-[120px] rtl:!pl-[120px] ' : !mobile , '!px-[20px] '  : mobile}")
          .headings
            button.toggle-icon(@click="openNav" :class="{'margined' : !fullNav}"): Icon.text-sm(name="ph:list-bold")
          .tools.flex.gap-3.items-center
            .lang-switcher  
                a(:href="switchLocalePath(locale==='ar' ? 'en' :'ar')"): AppButton( :title="locale==='ar' ? 'English' : 'العربية' " outlined="true"  )
            el-dropdown
                  .el-dropdown-link
                      div.flex.gap-2.items-center 
                        Avatar(src="/images/avatar.svg" small)
                        .text 
                            p.text-xs.font-medium Omar Abdulazeez
                            p.text-xs.font-medium.opacity-50 Super admin
                        Icon.text-xl(name="iconamoon:arrow-down-2")
                  template(#dropdown='')
                    el-dropdown-menu
                        el-dropdown-item(@click="logout")
                            p.text-xs Logout
                        el-dropdown-item
                          p.text-xs(@click="router.push('/change-password')") Change password
        .border-bottom.mt-4
      .slot-content(class="!mt-24" :class="{'rtl:!pr-[32px] !pl-[32px] !pr-[120px] rtl:!pl-[120px]' : !mobile, '!px-[20px] '  : mobile}")
          .title.font-bold.text-xl.mb-1 {{  route.path.split("/").filter((n) => n&& n !== 'ar')[0] ? $t(formatTextWithyphen(route.path.split("/").filter((n) => n && n !== 'ar' )[0]).toLowerCase()) : $t('home')  }}
          .breadCurmb.mb-4.flex.gap-1
              Breadcramp(:key="breadkey")
          slot
</template>

<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { useAuthStore } from "~/stores/auth";
const { localeProperties, locale, setLocale, tm, rt } = useI18n();

const switchLocalePath = useSwitchLocalePath();
const authStore = useAuthStore();
import { storeToRefs } from "pinia";
import { useMain } from "~/stores/common";
const mainData = useMain();
const { fullNav, mobile, hideNav } = storeToRefs(mainData);
const { width, height } = useWindowSize();
const router = useRouter();
const breadkey = ref(0);
const route = useRoute();
await checkAuthority();

useHead({
  htmlAttrs: {
    dir: localeProperties.value.dir,
  },
});

watch(
  () => route.path,
  () => {
    breadkey.value++;
  }
);

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

async function checkAuthority() {
  console.log(authStore.token);
  if (authStore.token) {
    useGqlToken(authStore.token);
    const { data } = await useAsyncGql("GetMe");
    if (data.value.me.success === false) {
      router.push("/login");
      return;
    }
    mainData.$patch({
      permissions: data.value.me.data.securityGroup.permissions,
    });
  } else if (!authStore.token) {
    router.push("/login");
    return;
  }
}

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
  localStorage.removeItem("acess_token");
  router.push("/login");
}

checkwidth();

watch(width, () => {
  checkwidth();
});
</script>

<style lang="scss" scoped>
.dropdown-menu2 {
  background-color: white;
  border-radius: 9px;
  padding: 12px 16px;
  z-index: 1000;
  box-shadow: 0 0 8px 2px #cfcfcf4a;
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
