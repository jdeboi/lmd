export const ADDMESSAGE = 'ADDMESSAGE';

export const addMessage = (message) => {
  return {
    type: ADDMESSAGE,
    payload: {message}
  }
}
