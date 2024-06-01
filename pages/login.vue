<template lang="pug">
div(class="w-[100vw] h-[100vh] px-5 flex  items-center justify-center") 

    .form(class="  max-w-[600px]  m-auto flex-1 flex flex-col ")
        .logo.flex.items-center.gap-2.ml-5.mt-5
                        img(class="w-[80px]" src="/images/Logo.png")   
                        h1.text-2xl.font-semibold.p-main Admin Panel   
        .form-sec(class="  mt-8  text-center" ) 
          .text.mb-4.m-auto
              h1.font-semibold.text-2xl Welcome to Baianat Admin Panel!
              p.mt-1.text-gray-600 Welcome to Admin Panel, please enter your details.
        el-form( autocomplete="off"   @submit.prevent='onSubmit' ref="myForm" label-position="top" :validationSchema="formSchema")
            InputText(:label="$t('email')"  name="email" )
            InputText(:label="$t('password')"  name="password" :type="'password'" )
            p.text-xs.opacity-50  
          
            el-form-item.mt-8
              el-button(   size='large' :loading="loading" native-type="submit" type="primary"  class="w-full") Login

</template>

<script lang="ts" setup>
import { ar } from "yup-locales";
import { useForm } from "vee-validate";
import * as yup from "yup";
const { locale, t } = useI18n();
const localePath = useLocalePath();
import isEmailValidator from "validator/lib/isEmail";
if (locale.value == "ar") {
  yup.setLocale(ar);
}
import { useAuthStore } from "~/stores/auth";
const auth = useAuthStore();
import { useMain } from "~/stores/common";
const mainStore = useMain();
definePageMeta({
  title: "Admin | Login",
  layout: "empty",
});

const noSpecialChar = /^[a-zA-Z\u0621-\u064A\s]+$/;
const noArabicRegx = /^[^\u0600-\u06FF]+$/;
const formSchema = yup.object({
  email: yup
    .string()
    .email()
    .max(70)
    .required()
    .matches(noArabicRegx, t("validEmail"))
    .test(
      "is-valid",
      (message) => t("validEmail"),
      (value) =>
        value
          ? isEmailValidator(value)
          : new yup.ValidationError("Invalid value")
    )
    .label(t("email")),
  password: yup
    .string()
    .required()
    .label(t("password"))
    .matches(/^\S*$/, t("passwordValidateSpaces"))
    .matches(/^(?=.*[A-Za-z]).*$/, t("passwordValidateLetter"))
    .matches(
      /^[~`!@#$%^&*()_+=[\]\\{}|;':",.\/<>?a-zA-Z0-9-]+$/,
      t("passwordValidateEnglish")
    )
    .max(25)
    .min(8),
});

const router = useRouter();
const route = useRoute();
const loading = ref(false);

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values: any, actions: any) => {
  loading.value = true;

  await auth.loginBoard(values);
  router.push(localePath("/"));
});
</script>

<style lang="scss"></style>
