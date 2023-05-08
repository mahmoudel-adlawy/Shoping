import axios from "axios";

const { createContext } = require("react");

export const ConterContext = createContext()

export function ConterContextprov({ children }) {

    const BaseUrl = "https://route-ecommerce.onrender.com/api/v1/";
    const token = localStorage.getItem("userToken");

    async function addCart(productId) {
     try {
        let objdat= {
            productId,
        };

        const { data } = await axios.post(`${BaseUrl}cart`, objdat, { headers: { token , }, }
        );
        return data;
     } catch (error) {
        console.log(error);
     }

    }
    async function getdata(){
        try {
         
    
            const { data } = await axios.get(`${BaseUrl}cart`,  { headers: { token , }, }
            );
            return data;
         } catch (error) {
            console.log(error);
         }    }

         async function Update(productId,count) {
            try {
               let objdat= {
                   count,
               };
       
               const { data } = await axios.put(`${BaseUrl}cart/${productId}`, objdat, { headers: { token , }, }
               );
               return data;
            } catch (error) {
               console.log(error);
            }
       
           }
         async function Delete(productId) {
            try {
             
       
               const { data } = await axios.delete(`${BaseUrl}cart/${productId}`, { headers: { token , }, }
               );
               return data;
            } catch (error) {
               console.log(error);
            }
       
           }



    return <ConterContext.Provider value={{addCart ,getdata , Update , Delete}}>
        {children}
    </ConterContext.Provider>
}