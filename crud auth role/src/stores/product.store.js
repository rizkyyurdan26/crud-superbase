import { defineStore } from "pinia";
import { ref } from "vue";
import { productService } from "../services/product.service";

export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function getAllData() {
    loading.value = true;
    error.value = null;

    try {
      const data = await productService.getAll();
      products.value = data;
      return data;
    } catch (err) {
      error.value =
        err.response?.data?.message || err.message || "Failed get data";

      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function createData(payload) {
    loading.value = true;
    error.value = null;

    try {
      const data = await productService.create(payload);

      products.value.unshift(data);
      return data;
    } catch (err) {
      error.value =
        err.response?.data?.message || err.message || "Failed create data";

      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteData(id) {
    loading.value = true;
    error.value = null;

    try {
      await productService.delete(id);

      products.value = products.value.filter((item) => item.id !== id);
    } catch (err) {
      error.value =
        err.response?.data?.message || err.message || "Failed delete data";

      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function editData(id, payload) {
    loading.value = true;
    error.value = null;

    try {
      const data = await productService.edit(id, payload);

      const idx = products.value.findIndex((d) => d.id === id);

      if (idx !== -1){
          products.value[idx] = { ...products.value[idx], ...data };
      }

      return data;
    } catch (err) {
      error.value =
        err.response?.data?.message || err.message || "Failed edit data";

      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    products,
    loading,
    error,

    getAllData,
    createData,
    deleteData,
    editData,
  };
});
