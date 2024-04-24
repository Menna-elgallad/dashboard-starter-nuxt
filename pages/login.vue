<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
import { useMain } from "~/stores/common";
const mainStore = useMain();
definePageMeta({
  layout: false,
});
useHead({
  title: "Admin | Login",
});
const router = useRouter();
const route = useRoute();
const email = ref("");
const password = ref("");
const checked = ref(true);
const success = ref<boolean | undefined>(true);
const loading = ref(true);
const token = ref();

const ruleFormRef = ref<FormInstance>();

const checkMail = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the Email"));
  } else {
    callback();
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  pass: "",
  mail: "",
});
const errormsg = ref("");
const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: "blur" }],
  mail: [{ validator: checkMail, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid: any) => {
    if (valid) {
      loading.value = false;
      errormsg.value = "";
      try {
        const { data } = await useAsyncGql("loginBoard", {
          input: {
            email: ruleForm.mail,
            password: ruleForm.pass,
            device: "DESKTOP",
          },
        });

        success.value = data.value?.emailAndPasswordLoginBoard.success;

        if (success.value) {
          token.value = data.value?.emailAndPasswordLoginBoard.data?.token;
          mainStore.$patch({
            permissions:
              data.value.emailAndPasswordLoginBoard.data.securityGroup
                .permissions,
          });
          if (token.value) {
            authStore.setData(token.value);
            const link = location.href;
            location.replace(link.substring(0, link.lastIndexOf("/")));
          }
        } else {
          errormsg.value = "Email or Passowrd incorrect";
        }
        loading.value = true;
      } catch (error) {
        loading.value = true;
      }
    } else {
      loading.value = true;
      return false;
    }
  });
};
</script>

<template lang="pug">
div(class="w-[100vw] h-[100vh]") 
   
    .form(class="  lg:w-1/3  m-auto flex flex-col  justify-between ")
        .logo.flex.items-center.gap-2.ml-5.mt-5
                        img(class="w-[80px]" src="/images/Logo.png")   
                        h1.text-2xl.font-semibold.p-main Admin Panel   
        .form-sec(class="  mt-[20%] text-center" ) 
          .text.mb-4
              h1.font-semibold.text-2xl Welcome to Baianat Admin Panel!
              p.mt-1.text-gray-600 Welcome to Admin Panel, please enter your details.
        el-form.demo-ruleForm(ref='ruleFormRef' id="form"  @submit.prevent="submitForm(ruleFormRef)" label-position="top" :model='ruleForm' status-icon='' :rules='rules' label-width='120px ' )
            el-form-item(label='Email' prop='mail')
              el-input(size="large" v-model='ruleForm.mail'  autocomplete='off')
            
            el-form-item(label='Password' prop='pass' )
              el-input(size="large" v-model='ruleForm.pass' :show-password="true" type='password' autocomplete='off')
            small.mt-2(:class="{'error-msg' : errormsg}" class=" opacity-0") {{errormsg}}

            el-form-item.mt-2
              AppButton.mt-3( :icon="!loading ? 'eos-icons:three-dots-loading' : null" :title="loading ? 'Login' : '' " @click='submitForm(ruleFormRef)' :selected="loading" type="submit" class="w-full")

        .footer.mb-3.ml-3.text-gray-500.text-sm 
          //- a( class="flex align-items-center"
          //-     href="https://www.baianat.com/"
          //-     target="_blank")
    
          //-   span 
          //-         span ©2023 Made With ♡ By 
          //-         span Baianat
</template>

<style scoped lang="scss">
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
.input-holder {
  position: relative;
  div {
    width: 100%;
  }
  i {
    font-size: 1.3rem !important;
    position: absolute;
    left: 1rem;
    top: 1rem;
  }
}
.gredient {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 28%,
    rgba(206, 240, 242, 1) 100%
  );
}
@media (max-width: 920px) {
  .wallPaper {
    display: none;
  }
  .form {
    width: 100%;
    .form-sec {
      padding: 50px;
    }
  }
}
</style>
