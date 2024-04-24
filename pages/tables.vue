<template lang="pug">
AppTable(:columns="table.columns" :data="table.data")
</template>

<script setup>
const table = reactive({
  columns: [
    {
      prop: "identity",
      label: "Name",
      component: "AvatarText",
      sortable: false,
    },
    {
      prop: "email",
      label: "Email",
      component: "Text",
      sortable: true,
      type: "font-bold",
    },
    {
      prop: "phone",
      label: "Phone",
      component: "Text",
      sortable: true,
      type: "font-default",
    },
    {
      prop: "status",
      label: "Status",
      component: "Label",
      sortable: true,
      type: "outline",
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
      status: "ACTIVE",
    },
  ],
});
</script>

<style></style>
