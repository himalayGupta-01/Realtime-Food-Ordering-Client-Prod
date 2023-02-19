export const api=process.env.REACT_APP_SERVER_PROD
export const generatePublicUrl=(filename)=>{
    return process.env.REACT_APP_SERVER_PROD+filename;
}