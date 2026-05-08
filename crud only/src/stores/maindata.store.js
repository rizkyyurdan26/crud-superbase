import { defineStore } from "pinia";
import { ref } from "vue";
import { stocksService } from "../services/stocks.service";

export const useMaindataStore = defineStore("maindata", () => {
  const mainData = ref([]);
  const detailData = ref(null);

  const loadingGet = ref(false);
  const loadingGetId = ref(false);
  const loadingCreate = ref(false);
  const loadingUpdate = ref(false);
  const loadingDelete = ref(false);

  const errorGet = ref(null);
  const errorGetId = ref(null);
  const errorCreate = ref(null);
  const errorUpdate = ref(null);
  const errorDelete = ref(null);

  const successCreate = ref(false);
  const successUpdate = ref(false);
  const successDelete = ref(false);

  async function getAll() {
    loadingGet.value = true;
    errorGet.value = null;

    try {
      const data = await stocksService.getAll();
      mainData.value = data;
    } catch (err) {
      errorGet.value =
        err.response?.data?.message || err.message || "Failed Get Data";
    } finally {
      loadingGet.value = false;
    }
  }

  async function getDataId(id) {
    loadingGetId.value = true;
    errorGetId.value = null;
    detailData.value = null;

    try {
      const data = await stocksService.getId(id);
      detailData.value = data;
    } catch (err) {
      errorGetId.value =
        err.response?.data?.message || err.message || "Failed Get Data";
    } finally {
      loadingGetId.value = false;
    }
  }

  async function deleteData(id) {
    loadingDelete.value = true;
    errorDelete.value = null;
    successDelete.value = false;

    try {
      await stocksService.delete(id);
      mainData.value = mainData.value.filter((d) => d.id !== id);
      successDelete.value = true;
    } catch (err) {
      errorDelete.value =
        err.response?.data?.message || err.message || "Failed Delete Data";
    } finally {
      loadingDelete.value = false;
    }
  }

  async function createProduct(payload) {
    loadingCreate.value = true;
    errorCreate.value = null;
    successCreate.value = false

    try {
      const data = await stocksService.create(payload);
      mainData.value.unshift(data);
      successCreate.value = true
      return data;
    } catch (err) {
      errorCreate.value =
        err.response?.data?.message || err.message || "Failed Create Data";
    } finally {
      loadingCreate.value = false;
    }
  }

  async function updateProduct(id, payload) {
    loadingUpdate.value = true;
    errorUpdate.value = null;
    successUpdate.value = false

    try {
      const data = await stocksService.update(id, payload);
      const idx = mainData.value.findIndex((d) => d.id === id);

      if (idx !== -1) {
        mainData.value[idx] = { ...mainData.value[idx], ...payload };
      }

      successUpdate.value = true
      return data;
    } catch (err) {
      errorUpdate.value =
        err.response?.data?.message || err.message || "Failed Update Data";
    } finally {
      loadingUpdate.value = false;
    }
  }

  return {
    mainData,
    loadingGet,
    loadingCreate,
    loadingUpdate,
    loadingDelete,
    errorGet,
    errorCreate,
    errorUpdate,
    errorDelete,
    detailData,
    loadingGetId,
    errorGetId,
    successCreate,
    successDelete,
    successUpdate,

    getAll,
    getDataId,
    deleteData,
    createProduct,
    updateProduct
  };
});
