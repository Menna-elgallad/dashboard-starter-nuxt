<template lang="pug">
ol(vocab='http://schema.org/' typeof='BreadcrumbList' class="breadcrumb" )
  li(property='itemListElement' typeof='ListItem')
    NuxtLink(property='item' typeof='WebPage' :to="localePath('/')" )
      span(property='name')
        icon(name='solar:home-angle-outline')
    meta(property='position' content='1')
  li(v-for='(crumb, index) in crumbs'  :key='index' property='itemListElement' typeof='ListItem')
    NuxtLink.text-xs(property='item' typeof='WebPage' :to='localePath(crumb.path)' class="breadcrumbLink")
      span(property='name') {{    $route.fullPath === crumb.path && title !== null ? title : crumb.title }}
    meta(property='position' :content='index + 2')

</template>

<script setup>
const { t, tm, rt, locale  } = useI18n();

defineProps({
  title: {
    type: String,
    default: null,
  },
});

const route = useRoute();
const router = useRouter();

const crumbs = computed(() => {
  const fullPath = route.fullPath.replace('/ar', '');
  const params = fullPath.startsWith('/')
    ? fullPath.substring(1).split('/')
    : fullPath.split('/');
  const crumbs = [];
  let path = '';
  params.forEach((param, index) => {
    path = `${path}/${param}`;
    const match = router.resolve(path);
    if (match.name !== null) {
      crumbs.push({
        title: t(param.replace(/-/g, ' ').split("?")[0]),
        ...match,
      });
    }
  });
  return crumbs;
});


</script>

<style lang="scss" >
ol {
  list-style: none;

  li {
    display: inline;

    &:after {
      content: ' » ';
      display: inline;
      color: #aaa;
      padding: 0 0.0725em 0 0.15em;
    }

    &:last-child:after {
      content: '';
    }

    a {
      color: black;
    }
  }
}
.breadcrumb{

  .router-link-active {
      color: black !important;
      background-color: transparent !important;
      font-weight: 600;
  }
}
</style>