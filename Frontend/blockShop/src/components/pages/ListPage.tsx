import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Collapse, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../molekules/NavBar";
import PageSwitch from "../molekules/PageSwitch";
import BlockListGrid from "../organisms/BlockListGrid";
import { getAllBlocksInRangeWithSearchName } from "../service/BlockService";
import '../style/ListPage.css';
import block from "../types/Block";

function List() {
    const [blockList, setBlockList] = useState<block[]>([]);
    const [page, setPage] = useState<number>(1);
    const [blocksPerPage, setBlocksPerPage] = useState<number>(50);
    const [searchWord, setSearchWord] = useState<string>('');
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        getAllBlocksInRangeWithSearchName(blocksPerPage, (page - 1) * blocksPerPage, searchWord)
            .then((res) => { setBlockList(res); });
    }, [page, blocksPerPage, searchWord])

    const setNewBlocksPerPage = (newCount : number | string) => {
        if (isNaN(Number(newCount)) || Number(newCount) < 0)
            setBlocksPerPage(Number(0));
        else
            setBlocksPerPage(Number(newCount));
    }

    return (
        <div className="ListPage">
            <NavBar />
            <div className="ListPageSettings">
                <h1> List </h1>
                <PageSwitch page={page} setPage={setPage} />

                <IconButton color="primary" size="large" onClick={() => {setSettingsOpen(!settingsOpen)}} >
                    <SettingsIcon fontSize="large"/>
                </IconButton>
                <IconButton color="primary" size="large" onClick={() => { navigate('/-1'); }}>
                    <AddCircleIcon fontSize="large"/>
                </IconButton>
                
                <Collapse in={settingsOpen} >
                    <TextField 
                        onChange={(event) => {setSearchWord(event.target.value)}}
                        label='Search'
                        value={searchWord}
                    /> <br /> <br />
                    <TextField 
                        onChange={(event) => {setNewBlocksPerPage(event.target.value)}} 
                        label='Blocks per Page'
                        value={blocksPerPage} 
                    />
                </Collapse>
            </div>
            <div className="List">
                <BlockListGrid blockList={blockList} />
            </div>
        </div>
    );
}

export default List;