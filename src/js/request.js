import axios from "axios"
const host = "http://localhost:8088/management"
export default {
    async myPost(api,data){
        const res = await axios({
            url:host + api,
            headers:{
                'Content-Type': 'application/json'
            },
            method:'post',
            data:data
        }).catch(function(e){
            alert(e.message)
        })
        return res.data;
    }
    ,
    queryData(postData){
        const api = '/queryData';
        const data = JSON.stringify(postData);
        return this.myPost(api,data);
    },
    addData(postData){
        const api = '/addData';
        const data = JSON.stringify(postData);
        return this.myPost(api,data);
    },
    deleteData(postData){
        const api = '/deleteData';
        const data = JSON.stringify(postData);
        return this.myPost(api,data);
    },
    updateData(postData){
        const api = '/updateData';
        const data = JSON.stringify(postData);
        return this.myPost(api,data);
    },
}