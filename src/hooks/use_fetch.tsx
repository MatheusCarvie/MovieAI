import axios from "axios"

type useFetchTypes = {
    url: string,
}

export default function UseFetch<T = unknown>({ url }: useFetchTypes) {
    return new Promise<T>((resolve, reject) => {
        axios.get(url).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
            console.error("Erro ao buscar a API: ", error.message);
        })
    })
}