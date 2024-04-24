<template lang="pug">
.filters(class="sm:w-[450px]" @click.stop)
    .actions.flex.gap-2.justify-end 
        button.text-main.text-sm(@click="restFilters") Reset
    
    .Itemfilter.mt-2
        p.text-sm.font-semibold.text-gray-600 User type
        .flex.mt-3.gap-2.flex-wrap
                LayoutAppButton(:title="option ? option : 'All'" v-for="option in filters.userType" :selected="option === selectedFilter.userType" @click="selectedFilter.userType= option" )
    .Itemfilter.mt-2
        p.text-sm.font-semibold.text-gray-600 Gender
        .flex.mt-3.gap-2.flex-wrap
                LayoutAppButton(:title="option.label ? option.label : 'All'" v-for="option in filters.gender" :selected="option.value === selectedFilter.gender" @click="selectedFilter.gender= option.value" )
  
    .Itemfilter.mt-2
        p.text-sm.font-semibold.text-gray-600 Status
        .flex.mt-3.gap-2.flex-wrap
                LayoutAppButton(:title="option ? option : 'All'" v-for="option in filters.isBlocked" :selected="option === selectedFilter.isBlocked" @click="selectedFilter.isBlocked= option" )

    .actions.mt-4.flex.gap-2.justify-end 
        LayoutAppButton(title="Cancel" @click="$emit('toggleDropdown' , false)" :selected="false")
        LayoutAppButton(title="Save" @click="$emit('filterData' , selectedFilter)" :selected="true" )


</template>

<script setup lang="ts">
import { useMain } from "~/stores/common";
const mainData = useMain();

const props = defineProps({
  filters: Object,
});
const emit = defineEmits(["filterData"]);
const filters = reactive({
  gender: [
    { label: "", value: "" },
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
    { label: "Prefer not to say", value: "NOANSWER" },
  ],
  isBlocked: ["", "Active", "Banned", "Deleted"],
  userType: ["", "Real name", "Alias name"],
});
const selectedFilter = props.filters
  ? props.filters
  : reactive({
      gender: "",
      isBlocked: "",
      userType: "",
    });

function restFilters() {
  selectedFilter.gender = "";
  selectedFilter.isBlocked = "Active";
  selectedFilter.userType = "";
}
</script>

<style lang="scss" scoped></style>
