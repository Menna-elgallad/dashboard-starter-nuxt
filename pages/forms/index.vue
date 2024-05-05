<template lang="pug">
el-form.pb-28(  autocomplete="off"   @submit.prevent='onSubmit'   ref="myForm" label-position="top"  :validationSchema="formSchema" )
        .flex.justify-end 
            InputSwitch( name="switch" active-text="Open" inactive-text="Close" :inside="true" )
        .formItems(class="grid grid-cols-1 md:grid-cols-2   gap-3")
                InputUploadImage(:label="$t('avatar')"  name="avatar" class="col-span-1 md:col-span-2"   ) 
                InputText(:label="$t('name')"  name="name" )
                InputText(:label="$t('address')"  name="address" )
                InputSelect(:label="$t('country')"  name="country" :options="countryOptions")
                InputPhone( @validphone="validatecode" :label="$t('phone')"  name="phone" mode="international")
                InputText(:label="$t('password')"  name="password" :type="'password'" )
                InputSelect(:label="$t('city')"  name="city" :options="cityOptions" :isMultiple='true' )
                InputDate(:label="$t('date')"  name="date"   )
                InputUploadImageList(:label="$t('listImages')"  name="listImages" class="col-span-1 md:col-span-2" )
        .endBar 
            .flex.justify-end.gap-3
                el-button( size="large" round  ) {{ $t('cancel') }}
                el-button( size="large" round type="primary" ) {{ t('submit') }}
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

const formSchema = yup.object({
  name: yup.string().required().label(t("name")),
  date: yup.string().required().label(t("date")),
  password: yup.string().required().label(t("password")),
  address: yup.string().required().label(t("address")),
  avatar: yup.string().required().label(t("avatar")),
  city: yup.array().of(yup.string()).required().min(1).label(t("city")),
  country: yup.string().required().label(t("country")),

  listImages: yup.array().min(1).required().label(t("listImages")),
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

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});
const onSubmit = handleSubmit((values: any, actions: any) => {
  console.log(values);
});
</script>

<style lang="scss"></style>
