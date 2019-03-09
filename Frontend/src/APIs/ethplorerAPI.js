
const ETHPLORER_API = `http://api.ethplorer.io/getAddressInfo`


export const list = async (your_wallet) =>{
    try {
        let response = await fetch(`${ETHPLORER_API}/${your_wallet}?apiKey=freekey`, {
            method: 'GET',

        })
        let responseJson = await response.json();

        if (responseJson){
            return responseJson

        }else {
            return {}
        }
    }catch (error) {
        return {}
    }
}
