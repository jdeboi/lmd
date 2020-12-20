
export const RESETAPP = 'RESETAPP';
export const RESIZEAPP = 'RESIZEAPP';

export const resetApp = () => {
  return {
    type: RESETAPP
  }
}

export const resizeApp = (width, height) => {
  return {
    type: RESIZEAPP,
    payload : {width, height}
  }
}
