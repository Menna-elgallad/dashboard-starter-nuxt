<template lang="pug">
el-form(    @submit.prevent='onSubmit'   ref="myForm" label-position="top"  :validationSchema="formSchema" )
        .formItems(class="grid grid-cols-1  xl:grid-cols-2 gap-3")
                InputUploadImageList(label="List Images"  name="listImages")
                InputText(:label="$t('name')" placeholder="Name" name="name" class="xl:col-span-2 col-span-1" value="Amer")
                InputText(:label="$t('address')" placeholder="Address" name="address" value="cairo")
                InputSelect(:label="$t('phone')" placeholder="City" name="city")
                InputPhone(:padding="0.313" @validphone="validatecode" :label="$t('phone')" placeholder="enter Your Phone Number" name="phone" mode="international")
                InputUploadImage(label="avatar"  name="avatar") 
        AppButton(title="Create" type="submit") 
</template>

<script lang="ts" setup>
import { ar } from "yup-locales";
import { useForm } from "vee-validate";
import * as yup from "yup";
const { locale } = useI18n();
if (locale.value == "ar") {
  yup.setLocale(ar);
}
const myForm = ref();

const validPhone = ref(true);
function validatecode(val: any) {
  validPhone.value = val;
}

const formSchema = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  avatar: yup.string().required().label("Avatar"),
  city: yup.string().required(),
  listImages: yup.array().min(1).required(),
  phone: yup
    .number()
    .transform((value: any) => (Number.isNaN(value) ? null : value))
    .nullable()
    .required()
    .label("phone Number")
    .test("Phone number", `invalid Phone`, function (value: any) {
      return validPhone.value ? true : false;
    }),
});

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});
const onSubmit = handleSubmit((values: any, actions: any) => {
  console.log(values);
});
</script>

<style lang="scss"></style>
