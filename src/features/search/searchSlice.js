import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const searchImages = createAsyncThunk("search/fetchImages", async ({ searchTerm, searchPage }) => {

    const options = {
        headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_API_KEY}`,
        },
    };
    let url = searchTerm.length > 0 ? `${process.env.REACT_APP_API_URI}search/photos?query=${searchTerm}&per_page=30&page=${searchPage}` : `${process.env.REACT_APP_API_URI}photos?page=${searchPage}&per_page=30`;
    const datos = await fetch(url, options);
    const datosJson = await datos.json();

    return { results: datosJson };
});


export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        results: [],
        status: null,
        term: "",
        page: 0,
    },
    reducers: {
        setSearch: (state, action) => {
            state.term = action.payload;
            state.page = 0;
        },
        setPage: (state, action) => {
            state.status = null;
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(searchImages.pending, (state) => {
            state.status = "loading";
          })
          .addCase(searchImages.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.page == 0 ? state.results[0] = action.payload : state.results.push(action.payload);
          })
          .addCase(searchImages.rejected, (state) => {
            state.status = "error";
          });
    },
});

export const { setSearch, setPage } = searchSlice.actions;

export default searchSlice.reducer; 