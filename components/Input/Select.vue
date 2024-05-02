<template lang="pug">
el-form-item(:error='errorMessage' :label="label"  )
    el-select(size="large"   v-model="inputValue" filterable :reserve-keyword="false"  :multiple="isMultiple"  :disabled="disabled" :placeholder="placeholder ? placeholder :  $t('choose') + label "  )
        el-option(
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value")
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

  options: {
    type: Array,
    default: [],
    required: true,
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
  isMultiple: {
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
  initialValue: props.isMultiple ? [] : props.value,
});

if (props.value) {
  inputValue.value = props.value;
}
</script>

<style lang="scss" scoped>
/* Firefox */
</style>
