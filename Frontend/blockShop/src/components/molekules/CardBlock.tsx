import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import block from "../types/Block";

function CardBlock({ block } : {block : block}) {
    const navigate = useNavigate();

    return (
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
    );
}

export default CardBlock;