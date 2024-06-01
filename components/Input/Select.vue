<template lang="pug">
el-form-item(:error='errorMessage' :label="label" class="!mb-6")
  el-select(size="large"   v-model="inputValue" filterable :reserve-keyword="false"  :multiple="isMultiple"  :disabled="disabled" :placeholder="placeholder ? placeholder :  $t('choose') + label ")
    div(
      v-infinite-scroll="load"
      infinite-scroll-immediate
      class="w-full"
      class="{'h-[200px]' : options?.length > 10}")
      el-option(
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        )

</template>

<script lang="ts" setup>
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
  firstOption: {
    type: Boolean,
    default: false,
  },
});
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(props.name, undefined, {
  initialValue: props.isMultiple
    ? []
    : props.firstOption
    ? props.options[0].value
    : props.value,
});

watchEffect(() => {
  if (props.value) {
    inputValue.value = props.value;
  }
});

const emits = defineEmits(["loadMore"]);
const load = () => {
  emits("loadMore");
};
</script>
