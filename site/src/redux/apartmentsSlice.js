import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://primerestapartments.com/api/rooms";
const CACHE_KEY = "apartments:v1";
const REFRESH_AFTER_MS = 5 * 60 * 1000;

// Миттєвий старт: дані, вбудовані в HTML під час збірки (scripts/prerender-seo.mjs),
// або кеш з попереднього візиту. Свіжі дані все одно підтягуються у фоні.
function initialItems() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    if (Array.isArray(cached?.items) && cached.items.length) return cached.items;
  } catch {
    /* приватний режим або пошкоджений кеш */
  }
  const embedded = typeof window !== "undefined" && window.__APARTMENTS__;
  return Array.isArray(embedded) ? embedded : [];
}

// Асинхронний thunk для отримання всіх квартир
export const fetchApartments = createAsyncThunk(
  "apartments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error("Помилка завантаження даних");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    // один запит на всі компоненти, і не частіше ніж раз на 5 хвилин
    condition: (_, { getState }) => {
      const { loading, refreshing, fetchedAt } = getState().apartments;
      if (loading || refreshing) return false;
      return !fetchedAt || Date.now() - fetchedAt > REFRESH_AFTER_MS;
    },
  }
);

const items = initialItems();

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState: {
    items,
    loading: false, // true лише коли показати нічого (скелетони)
    refreshing: false, // фонове оновлення вже показаних даних
    error: null,
    fetchedAt: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApartments.pending, (state) => {
        if (state.items.length) state.refreshing = true;
        else state.loading = true;
        state.error = null;
      })
      .addCase(fetchApartments.fulfilled, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.fetchedAt = Date.now();
        if (Array.isArray(action.payload)) {
          state.items = action.payload;
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ items: action.payload }));
          } catch {
            /* немає місця або заборонено */
          }
        }
      })
      .addCase(fetchApartments.rejected, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        // якщо вже є дані — тихо залишаємо їх
        if (!state.items.length) state.error = action.payload || "Щось пішло не так";
      });
  },
});

export default apartmentsSlice.reducer;
