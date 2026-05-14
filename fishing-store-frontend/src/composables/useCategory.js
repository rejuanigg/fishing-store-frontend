import api from "@/services/api";
import { onMounted, ref } from "vue";

export function useCategory(){


  const sections = ref([]);
  const categories = ref([]);
  const isLoading = ref(true);

  onMounted(async()=>{
    const resSections = await api.get('/sections');
    const resCategories = await api.get('/categories');
    sections.value = resSections.data.data;
    categories.value = resCategories.data.data;
    isLoading.value = false
  })

  return {sections, categories, isLoading}

}
