export const OPEN_HEADER = "OPEN_HEADER";
export const CLOSE_HEADER = "CLOSE_HEADER";

export const openHeader = () => {
    return {
        type: OPEN_HEADER
    }
}
export const closeHeader = () => {
    return {
        type : CLOSE_HEADER
    }
}