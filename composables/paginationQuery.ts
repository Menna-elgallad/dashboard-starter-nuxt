export default function usePagination(initialpage: Number) {
  const router = useRouter();
  const route = useRoute();
  onMounted(async () => {
    initialpage.value = route.query?.pageNumber
      ? Number(route.query?.pageNumber)
      : initialpage.value;
  });

  watch(initialpage, (curr) => {
    router.push({
      path: route.fullPath,
      query: { pageNumber: curr },
    });
  });
  watch(
    () => route.query,
    () => {
      initialpage.value = route.query?.pageNumber
        ? Number(route.query?.pageNumber)
        : initialpage.value;
    }
  );
}
