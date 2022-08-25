import { Button, TextField } from "@mui/material";

function PageSwitch({ page, setPage } : {page : number, setPage : Function}) {
    const setNewPage = (newPageNumber : number | string) => {
        if (isNaN(Number(newPageNumber)) || Number(newPageNumber) < 0)
            setPage(Number(0));
        else
            setPage(Number(newPageNumber));
    }

    return (
        <div className="PageSwitch">
            <Button
                variant="contained"
                onClick={() => { setNewPage( page - 1 ); }}
            >{ '<' }</Button>
            <TextField
                className="InputPage"
                label="Page"
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