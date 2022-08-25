import block from "../types/Block";
import axiosDefault from "./AxiosDefault";

export async function getAllBlocks() {
    return (
        await axiosDefault.get('/api/block/')
            .then(res => { return res.data; })
            .catch(err => { throw err; })
    )
}

export async function getAllBlocksInRange(limit : number, offset : number) {
    return (
        await axiosDefault.get('/api/block/?max=' + limit + '&start=' + offset)
            .then(res => { return res.data; })
            .catch(err => { throw err; })
    );
}
export async function getAllBlocksInRangeWithSearchName(limit : number, offset : number, searchName : string) {
    if (searchName === undefined || searchName === '') return (getAllBlocksInRange(limit, offset))
    return (
        await axiosDefault.get('/api/block/?max=' + limit + '&start=' + offset + '&search=' + searchName)
            .then(res => { return res.data; })
            .catch(err => { throw err; })
    );
}

export async function getBlock(id : number) {
    return (
        await axiosDefault.get('/api/block/' + id)
            .then(res => { return res.data; })
            .catch(err => { throw err; })
    );
}

export async function postBlock(block : block) {
    console.log(block.imageLink)
    return (
        await axiosDefault.post('/api/block/',
            { id: block.id, name : block.name, imageLink : block.imageLink !== undefined ? block.imageLink : 'a', description: block.description }
        ).catch(err => { throw err; })
    );
}

export async function postPicture(id : number, formData : FormData) {
    return (
        await axiosDefault.post('/api/block/image/' + id,
            formData
        ).then((res) => {return res.data})
        .catch(err => { throw err; })
    );
}

export async function postPictureLink(id : number, link : string) {
    return (
        await axiosDefault.post('/api/block/image/upload/' + id + "?link=" + link)
        .then((res) => {return res.data})
        .catch(err => { throw err; })
    );
}

export async function putBlock(id : number, block : block) {
    return (
        await axiosDefault.put('/api/block/' + id, 
            { id: id, name: block.name, imageLink: block.imageLink, description: block.description }
        ).catch(err => { throw err; })
    );
}

export async function deleteBlock(id : number) {
    return (
        await axiosDefault.delete('/api/block/' + id)
            .catch(err => { throw err; })
    )
}

