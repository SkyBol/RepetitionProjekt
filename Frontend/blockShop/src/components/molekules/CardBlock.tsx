import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import block from "../types/Block";

function CardBlock({ block } : {block : block}) {
    const navigate = useNavigate();

    return (
        <Card sx={{ minWidth: 200}} >
            <CardActionArea onClick={ () => { navigate(`/${block.id}`) } } >
                <CardMedia
                    component="img"
                    height="140"
                    image={ block.imageLink }
                    alt="photo"
                />
                <CardContent>
                    <Typography variant="h5" component="div" > { block.name } </Typography>
                    <Typography> { block.description } </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CardBlock;