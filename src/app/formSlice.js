import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
    name: 'form',
    initialState: {
        uploadFiles: {
            status: 'idle',
            count: 0,
            items: []
        }
    },
    reducers: {
        addUploadFiles: function (state, action) {
            const files = [];

            for (const file of action.payload) {
                if (state.uploadFiles.count + files.length < 6) {
                    files.push({
                        file,
                        name: file.name,
                        view: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMzAwcHgiIGhlaWdodD0iMzAwcHgiIHZpZXdCb3g9IjAgMCAzMDAgMzAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAzMDAgMzAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxyZWN0IGZpbGw9IiNCOEQ4RkYiIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIi8+DQo8cG9seWdvbiBmaWxsPSIjN0M3QzdDIiBwb2ludHM9IjUxLDI2Ny42NjY5OTIyIDExMSwxOTcgMTUxLDI0My42NjY5OTIyIDI4OC4zMzMwMDc4LDEyMSAzMDAuMTY2OTkyMiwxMzQuMTY2NTAzOSAzMDAsMzAwIDAsMzAwIA0KCTAsMjA4LjgzMzk4NDQgIi8+DQo8cG9seWdvbiBmaWxsPSIjQUZBRkFGIiBwb2ludHM9IjAuMTI1LDI2Ny4xMjUgNDguODMzNDk2MSwxNzQuNjY2OTkyMiAxMDMuNSwyNjQuNSAyMDMuODc1LDY1LjMzMzAwNzggMzAwLjE2Njk5MjIsMjU0LjUgMzAwLDMwMCANCgkwLDMwMCAiLz4NCjxjaXJjbGUgZmlsbD0iI0VBRUFFQSIgY3g9Ijc3LjAwMDI0NDEiIGN5PSI3MSIgcj0iMzYuNjY2NzQ4Ii8+DQo8L3N2Zz4NCg=='
                    });
                }
            }

            state.uploadFiles.items = state.uploadFiles.items.concat(files);

            if (state.uploadFiles.items.length) {
                state.uploadFiles.status = 'prepared';
                state.uploadFiles.count = state.uploadFiles.items.length;
            }
        },

        addUploadView: function (state, action) {
            state.uploadFiles.items.forEach(function (item, i) {
                if (item.name === action.payload.name) {
                    state.uploadFiles.items[i].view = action.payload.view;
                }
            });
        },

        deleteFile: function (state, action) {
            state.uploadFiles.items.forEach(function (item, i) {
                if (item.name === action.payload) {
                    state.uploadFiles.items.splice(i, 1);

                    if (!state.uploadFiles.items.length) {
                        state.uploadFiles.status = 'idle';
                    }

                    state.uploadFiles.count = state.uploadFiles.items.length;
                }
            });
        }
    }
});

export const selectPreparedFiles = (state) => state.form.uploadFiles.items;
export const selectPreparedFilesCount = (state) => state.form.uploadFiles.count;

export const { addUploadFiles, addUploadView, deleteFile } = formSlice.actions;

export default formSlice.reducer;