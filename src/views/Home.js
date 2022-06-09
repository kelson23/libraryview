import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CedTable from '../components/CedTable';
import apiDjango from '../services/ApiDjango';
import Fab from '@mui/material/Fab';
import { Add } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import NewBook from '../components/NewBook';
import MsgAlert from '../components/MsgAlert';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 27,
    height: 27,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: '#00995D'
}));



export default function Home() {

    const [books, setBooks] = useState([]);
    const [openModalBook, setOpenModalBook] = useState(false);
    const [alert, setAlert] = useState({open: false, text: '', type: 'success'});

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = () => {
        apiDjango.get('/books/?format=json')
            .then((response) => {
                console.log(response.data);
                setBooks(response.data);
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    const deleteBooks = (id) => {
        apiDjango.delete('/books/'+id)
            .then((response) => {
                getBooks();
                setAlert({...alert, open:true, type:'error', text:'Livro deletado com sucesso!'})
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    const headCells = [
        {
            id: 'nome',
            numeric: false,
            disablePadding: false,
            label: 'Nome',
        },
        {
            id: 'categoria',
            numeric: false,
            disablePadding: false,
            label: 'Categoria',
        },
        {
            id: 'autor',
            numeric: false,
            disablePadding: false,
            label: 'Autor',
        },
        {
            id: 'editar',
            numeric: false,
            disablePadding: false,
            label: 'Editar',
        },
        {
            id: 'deletar',
            numeric: false,
            disablePadding: false,
            label: 'Deletar',
        },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <CedTable
                title='Livros'
                rows={books}
                headCells={headCells}
                columns={[2, 1, 4]} //Indice das propriedades do objeto books que irão compor a tabela.
            //Importante organizar os índices na ordem desejada da esquerda para direita.  
                //onEdit={}
                onDelete={(id)=>deleteBooks(id)}                          
            />
            <Tooltip title="Cadastrar Livro">
                <Fab className="fab-fixed" color="primary" aria-label="add" onClick={() =>setOpenModalBook(true)} >
                    <Add />
                </Fab>
            </Tooltip>

            <Dialog open={openModalBook} onClose={()=>{setOpenModalBook(false)}}>
                <NewBook 
                    setOpenModalBook={(a)=>setOpenModalBook(a)}
                    success={()=>{
                        setOpenModalBook(false);
                        getBooks();
                        setAlert({...alert, open:true, type:'success', text:'Novo livro cadastrado com sucesso!'})
                    }}
                />
            </Dialog>
            <MsgAlert 
                open={alert.open}
                type={alert.type}
                text={alert.text}
                setOpen={(a)=>setAlert({...alert, open: a})}
            />
        </Box>
    );
}
