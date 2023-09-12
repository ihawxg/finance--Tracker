export const SET_SNACKBAR = "SET_SNACKBAR";

export const setSnackbar = (
    snackbarOpen,
    snackbarType = "success",
    snackbarMessage = "") => {
    return {
        type : SET_SNACKBAR,
        payload: {
            snackbarOpen,
            snackbarType,
            snackbarMessage
        }

    }

}