<template lang="pug">
el-form-item(:label="label"  class="xl:col-span-2 col-span-1"  :error='errorMessage')
  vue-tel-input.form-control( :disabled="disabled" v-model="phoneNumber"  :value="inputValue" :inputOptions="{type : 'tel', placeholder: placeholder}"  :dropdownOptions="{showSearchBox : true , showFlags:true , showDialCodeInSelection: true , showDialCodeInList: true }"   @validate="validatecode"   :validCharactersOnly="true"  placeholder="12 123 45 67"  mode="international"  @input="handleChange" @blur="handleBlur"  :class="{'is-invalid': errorMessage, valid: meta.valid , 'p-invali-input': errorMessage  }"  defaultCountry="EG")
  
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { object } from "yup";
const phoneNumber = ref();
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  mask: {
    type: String,
    default: "",
  },
  labelStyle: {
    type: Object,
    default: {},
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  padding: {
    type: Number,
    default: 0.5,
  },
});
const emit = defineEmits(["validphone"]);
const name = toRef(props, "name");
const validphone = ref(true);
const errorPhone = ref("");

const validPhone = ref(true);

function validatecode(event: any, submit: any) {
  if (event) {
    console.log(event, submit);
    validPhone.value = event.valid;
    emit("validphone", validPhone.value);
  }
}

const tels = ref({
  placeholder: "phonePlaceholder",
});
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});

phoneNumber.value = inputValue.value;
</script>

<style lang="scss">
</style>
