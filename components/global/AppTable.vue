<template lang="pug">
.blogs.content  
    
    .topBar.flex.items-center.flex-wrap.gap-2(class="sm:justify-between justify-center")
        .input(class=" xl:w-1/4 lg:w-1/2 w-full min-w-[350px]")
            el-input(size="large" 
                v-model="search"
                :placeholder="$t('search')"
                :prefix-icon="Search"
                @keyup="searchTimeOut"
            )
    .containerr.mt-4      
        el-table(:data='data' style='width:100%'  @current-change="handleCurrentChange"   @sort-change="triggerSort"   :row-class-name="tableRowClassName" )
            el-table-column( v-for="column in columns"  :prop="column.prop"  :key="column.prop"   min-width="250"  )
                template(#header)
                    div.flex.items-center
                        span.ml-2.mr-2 {{ column.label }}
                        .sort.cursor-pointer
                            Icon(name="solar:arrow-up-outline" class="  text-main-gray text-sm rtl:mr-[-5px] ml-[-5px] " :class="{'text-primary' : sortHandler[column.prop]==='ASC' }"    v-if="column.sortable"  @click="sortData(column.prop , 'ASC')" )
                            Icon(name="solar:arrow-down-outline" class="text-main-gray text-sm" :class="{'text-primary' : sortHandler[column.prop]==='DESC' }" v-if="column.sortable"  @click="sortData(column.prop , 'DESC')"   )
                        
                template(#default="scope")
                    .flex.gap-2.items-center 
                        div(v-if="column?.component==='AvatarText'" )
                            TableAvatarText(:image="scope.row[column?.prop]?.image" :title="scope.row[column?.prop]?.title" :text="scope.row[column?.prop]?.text" )
                        div( v-else-if="column?.component==='Text'" )
                             TableText(:value="scope.row[column?.prop]" :type="column?.type" )
                        div( v-else-if="column?.component==='Label'" )
                             TableLabel(:value="scope.row[column?.prop]" :type="column?.type"  )

                        // p {{ scope.row[column.prop] }}
                        // p {{ column.component }}
                        //- .profilepic 
                        //-     Avatar(  @showFile='showfile' :table="true" src="images/avatar.svg" :key="scope.row.id"  :small="true")
                        //- .text.flex-1
                        //-     p {{ getName(scope.row)}}
                        //-     p.text-main-gray.text-xs.mt-1 {{ scope.row.profileCode}}
            
            //- el-table-column(prop='email' label='Email' min-width="200" )
           
        //-     el-table-column(label="Actions" min-width="150"  )
        //-         template(#default="scope")
        //-             .flex.items-center(@click.stop) 
        //-                 el-tooltip(class="box-item" effect="dark" content="Copy" placement="top-start")
        //-                     button.toggle-icon: Icon.text-md(name="ion:copy-outline" @click="copyText(scope.row.profileCode)" )
        //-                 //- el-tooltip(class="box-item" effect="dark" content="Show details" placement="top-start")
        //-                 //-     NuxtLink(:to="'/clients/all-clients/clientProfile_'+scope.row.id").toggle-icon: Icon.text-md(name="fluent:eye-24-regular" )
        //-                 el-tooltip(class="box-item" effect="dark" content="More" placement="top-start" v-if="!scope.row.isDeleted")
        //-                     el-dropdown(trigger="click")
        //-                         span.el-dropdown-link
        //-                                 .toggle-icon: Icon.text-md(name="bx:dots-vertical-rounded" )
        //-                         template(#dropdown='')
        //-                             el-dropdown-menu
        //-                                 //- NuxtLink(:to="`/clients/all-clients/clientProfile_${scope.row.id}/edit`"): el-dropdown-item.cursor-pointer: | Edit
        //-                                 el-dropdown-item.cursor-pointer(@click="openDelete(scope.row.id ,scope.row.profileCode , scope.row.enFullName )") Delete
        //-                                 el-dropdown-item.cursor-pointer(@click="openBan(scope.row)") {{ !scope.row.isBlocked? 'Ban' : 'Unban'}} Client

     
        .pagination.flex.items-center.flex-wrap.gap-2(class="sm:justify-between justify-center")
            
            span.text-xs.text-main-gray.font-medium  {{`${t("showing")} ${currentPage===1 ? currentPage : ((currentPage-1)*limit)+1   }- ${currentPage*limit <= pageInfo?.totalCount ? currentPage*limit : pageInfo?.totalCount   } from  ${pageInfo?.totalCount ? pageInfo?.totalCount : 0 }`  }}
            el-pagination( style="direction : ltr"  :pager-count="4"  :page-count="pageInfo?.totalPages" v-model:current-page='currentPage' :page-size='limit'  layout=' prev, pager, next' :total='pageInfo?.totalCount' @current-change="handleCurrentChange" )

</template>

<script setup lang="ts">
import { Calendar, Search } from "@element-plus/icons-vue";
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
});

const currentPage = ref(1);
const limit = 10;

const emit = defineEmits(["sort", "search"]);
// sort
const sortHandler = reactive<any>({});
function sortData(prop: string, order: string) {
  const sortBy = {
    prop: prop,
    order: order,
  };
  if (sortHandler[prop] === order) {
    sortHandler[prop] = "";
  } else {
    sortHandler[prop] = order;
  }
  emit("sort", sortHandler);
}
// search
const search = ref();
let timer: any;
function searchTimeOut() {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    emit("search", search.value);
  }, 500);
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
