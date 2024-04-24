export default function useQuery(
  initialpage: Number,
  sort: string = "",
  filterData: any = {},
  search: string = ""
) {
  const router = useRouter();
  const route = useRoute();
  onMounted(async () => {
    initialpage.value = route.query?.pageNumber
      ? Number(route.query?.pageNumber)
      : initialpage.value;
    sort.value = route.query?.sortOption ? route.query?.sortOption : sort.value;
    search.value = route.query?.find ? route.query?.find : search.value;

    const { sortOption, pageNumber, find, ...filters } = route.query;
    if (Object.keys(filters).length) {
      filterData.value = filters;
    }
  });

  watch(initialpage, (curr) => {
    router.push({
      path: route.fullPath,
      query: { ...route.query, pageNumber: curr },
    });
  });
  watch(search, (curr) => {
    router.push({
      path: route.fullPath,
      query: { ...route.query, find: curr },
    });
  });
  watch(sort, (curr) => {
    router.push({
      path: route.fullPath,
      query: { ...route.query, ...(sort.value && { sortOption: sort.value }) },
    });
  });
  watch(filterData, (curr) => {
    router.push({
      path: route.fullPath,
      query: { ...route.query, ...filterData.value },
    });
  });
  watch(
    () => route.query,
    () => {
      initialpage.value = route.query?.pageNumber
        ? Number(route.query?.pageNumber)
        : initialpage.value;
      sort.value = route.query?.sortOption
        ? route.query?.sortOption
        : sort.value;
      search.value = route.query?.find ? route.query?.find : search.value;
      const { sortOption, pageNumber, find, ...filters } = route.query;
      if (Object.keys(filters).length) {
        filterData.value = filters;
      }
    }
  );
}
