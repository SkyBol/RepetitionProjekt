import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBlocks } from "../service/BlockService";
import block from "../types/Block";

function List() {
    const [blockList, setBlockList] = useState<block[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllBlocks()
            .then((res) => { setBlockList(res); });
    }, [])

    return (
        <div>
            <Grid container spacing={5} justifyContent="center">
                {
                    blockList.map((block : block) => {
                        return (
                            <Grid item xs={12} sm={6} lg={3} key={ block.id }>
                                <Card sx={{ minWidth: 200}} >
                                    <CardContent>
                                        <Typography> { block.id } </Typography>
                                        <Typography> { block.name } </Typography>
                                        <Typography> { block.imageLink } </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={ () => { navigate(`/${block.id}`) } }> Details </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    );
}

export default List;