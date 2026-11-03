
const url = import.meta.env.API_URL


export const fechApiUrl = async(endPoints:string) =>{
    const fetchApi = await fetch(url+endPoints)
    const jsonData = await fetchApi.json()

    return {jsonData,fetchApi}
}