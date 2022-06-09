import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import apiDjango from '../services/ApiDjango';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Divider, Typography } from '@mui/material';
import defaultImg from '../assets/imgs/default.jpg';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function NewBook(props) {

    const [categorys, setCategorys] = useState([]);
    const [category, setCategory] = useState(null);
    const [msgDateError, setMsgDateError] = useState(null);
    const [books, setBooks] = useState({
        name: "",
        bookCover: defaultImg,
        author: "",
        publishDate: null,
        pages: null,
        category: null
    });
    const loadImgRef = React.useRef(null);

    useEffect(() => {
        getCategorys();
    }, []);

    const getCategorys = () => {
        apiDjango.get('/category/?format=json')
            .then((response) => {
                console.log(response.data);
                setCategorys(response.data);
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    const sendBooks = () => {

        const fd = new FormData();

        fd.append('name', books.name);
        fd.append('bookCover', books.bookCover);        
        fd.append('author', books.author);
        fd.append('publishDate', books.publishDate.toISOString().split('T')[0]);
        fd.append('pages', books.pages);
        fd.append('category', books.category);

        apiDjango.post('/books/?format=api', fd)
            .then((response) => {
                console.log(response.status);
                if(response.status == 201)
                    props.success('Livro cadastrado com sucesso!');
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setBooks({ ...books, bookCover: img })
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <DialogTitle>Novo Livro</DialogTitle>
            <Divider />
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item>
                        <input
                            accept="image/jpeg, image/jpg, image/png, application/pdf"
                            id='loadImg'
                            ref={loadImgRef}
                            type="file"
                            hidden
                            onChange={(e) => onImageChange(e)}
                        />
                        <ButtonBase onClick={() => loadImgRef.current.click()} sx={{ width: 128, height: 128 }}>
                            <Img alt="Upload Capa" src={typeof books.bookCover === 'string' ? books.bookCover : URL.createObjectURL(books.bookCover)} />
                        </ButtonBase>
                        <div align='center'>
                            <Typography variant='subtitle2' color='text.secondary'>Carregar imagem</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container spacing={2}>
                            <Grid item xs={12}>
                                <TextField id="standard-basic" required fullWidth label="Nome do livro" onChange={(e) => setBooks({ ...books, name: e.target.value })} variant="standard" />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="standard" sx={{ m: 0, minWidth: 200 }}>
                                    <InputLabel id="demo-simple-select-standard-label" required>Categorias</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={books.category}
                                        onChange={(e) => setBooks({ ...books, category: e.target.value })}
                                        label="Age"
                                    >
                                        {
                                            categorys.map((row) => (
                                                <MenuItem value={row.idCategory}>{row.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="standard-basic" required fullWidth label="Autor" onChange={(e) => setBooks({ ...books, author: e.target.value })} variant="standard" />
                            </Grid>
                            <Grid item xs={7}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Data de Publicação"
                                        size='small'
                                        minDate={new Date('1500-01-01')}
                                        maxDate={new Date()}
                                        value={books.publishDate}
                                        inputFormat="dd/MM/yyyy"
                                        onError={(Error) => {
                                            if (Error === 'minDate')
                                                setMsgDateError('Informe uma data entre 01/01/1500 e ' + new Date().toLocaleDateString())
                                            else if (Error === 'invalidDate')
                                                setMsgDateError('Data inválida')
                                            else if (!Error)
                                                setMsgDateError(null)
                                        }}
                                        onAccept={() => {
                                            setMsgDateError('')
                                        }}
                                        onChange={(newValue) => {
                                            setBooks({ ...books, publishDate: newValue });
                                        }}
                                        renderInput={(params) => <TextField helperText={msgDateError} required variant="standard" {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={5}>
                                <TextField id="standard-basic" required type='number' fullWidth label="Quant. Páginas" onChange={(e) => setBooks({ ...books, pages: e.target.value })} variant="standard" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button color='error' variant='outlined' onClick={() => props.setOpenModalBook(false)}>Cancelar</Button>
                <Button color='primary' variant='contained' onClick={() => { sendBooks(); }}>Cadastrar</Button>
            </DialogActions>
            <Button onClick={() => console.log(books)}>log</Button>
        </Box>
    );
}