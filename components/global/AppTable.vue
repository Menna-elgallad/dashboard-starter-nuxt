<template lang="pug">
.blogs.content  
    
    .topBar.flex.items-center.flex-wrap.gap-2(class="sm:justify-between justify-center")
        .input(class=" xl:w-1/4 lg:w-1/2 w-full")
            el-input(size="large" 
                v-model="search"
                placeholder="Search Clients. . ."
                :prefix-icon="Search"
                @keyup="searchTimeOut"
            )
    
    .containerr.mt-4      
        el-table(:data='data' style='width:100%'  @current-change="handleCurrentChange"      :row-class-name="tableRowClassName" )
            el-table-column( v-for="column in columns" :key="column.prop" :label="column.label"  min-width="250"  )
                template(#default="scope")
                    .flex.gap-2.items-center 
                        div(v-if="column.component==='AvatarText'" )
                            TableAvatarText(:image="scope.row[column.prop].image" :title="scope.row[column.prop].title" :text="scope.row[column.prop].text" )
                        div( v-else-if="column.component==='Text'" )
                            TableText(:value="scope.row[column.prop]" :type="column.type" )
                        div( v-else-if="column.component==='Label'" )
                            TableLabel(:value="scope.row[column.prop]" :type="column.type"  )




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

     
        //- .pagination.flex.items-center.flex-wrap.gap-2(class="sm:justify-between justify-center")
        //-     .paginat-data 
        //-         span.text-xs.text-main-gray.font-medium  {{`Showing ${currentPage===1 ? currentPage : ((currentPage-1)*limit)+1   }- ${currentPage*limit <= pageInfo?.totalCount ? currentPage*limit : pageInfo?.totalCount   } from  ${pageInfo?.totalCount ? pageInfo?.totalCount : 0 }`  }}
        //-     el-pagination( :pager-count="4"  :page-count="pageInfo?.totalPages" v-model:current-page='currentPage' :page-size='limit'  layout=' prev, pager, next' :total='pageInfo?.totalCount' )
</template>
<script setup lang="ts">
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

// import { Calendar, Search } from "@element-plus/icons-vue";
// import useQuery from "~/composables/queryParams";
// import { storeToRefs } from "pinia";
// import { useMain } from "~/stores/common";
// const mainData = useMain();
// import { useUsers } from "~/stores/users";
// const usersStore = useUsers();
// const deleteUserPopUp = ref(false);
// const deleteText = ref();
// const banDialog = ref(false);
// const blockStatus = ref();
// const { loadingusers, loadinguser } = storeToRefs(usersStore);
// const runtimeConfig = useRuntimeConfig();
// const router = useRouter();
// const id = ref();
// const showfilters = ref(false);
// const route = useRoute();
// const sortOptions = ref(["DATE_JOINED", "MOST_SESSIONS", "LEAST_SESSIONS"]);
// const users = ref();
// const currentPage = ref(1);
// const sort = ref("DATE_JOINED");
// const search = ref();
// const pageInfo = ref();

// const filterData = ref({
//   gender: "",
//   isBlocked: "Active",
//   userType: "",
// });
// const limit = ref(10);
// useQuery(currentPage, sort, filterData, search);
// useHead({
//   title: "Admin | Users",
// });
// const fileShow = ref(false);
// const returnedfile = ref("");
// function showfile(file) {
//   fileShow.value = true;
//   returnedfile.value = file;
// }
// onMounted(async () => {
//   await getData();
// });

// const tableRowClassName = ({
//   row,
//   rowIndex,
// }: {
//   row: User;
//   rowIndex: number;
// }) => {
//   if (row.isBlocked) {
//     return "blocked-row";
//   } else if (row.isDeleted) {
//     return "deleted-row";
//   } else {
//     return "";
//   }
// };

// const getFilterData = async (data: object) => {
//   filterData.value = { ...data };
//   await getData();
// };
// // function toggleDropdown(val: boolean) {
// //   val ? showfilters.value.handleOpen() : showfilters.value.handleClose();
// // }
// const openDelete = (userID: string, code: string, name: string) => {
//   id.value = userID;
//   deleteText.value = `Are you sure you want to delete user ${
//     name ? name : ""
//   } ${"#" + code + "? "}`;
//   deleteUserPopUp.value = true;
// };

// const openBan = (user) => {
//   id.value = user.id;
//   blockStatus.value = user.isBlocked;
//   banDialog.value = true;
// };

// watch(currentPage, async () => {
//   await getData();
// });

// let timer: any;
// function searchTimeOut() {
//   clearTimeout(timer);
//   timer = setTimeout(async () => {
//     await getData();
//   }, 500);
// }

// async function getData() {
//   const data = await usersStore.getUsers(
//     filterData.value,
//     search.value,
//     sort.value,
//     currentPage.value,
//     limit.value
//   );
//   //   toggleDropdown(false);
//   users.value = data.users;
//   pageInfo.value = data.pageInfo;
// }

// async function sortData(option) {
//   sort.value = option;
//   await getData();
// }
// async function banUser() {
//   // const { success, message } = await usersStore.BanUser(
//   // id.value,
//   // blockStatus.value
//   // );
//   // if (success) {
//   // banDialog.value = false;
//   // await getData();
//   // }
// }
// async function deleteUser() {
//   // const { success, message } = await usersStore.deleteUser(id.value);
//   // if (success) {
//   // deleteUserPopUp.value = false;
//   // await getData();
//   // }
// }

// const currentRow = ref();

// // const handleCurrentChange = (val: any | undefined) => {
// //     currentRow.value = val;
// //     router.push(`/clients/all-clients/clientProfile_${currentRow.value.id}`);
// // };

// const loadingExport = ref(false);
// async function exportCsv() {
//   loadingExport.value = true;
//   await downloadFile("csv/clients");
//   loadingExport.value = false;
// }
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
