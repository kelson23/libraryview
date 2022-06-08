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

    const headCells = [
        {
          id: 'nome',
          numeric: false,
          disablePadding: true,
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
      ];

    return (
        <Box sx={{ width: '100%' }}>
            <CedTable
                title='Livros'
                rows={books}
                headCells={headCells}
                columns={[2, 1, 4]} //Indice das propriedades do objeto books que irão compor a tabela.
                //Importante organizar os índices na ordem desejada da esquerda para direita.                
            />
        </Box>
    );
}
