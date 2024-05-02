<template lang="pug">
AppTable(v-slot="{data}" :columns="table.columns" :data="table.data" :sortOptions="table.sort" @handleRowClick="handleRowClick"  )
      tmeplate(#actions)
        .flex.items-center.py-2
          .toggle-icon 
            Icon.text-md(name="IconEye" )
</template>

<script setup lang="ts">
const { t, tm, rt, locale } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const table = reactive({
  columns: [
    {
      prop: "identity",
      label: t("name"),
      component: "AvatarText",
      sortable: true,
    },
    {
      prop: "email",
      label: t("email"),
      component: "Text",
      sortable: false,
      type: "font-bold",
    },
    {
      prop: "phone",
      label: t("phone"),
      component: "Text",
      sortable: false,
      type: "font-default",
    },
    {
      prop: "status",
      label: t("status"),
      component: "Label",
      sortable: false,
      type: "outline",
      filters: [
        { text: "Deleted", value: "DELETED" },
        { text: "Active", value: "ACTIVE" },
        { text: "Blocked", value: "BLOCKED" },
        { text: "Open", value: "OPEN" },
      ],
    },
    {
      prop: "price",
      label: t("price"),
      component: "Text",
      sortable: true,
      type: "font-default",
    },
    // { prop: "actions", label: "Actions", sortable: false },
  ],
  data: [
    {
      identity: {
        image:
          "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=1800&t=st=1713985486~exp=1713986086~hmac=179591c315ef577921008fa98f89e27230b97b62fd495112e4b838a4e385ca10",
        title: "John Doe",
        text: "surgon",
      },

      email: "john@example.com",
      phone: "01065952262",
      status: "DELETED",
      price: 100,
    },
    {
      identity: {
        image:
          "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=1800&t=st=1713985486~exp=1713986086~hmac=179591c315ef577921008fa98f89e27230b97b62fd495112e4b838a4e385ca10",
        title: "Mark Brown",
        text: "Developer",
      },
      email: "mark@example.com",
      phone: "01012345678",
      status: "ACTIVE",
      price: 200,
    },
    {
      identity: {
        image:
          "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=1800&t=st=1713985486~exp=1713986086~hmac=179591c315ef577921008fa98f89e27230b97b62fd495112e4b838a4e385ca10",
        title: "Alice Green",
        text: "Designer",
      },
      email: "alice@example.com",
      phone: "01234567890",
      status: "OPEN",
      price: 150,
    },
    {
      identity: {
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        title: "Michael Smith",
        text: "Accountant",
      },
      email: "michael@example.com",
      phone: "01098765432",
      status: "ACTIVE",
      price: 180,
    },
    {
      identity: {
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        title: "Emily Johnson",
        text: "Marketing Manager",
      },
      email: "emily@example.com",
      phone: "01928374650",
      status: "BLOCKED",
      price: 220,
    },
    {
      identity: {
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        title: "David Lee",
        text: "Software Engineer",
      },
      email: "david@example.com",
      phone: "01729485736",
      status: "OPEN",
      price: 190,
    },
    {
      identity: {
        image: "https://randomuser.me/api/portraits/women/4.jpg",
        title: "Sophia Rodriguez",
        text: "Event Planner",
      },
      email: "sophia@example.com",
      phone: "01638472950",
      status: "ACTIVE",
      price: 170,
    },
    {
      identity: {
        image: "https://randomuser.me/api/portraits/men/5.jpg",
        title: "Daniel Martinez",
        text: "Architect",
      },
      email: "daniel@example.com",
      phone: "01547382916",
      status: "BLOCKED",
      price: 210,
    },
    {
      identity: {
        image: "https://randomuser.me/api/portraits/women/6.jpg",
        title: "Olivia Brown",
        text: "HR Manager",
      },
      email: "olivia@example.com",
      phone: "01456273849",
      status: "DELETED",
      price: 200,
    },
  ],
  sort: [
    { prop: "price", order: "ascending", value: "PRICE_ASC" },
    { prop: "price", order: "descending", value: "PRICE_DESC" },
    { prop: "identity", order: "ascending", value: "IDENTITY_ASC" },
    { prop: "identity", order: "descending", value: "IDENTITY_DESC" },
  ],
});

table.data = table.data.map((e: any) => ({ ...e, price: e.price + " SAR" }));

function handleRowClick(val: any) {
  console.log(val);
}
</script>

<style></style>
