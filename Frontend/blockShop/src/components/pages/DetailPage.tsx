import { Button, TextField } from "@mui/material";
import { useFormik } from 'formik';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';
import { deleteBlock, getBlock, postBlock, postPicture, postPictureLink, putBlock } from "../service/BlockService";
import block, { emptyBlock } from "../types/Block";

function Detail() {
    const { id } = useParams();
    const [block, setBlock] = useState<block>(emptyBlock);
    const [edit, setEdit] = useState<boolean>(false);
    const [isNewBlock, setIsNewBlock] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate();

    const changeIsNewBlockEdit = () => {
        setEdit(true);
        setIsNewBlock(true);
    }
    const imageUpload = (file : File | null, result : any) => {
        if (file !== null) {
            const formData = new FormData();
            formData.append("file", file, "file");
            postPicture(result.data.id, formData)
                .then(() => {})
                .catch(() => {});
        } else 
            postPictureLink(result.data.id, result.data.imageLink ? result.data.imageLink : "")
                .then(() => {})
                .catch(() => {});

        setEdit(false); setIsNewBlock(false);
    }

    useEffect(() => {
        if (id === undefined || isNaN(Number(id)) || Number(id) === -1) {
            changeIsNewBlockEdit();
            return;
        }
        getBlock(Number(id))
        .then((block) => {
            if (block.id === null)
                changeIsNewBlockEdit();
            else
                setBlock(block);
        })
        .catch(() => { changeIsNewBlockEdit(); });
    }, []);

    let validationSchema = yup.object({
        name: yup.string()
            .required('Required'),
        imageLink: yup.string()
            .required('Required'),
        description: yup.string().max(20000, 'Max Characters is 20\'000')
            .required('Required'),
    });
    let formik = useFormik({
        initialValues: {
            name: block?.name,
            imageLink: block?.imageLink,
            description: block?.description,
            file: null,
        },
        onSubmit: (values) => {
            setIsSubmitting(true);
            if (isNewBlock)
                postBlock({ id: 0, name: values.name, imageLink: values.imageLink, description: values.description })
                    .then((res) => {imageUpload(values.file, res)}).catch(() => {});
            else
                putBlock(Number(id), { id: 0, name: values.name, imageLink: values.imageLink, description: values.description })
                    .then((res) => { imageUpload(values.file, res) }).catch(() => {});
            setIsSubmitting(false);
        },
        validationSchema: validationSchema,
        enableReinitialize: true
    });

    return (
        <div className="DetailPage">
            <Button onClick={() => { navigate(-1); }} > Back </Button>
            <TextField
                id='name'
                name='name'
                label='name'
                disabled={ !edit }
                error={ !!(formik.errors.name && formik.touched.name) }
                onChange={ formik.handleChange }
                InputLabelProps={{ shrink: !isNewBlock || formik.touched.imageLink }}
                value={ formik.values.name ? formik.values.name : '' }
            />
            <TextField
                id='imageLink'
                name='imageLink'
                label='imageLink'
                disabled={ !edit }
                error={ !!(formik.errors.imageLink && formik.touched.imageLink) }
                onChange={ formik.handleChange }
                InputLabelProps={{ shrink: !isNewBlock || formik.touched.imageLink }}
                value={ formik.values.imageLink ? formik.values.imageLink : '' }
            />
            <TextField
                id='description'
                name='description'
                label='description'
                disabled={ !edit }
                error={ !!(formik.errors.description && formik.touched.description) }
                InputLabelProps={{ shrink: !isNewBlock || formik.touched.description }}
                multiline
                rows={ 4 }
                onChange={ formik.handleChange }
                value= { formik.values.description ? formik.values.description : '' }
            />

            <input id="file" name="file" type="file" hidden disabled={ !edit }
                onChange={(event) => { formik.setFieldValue("file", event?.currentTarget?.files ? event.currentTarget.files[event.currentTarget.files.length - 1] : ""); }} />
            <label htmlFor="file" >
                <Button component="span" variant="contained" color={ formik.values.file === null ? "primary" : "success"} disabled={ !edit } >
                    { formik.values.file === null ? 'Upload' : 'Uploaded' }
                </Button>
            </label> 

            { isNewBlock ? <></> :  <Button color="primary" onClick={() => { setEdit(!edit); }} > Edit </Button> }
            <Button color="success" onClick={() => { formik.submitForm(); }} disabled={ !edit || isSubmitting }> { isNewBlock ? 'Create' : 'Save' } </Button>
            { isNewBlock ? <></> :  <Button color="error"   onClick={() => { id && deleteBlock(Number(id)).then(() => { navigate('/'); })}} disabled={ !edit }> Delete </Button> }
        </div>
    );
}

export default Detail;