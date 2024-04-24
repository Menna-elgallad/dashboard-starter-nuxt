import { defineStore, skipHydrate } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ElNotification } from "element-plus";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: useLocalStorage("access_token", ""),
    loadingeChangePassword: false,
  }),

  hydrate(state, initialState) {
    state.token = useLocalStorage("access_token", "");
  },

  actions: {
    setData(token: "") {
      useLocalStorage("access_token", token);
      this.token = token;
    },
    async changePassword(input: any) {
      const authStore = useAuthStore();

      this.loadingeChangePassword = true;

      const { data } = await useAsyncGql("changeAdminPassword", {
        input: {
          oldPassword: input.oldPassword,
          newPassword: input.password,
          confirmPassword: input.confirmPassword,
        },
      });

      this.loadingeChangePassword = false;
      authStore.setData(data.value.changeAdminPassword.data?.token);
      useGqlToken(authStore.token);
      console.log(authStore.token);
      if (data.value.changeAdminPassword.success) {
        ElNotification({
          type: "success",
          title: "Success",
          message: "Password has been changed successfully",
        });
      } else {
        ElNotification({
          title: "Error",
          type: "error",
          message: formatTextWithUnderscore(
            data.value.changeAdminPassword.message
          ),
        });
      }
      return {
        success: data.value.changeAdminPassword.success,
        message: data.value.changeAdminPassword.message,
      };
    },
  },
});
