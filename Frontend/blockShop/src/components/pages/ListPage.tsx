import { useEffect, useState } from "react";
import Title from "../atom/Title";
import PageSwitch from "../molekules/PageSwitch";
import BlockListGrid from "../organisms/BlockListGrid";
import { getAllBlocksInRange } from "../service/BlockService";
import block from "../types/Block";

function List() {
    const [blockList, setBlockList] = useState<block[]>([]);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        getAllBlocksInRange((page - 1) * 50 + 50, (page - 1) * 50)
            .then((res) => { setBlockList(res); console.log(res); });
    }, [page])

    return (
        <div>
            <Title text={ "List" } />
            <PageSwitch page={page} setPage={setPage} />
            <BlockListGrid blockList={blockList} />
        </div>
    );
}

export default List;