import { Grid } from "@mui/material";
import CardBlock from "../molekules/CardBlock";
import block from "../types/Block";

function BlockListGrid({ blockList } : { blockList : block[] }) {
    return (
        <div>
            <Grid container spacing={5} justifyContent="center">
                {
                    blockList.map((block : block) => {
                        return (
                            <Grid item xs={12} sm={6} lg={3} key={ block.id }>
                                <CardBlock block={ block } />
                            </Grid>
                        );
                    })
                }
            </Grid>
        </div>
    );
}

export default BlockListGrid;