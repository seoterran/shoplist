import axios from 'axios';

const baseURL = process.env.REACT_APP_AZURE_FUNC_BASE_URL;

const azFunc = axios.create({
     baseURL: `${baseURL}/api`
  });

export default  {
    bizDetail : {
        get: async (bizId)=>{
            const res = await azFunc.get(`/bizDetail/id/${bizId}`);
            return res.data;
        },
        put: async (bizId, description)=>{
            const res = await azFunc.put(`/bizDetail/id/${bizId}`, {description});
            return res.status === 200;
        },   
        post: async (bizId, data)=>{
            let res;
            try{
               res = await azFunc.post(`/bizDetail/id/${bizId}`, data);
            }catch(e){
                
            }finally{
                return res && res.status === 200;
            }         
        }   
    }
};


