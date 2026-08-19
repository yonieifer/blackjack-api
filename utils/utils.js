import e from "express"

export const createError = (status, msg) => {
    const error = new Error(msg)
    error.status = status
    return error
}