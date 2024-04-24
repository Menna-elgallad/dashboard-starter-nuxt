<template lang="pug">
el-form-item(:error='errorMessage' :label="label" :class="class")
    el-select(size="large"   v-model="inputValue" filterable :reserve-keyword="false"  placeholder="Select" :class="selectClass" )
        el-option(
        v-for="item in countryoptions"
        :key="item.value"
        :label="item.label"
        :value="item.value")
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
const props = defineProps({
  type: {
    type: String,
    default: 'text',
    required: false,
  },
  name: {
    type: String,
    default: '',
    required: false,
  },
  value: {
    type: String,
    default: '',
    required: false,
  },
  class: {
    type: String,
    default: '',
    required: false,
  },
  selectClass: {
    type: String,
    default: '',
    required: false,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
});


const countryoptions = [
  { label : 'Saudi Arabia', value: 'Saudi Arabia' },
  { label : 'United Arab Emirates', value: 'United Arab Emirates' },
  { label : 'Kuwait', value: 'Kuwait' },
  { label : 'Bahrain', value: 'Bahrain' },
]
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
