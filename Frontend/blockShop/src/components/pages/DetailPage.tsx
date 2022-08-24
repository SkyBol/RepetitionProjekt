import { Button, TextField } from "@mui/material";
import { useFormik } from 'formik';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';
import { deleteBlock, getBlock, postBlock, postPicture, putBlock } from "../service/BlockService";
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
    });
    let formik = useFormik({
        initialValues: {
            name: block?.name,
            imageLink: block?.imageLink,
            file: null,
        },
        onSubmit: (values) => {
            setIsSubmitting(true);
            if (isNewBlock) {
                if (values.file !== null) {
                    const formData = new FormData();
                    formData.append("file", values.file, "file");

                    postBlock({ id: 0, name: values.name, imageLink: values.imageLink })
                        .then((res1) => {
                            postPicture(res1.data.id, formData)
                                .then((res2) => { setEdit(false); setIsNewBlock(false); })
                                .catch((err) => {});
                        }).catch(() => {})
                } else
                    postBlock( { id: 0, name: values.name, imageLink: values.imageLink } )
                        .then(() => { setEdit(false); setIsNewBlock(false); })
                        .catch(() => {});
            }
            else
                putBlock(Number(id), { id: 0, name: values.name, imageLink: values.imageLink})
                    .then(() => { setEdit(false); })
                    .catch(() => {});
            setIsSubmitting(false);
        },
        validationSchema: validationSchema,
        enableReinitialize: true
    });

    return (
        <div>
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

            <input id="file" name="file" type="file" hidden
                onChange={(event) => { formik.setFieldValue("file", event?.currentTarget?.files ? event.currentTarget.files[event.currentTarget.files.length - 1] : ""); }} />
            <label htmlFor="file" >
                <Button component="span" variant="contained" color={ formik.values.file === null ? "primary" : "success"} >
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