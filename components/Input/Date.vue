<template lang="pug">
el-form-item(:label="label" :error='errorMessage' )
    el-date-picker( class="!w-full" size="large"  type="date"  :placeholder='placeholder ? placeholder : $t("enter") + label' v-model='inputValue' :disabled="disabled" :name="name")
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
const props = defineProps({
  type: {
    type: String,
    default: "text",
    required: false,
  },
  name: {
    type: String,
    default: "",
    required: false,
  },
  value: {
    type: String,
    default: "",
    required: false,
  },

  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
});
// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(props.name, undefined, {
  initialValue: props.value,
});

if (props.value) {
  inputValue.value = props.value;
}
</script>

<style lang="scss" scoped>
/* Firefox */
</style>
