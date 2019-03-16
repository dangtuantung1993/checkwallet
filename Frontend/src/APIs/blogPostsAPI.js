import {
    APIResponse,
    SERVER_NAME,
    SERVER_PORT,
} from './apiParameters'
const API_LIST_BLOGPOST = `${SERVER_NAME}:${SERVER_PORT}/blogposts`
const API_NEW_BLOGPOST = `${SERVER_NAME}:${SERVER_PORT}/blogposts/insertBlogPost`
const API_GET_DETAIL = `${SERVER_NAME}:${SERVER_PORT}/blogposts/getDetailBlogPost`
export const listBlogpost = async () =>{
    try {
        let response = await fetch(API_LIST_BLOGPOST, {
            method: 'GET',
        })
        let responseJson = await response.json()
        if (responseJson.result === "ok"){
            return responseJson.data

        }else {
            return {}
        }
    }catch (error) {
        return {}
    }
}

export const insertblogpost = async (title, content, tokenKey) => {
    try {
        let response = await fetch(API_NEW_BLOGPOST, {
            method: 'POST',
            body: `title=${title}&content=${content}`,
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-access-token": tokenKey
            },
        })
        let responseJson = await response.json()

        if(responseJson.result === "ok") {
            return new APIResponse(
                responseJson.data,
                responseJson.message,true)
        } else {
            return new APIResponse(
                null,
                responseJson.message,false)
        }
    } catch (error) {
        return new APIResponse(null, error.message, false) //false
    }
}