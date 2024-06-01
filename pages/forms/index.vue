<template lang="pug">
div
  Header
    InputSwitch( name="switch" active-text="Open" inactive-text="Close" :inside="true" )
  el-form.pb-28(  autocomplete="off"   @submit.prevent='onSubmit'   ref="myForm" label-position="top"  :validationSchema="formSchema" )
          
             
          .formItems(class="grid grid-cols-1 md:grid-cols-2   gap-3")
                  InputUploadImage(:label="$t('avatar')"  name="avatar" class="col-span-1 md:col-span-2" :note="t('maxFileSize20mg')"   ) 
                  InputUploadFiles(:label="$t('listFiles')"  name="listFiles" class="col-span-1 md:col-span-2" type="video"   )                 
                  InputText(:label="$t('name')"  name="name" )
                  InputText(:label="$t('address')"  name="address" )
                  InputSelect(:label="$t('country')"  name="country" :options="countryOptions" @loadMore="loadMore" )
                  InputSelect(:label="$t('city')"  name="city" :options="cityOptions" :isMultiple='true' )
                  InputEditor(:label="$t('about')"  name="about" class="md:col-span-2"  )
                  InputPhone( @validphone="validatecode" :label="$t('phone')"  name="phone" mode="international")
                  InputText(:label="$t('password')"  name="password" :type="'password'" )
                  InputList(name="resource" :label="$t('resource')" class="md:col-span-2" @getData="getResourcesList"   )                 

                  InputDate(:label="$t('date')"  name="date" class="md:col-span-2"  )
                  InputUploadImageList(:label="$t('listImages')"  name="listImages" class="col-span-1 md:col-span-2" )
                  InputRadio(name="language" :label="$t('language')"  :options="languagesOptions"  @getData="getResourcesList"   )                 
          .endBar 
              .flex.justify-end.w-full
                  el-button(  size="large" round  ) {{ $t('cancel') }}
                  el-button(  size="large" round type="primary" native-type="submit" ) {{ t('submit') }}
</template>

<script lang="ts" setup>
import { ar } from "yup-locales";
import { useForm } from "vee-validate";
import * as yup from "yup";
const { locale, t } = useI18n();
if (locale.value == "ar") {
  yup.setLocale(ar);
}

const myForm = ref();
const validPhone = ref(true);
function validatecode(val: any) {
  validPhone.value = val;
}
const resourcesList = ref([]);
const getResourcesList = (val: any) => {
  resourcesList.value.push(val);
};
function loadMore() {
  // load more data from api (infinite scroll) and assign in to options
}
const formSchema = yup.object({
  name: yup.string().required().label(t("name")),
  date: yup.string().required().label(t("date")),
  password: yup.string().required().label(t("password")),
  address: yup.string().required().label(t("address")),
  avatar: yup.string().required().label(t("avatar")),
  city: yup.array().of(yup.string()).required().min(1).label(t("city")),
  country: yup.string().required().label(t("country")),
  about: yup.string().required().label(t("about")),
  listImages: yup.array().min(1).required().label(t("listImages")),
  listFiles: yup.array().min(1).required().label(t("listFiles")),
  resource: yup.string().label(t("resource")),
  language: yup.string().required().label(t("language")),
  switch: yup.boolean(),
  phone: yup
    .number()
    .transform((value: any) => (Number.isNaN(value) ? null : value))
    .nullable()
    .required()
    .label(t("phone"))
    .test("Phone number", t("invalidPhone"), function (value: any) {
      return validPhone.value ? true : false;
    }),
});

const cityOptions = [
  { label: "Cairo", value: "Cairo" },
  { label: "Alexandria", value: "Alexandria" },
  { label: "Giza", value: "Giza" },
  { label: "Sharm El Sheikh", value: "Sharm El Sheikh" },
];
const countryOptions = [
  { label: "Saudi Arabia", value: "Saudi Arabia" },
  { label: "United Arab Emirates", value: "United Arab Emirates" },
  { label: "Kuwait", value: "Kuwait" },
  { label: "Bahrain", value: "Bahrain" },
];
const languagesOptions = [
  { label: t("english"), value: "ENGLISH" },
  { label: t("arabic"), value: "ARABIC" },
];

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});
const onSubmit = handleSubmit((values: any, actions: any) => {
  console.log(values);
});
</script>

<style lang="scss"></style>
