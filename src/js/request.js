import axios from "axios"
const host = "http://localhost:80"
export default {
    async myPost(api,postData){
        const res = await axios({
            url:host + api,
            headers:{
                'Content-Type': 'application/json;charset=UTF-8'
            },
            method:'post',
            data:postData
        }).catch(function(e){
            alert(e.message)
            return e.message;
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
        console.log(postData);
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