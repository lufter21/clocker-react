import { createSlice } from '@reduxjs/toolkit';

export const popupSlice = createSlice({
    name: 'popup',
    initialState: {
        status: 'idle',
        visiblePopup: '',
        message: {
            title: '',
            text: ''
        },
        info: {
            title: '',
            text: ''
        },
        auth: {
            title: '',
            form: '',
            subTitle: ''
        },
        depositForm: '',
        notifyBrands: [],
        watchData: {},
        lightboxData: {}
    },
    reducers: {
        showMessage: function (state, action) {
            state.visiblePopup = 'MessagePopup';
            state.message.title = action.payload.title;
            state.message.text = action.payload.text;
        },
        showInfo: function (state, action) {
            state.visiblePopup = 'InfoPopup';
            state.info.title = action.payload.title;
            state.info.text = action.payload.text;
        },
        showAuth: function (state, action) {
            state.visiblePopup = 'AuthPopup';
            state.auth.title = (action.payload && action.payload.title) || 'Enter phone number';
            state.auth.subTitle = (action.payload && action.payload.subTitle) || 'Enter "1" to sign in as a dealer. Enter "2" to sign in as a seller.';
            state.auth.form = (action.payload && action.payload.form) || 'AuthForm';
        },
        showUpload: function (state, action) {
            state.visiblePopup = 'UploadPopup';
        },
        showDeposit: function (state, action) {
            state.visiblePopup = 'DepositPopup';
            state.depositForm = (action.payload && action.payload.depositForm) || 'DepositForm';
        },
        showProVersion: function (state, action) {
            state.visiblePopup = 'ProVersionPopup';
        },
        showBrands: function (state, action) {
            state.visiblePopup = 'BrandsPopup';
            state.notifyBrands = action.payload.notifyBrands;
        },
        showWatch: function (state, action) {
            state.visiblePopup = 'WatchPopup';
            state.watchData = action.payload.data;
        },
        showLightbox: function (state, action) {
            state.visiblePopup = 'LightboxPopup';
            state.lightboxData.images = action.payload.images;
            state.lightboxData.imgIndex = action.payload.imgIndex || 0;
        },
        closePopup: function (state, action) {
            state.visiblePopup = '';
        }
    }
});

export const selectVisible = (state) => state.popup.visiblePopup;
export const selectMessage = (state) => state.popup.message;
export const selectAuth = (state) => state.popup.auth;

export const { showMessage, showAuth, showUpload, showDeposit, showInfo, showProVersion, showBrands, showWatch, showLightbox, closePopup } = popupSlice.actions;

export default popupSlice.reducer;