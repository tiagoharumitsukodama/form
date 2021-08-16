import { useState } from "react";
import axios from 'axios'

export function useGetCEP(CEP){
    const [data, setData] = useState(undefined)

    axios.get(`https://viacep.com.br/ws/${CEP}/json/`)
        .then(data => console.log(data))
        .catch(err => console.error(err))

    return data
}