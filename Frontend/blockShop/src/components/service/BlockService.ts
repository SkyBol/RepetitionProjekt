import block from "../types/Block";
import axiosDefault from "./AxiosDefault";

export async function getAllBlocks() {
    return (
        await axiosDefault.get('/api/block/')
            .then(res => { return res.data; })
            .catch(err => { throw err; })
    )
}

export async function getBlock({id} : {id : number}) {
    return (
        await axiosDefault.get('/api/block/' + id)
            .then(res => { return res.data; })
            .catch(err => { throw err; })
    );
}

export async function postBlock({block} : {block : block}) {
    await axiosDefault.post('/api/block/',
        { "name" : block.name, "imageLink" : block.imageLink }
    )
        .catch(err => { throw err; });
}

export async function putBlock({id, block} : {id : number, block : block}) {
    await axiosDefault.post('/api/block/' + id, 
        { "name" : block.name, "imageLink" : block.imageLink}
    )
        .catch(err => { throw err; });
}

export async function deleteBlock({id} : {id : number}) {
    await axiosDefault.delete('/api/block/' + id)
        .catch(err => { throw err; });
}

