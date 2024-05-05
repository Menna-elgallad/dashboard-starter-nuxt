<template lang="pug">
div 
    .topBar.flex.items-center.flex-wrap.gap-2(class="sm:justify-between justify-center")
        .input(class=" xl:w-1/4 lg:w-1/2 w-full min-w-[350px]")
            el-input(size="large" 
                v-model="search"
                :placeholder="$t('search')"
                :prefix-icon="Search"
                @input="searchTimeOut"
            )
    .containerr.mt-4      
        el-table(:data='data' style='width:100%'  @current-change="(val)=> $emit('handleRowClick' , val)"   @sort-change="handleSortChange" @filter-change="handleFilterChange"  :row-class-name="tableRowClassName" )
            el-table-column( min-width="250" :show-overflow-tooltip="true"   v-for="column in columns"  :filtered-value="filters[column?.prop]"  :filters="column.filters"  :prop="column.prop" :label="column.label"  :column-key="column.prop" :sortable="column?.sortable ? 'custom' : undefined"    :class-name="sortOptions?.find(option=> option.value ===sort?.value && option.prop===column.prop )?.order || 'menna'"   )
               
                template(#default="scope")
                    .flex.gap-2.items-center 
                        div(v-if="column?.component==='AvatarText'" )
                            TableAvatarText(:image="scope.row[column?.prop]?.image" :title="scope.row[column?.prop]?.title" :text="scope.row[column?.prop]?.text"  @showFile='showfile')
                        div( v-else-if="column?.component==='Text'" )
                             TableText(:value="scope.row[column?.prop]" :type="column?.type" )
                        div( v-else-if="column?.component==='Label'" )
                             TableLabel(:value="scope.row[column?.prop]" :type="column?.type"  )
              
            el-table-column(:label="$t('actions')" min-width="150")
              template(#default="scope")
                  slot(:data="scope.row"  ) 

        el-dialog(v-model='fileShow'   class=" !bg-transparent  !shadow-none xl:!w-1/3 lg:!w-1/3 sm:!w-[90%] !w-full " align-center='' )
                LazyImg.m-auto(:src="srcOverlay" :key="srcOverlay" ) 
     
        .pagination.flex.items-center.flex-wrap.gap-2(class=" sm:justify-between justify-center")
            
            span.text-xs.text-main-gray.font-medium  {{`${t("showing")} ${currentPage===1 ? currentPage : ((currentPage-1)*limit)+1   } - ${currentPage*limit <= pageInfo?.totalCount ? currentPage*limit : pageInfo?.totalCount   } ${t('from')}  ${pageInfo?.totalCount ? pageInfo?.totalCount : 0 }`  }}
            el-pagination( background style="direction:ltr"  :pager-count="4"  :page-count="pageInfo?.totalPages" v-model:current-page='currentPage' :page-size='limit'  layout=' prev, pager, next' :total='pageInfo?.totalCount' )

</template>

<script setup lang="ts">
import { Calendar, Search } from "@element-plus/icons-vue";
const { t, locale } = useI18n();

import useQuery from "~/composables/queryParams";
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  pageInfo: {
    type: Object,
    required: false,
    default: { totalCount: 20, totalPages: 2 },
  },
  sortOptions: {
    type: Object,
    required: false,
  },
});

const fileShow = ref(false);
const srcOverlay = ref("");

const limit = 10;

const currentPage = ref<number>(1);
const sort = ref<string>("");
const filters = ref<any>({});
const search = ref<string>("");

// Use the useQuery composable

const {
  currentPage: currentPageRef,
  sort: sortRef,
  filters: filtersRef,
  search: searchRef,
} = useQuery(currentPage, sort, filters, search);

function showfile(value: any) {
  fileShow.value = true;
  srcOverlay.value = value;
}

// sort

function handleSortChange({ prop, order }: { prop: string; order: string }) {
  sort.value = props.sortOptions?.find(
    (item: any) => item.prop === prop && item.order === order
  );
}

// search
let timer: any;
function searchTimeOut(value: string) {}

// filter

function handleFilterChange(value: any) {
  filters.value = value;
}
</script>

<style lang="scss">
.el-table {
  .blocked-row {
    background-color: rgba(247, 96, 129, 0.154);
    opacity: 60%;
  }
  .deleted-row {
    opacity: 40%;
  }
}
</style>
