import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import block from "../types/Block";

function CardBlock({ block } : {block : block}) {
    const navigate = useNavigate();

    return (
        <Card sx={{ minWidth: 200}} >
            <CardMedia
                component="img"
                height="140"
                image={ block.imageLink }
                alt="photo"
            />
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