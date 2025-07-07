import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Асинхронний thunk для отримання всіх квартир
export const fetchApartments = createAsyncThunk(
  "apartments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://primeyardapartments.com/api/rooms"
      );
      if (!res.ok) {
        throw new Error("Помилка завантаження даних");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApartments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchApartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Щось пішло не так";
      });
  },
});

export default apartmentsSlice.reducer;
