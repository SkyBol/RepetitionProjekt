import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../atom/Title";
import PageSwitch from "../molekules/PageSwitch";
import BlockListGrid from "../organisms/BlockListGrid";
import { getAllBlocksInRange } from "../service/BlockService";
import block from "../types/Block";

function List() {
    const [blockList, setBlockList] = useState<block[]>([]);
    const [page, setPage] = useState<number>(1);
    const [blocksPerPage, setBlocksPerPage] = useState<number>(50);
    const navigate = useNavigate();

    useEffect(() => {
        getAllBlocksInRange(blocksPerPage, (page - 1) * blocksPerPage)
            .then((res) => { setBlockList(res); console.log(res); });
    }, [page, blocksPerPage])

    const setNewBlocksPerPage = (newCount : number | string) => {
        if (isNaN(Number(newCount)) || Number(newCount) < 0)
            setBlocksPerPage(Number(0));
        else
            setBlocksPerPage(Number(newCount));
    }

    return (
        <div>
            <Title text={ "List" } />
            <Button variant="contained" onClick={() => { navigate('/-1'); }} >Create</Button>
            <TextField 
                onChange={(event) => {setNewBlocksPerPage(event.target.value)}} 
                value={blocksPerPage} 
            />
            <PageSwitch page={page} setPage={setPage} />
            <BlockListGrid blockList={blockList} />
        </div>
    );
}

export default List;