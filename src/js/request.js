import axios from "axios"
const host = "http://localhost:8080"
export default {
    async test(){
        console.log(host);
        const res = await axios({
            url:host,
            headers:{
                'Content-Type': 'application/json'
            },
            method:'post',
            data:{}
        })
        return res;
    }
}