interface ErrorWithStatus extends Error {
    status: number
}

export const error = (message: string, code: number) => {
    const e = new Error(message) as ErrorWithStatus
  
    if (code) {
      e.status = code
    }
  
    return e
}

export default error