import api from "@/services/api";
import { onMounted, ref } from "vue";

export function useCategory(){


  const sections = ref([]);
  const categories = ref([]);

  onMounted(async()=>{
    const resSections = await api.get('/sections');
    const resCategories = await api.get('/categories');
    sections.value = resSections.data.data;
    categories.value = resCategories.data.data;
  })

  return {sections, categories}

}
