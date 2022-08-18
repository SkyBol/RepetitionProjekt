import { Button, TextField } from "@mui/material";

function PageSwitch({ page, setPage } : {page : number, setPage : Function}) {
    const setNewPage = (newPageNumber : number | string) => {
        if (isNaN(Number(newPageNumber)) || Number(newPageNumber) < 0)
            setPage(Number(0));
        else
            setPage(Number(newPageNumber));
    }

    return (
        <div>
            <Button 
                variant="contained"
                onClick={() => { setNewPage( page - 1 ); }}
            >{ '<' }</Button>
            <TextField
                onChange={ (event) => { setNewPage( event.target.value ); }}
                value={ page <= 0 ? '' : page }
            />
            <Button 
                variant="contained" 
                onClick={() => { setNewPage( page + 1 ); }}
            >{ '>' }</Button>
        </div>
    );
}

export default PageSwitch;