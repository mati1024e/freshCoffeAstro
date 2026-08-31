
const url = "http://freshcoffe.local/wp-json/wp/v2"


export const fechApiUrl = async(endPoints:string) =>{
    const fetchApi = await fetch(url+endPoints)
    const jsonData = await fetchApi.json()

    return jsonData
}