import React, { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import logo from '../assets/imgs/logo.png';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import packageJson from '../../package.json';
import bg from '../assets/imgs/bg.jpg';
import util from '../assets/css/util.css';

//const useStyles = createTheme((theme) => ({
const classes = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '95vh',
    },
    input: {
        width: '100%',
        marginBottom: '20px'
    },
    backdrop: {
        zIndex: '99',
        color: '#fff',
    },
    letreiro: {
        width: 500,
        height: 'auto',
        background: 'rgba(30, 30, 30,0.75)',
        padding: 15,
        color: '#FFF'
    },
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerRodape: {
        position: 'relative',
        width: '100%',
        height: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'end',
    },
    rodape: {
        margin: '0 auto',
        position: 'absolute',
        bottom: 14,
        right: '50px',
        textAlign: 'center'        
    }
};


export default function Login() {

    // const classes = useStyles();

    const [backdrop, setBackdrop] = React.useState(false);
    const [aviso, setAviso] = React.useState(false);
    const [usuario, setUsuario] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [msgErro, setMsgErro] = React.useState('');
    const [openModal, setModal] = React.useState(true);
    const [pass, setPass] = React.useState('');
    const [avisoSenha, setavisoSenha] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        document.body.style.background = `url(${bg})`;
        document.body.style.backgroundSize = 'cover';
        sessionStorage.clear();
        console.log('chamou')
    }, []);

    const handleEntrar = () => {

        console.log('Fazer login');
        setAviso(true);
        setMsgErro('Usuário e/ou senha incorretos.')
        // if (!this.state.usuario && !this.state.senha) {
        //   return;
        // }

        // console.log(apiHost())

        // const fd = new FormData();

        // fd.append('usuario', this.state.usuario);
        // fd.append('password', this.state.senha);

        // this.setState({ loading: true });
        // //Post Request to laravel API Route
        // axios.post(apiHost() + '/api/auth/login', fd)
        //   .then(res => {

        //     if (res.status == 200) {
        //       sessionStorage.setItem('agToken', res.data.access_token);
        //       sessionStorage.setItem('agTimeTokenRefresh', Number(res.data.expires_in) / 2);
        //       sessionStorage.setItem('agTimeTokenGenerate', Number(new Date().getTime()));
        //       sessionStorage.setItem('agUser', JSON.stringify(res.data.user));
        //       this.props.history.push('home');
        //     }
        //     this.setState({ loading: false });
        //   }).catch((error) => {
        //     this.setState({ loading: false });
        //     this.setState({ aviso: true, msgErro: 'Usuário e/ou senha incorretos.' });
        //     this.setState({ senha: '' });

        //     return;
        //   });

    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleEntrar();
        }
    }

    return (
        <div>
            <Backdrop style={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {/* xs=tela pequena
                md=tela grande
                sm=tela média 
            */}

            <Grid container spacing={0}>
                <Grid item md={8} sm={8} xs={false} className='backGround-login' style={{ height: '100vh' }}>
                    <div style={classes.container}>
                        <div style={classes.letreiro} align='center' >
                            <Typography variant='h3'>SGBC</Typography>
                            <Typography variant='h5'>{packageJson.name}</Typography>
                        </div>
                    </div>
                </Grid>

                <Grid item md={4} sm={4} xs={12} style={{ backgroundColor: 'white', height: '100vh' }}>
                    <div style={{width: '100%', height: '80%'}}>
                        <Grid container spacing={0} align='left' style={{ padding: '10%' }}>
                            <Grid item md={12} sm={12} xs={12}>
                                <img style={{ width: 200, marginLeft: 'auto', marginRight: 'auto', display: 'block' }} src={logo} />
                                <Typography align='center' color='primary' style={{ fontSize: '25px', margin: '50px 0 10px 0' }}>SGBC</Typography>
                            </Grid>

                            {/* <Alert severity="error" style={{width: '100%', marginBottom: 15}} onClose={() => {}}>Usuário ou senha incorretos!</Alert> */}
                            {
                                aviso ?
                                    <Alert severity="error" onClose={() => setAviso(false)} style={{ position: 'absolute', width: '100%', marginBottom: 15 }}>
                                        {msgErro}
                                    </Alert>
                                    :
                                    ''
                            }

                            <Grid item xs={12} md={12} sm={12}>

                                <TextField
                                    onKeyPress={handleKeyPress}
                                    value={usuario} style={classes.input} onChange={e => setUsuario(e.target.value)} label="Usuário" size="small" variant="outlined" />

                                <TextField
                                    onKeyPress={handleKeyPress}
                                    value={senha} style={classes.input} onChange={e => setSenha(e.target.value)} type="password" label="Senha" size="small" variant="outlined" />

                            </Grid>
                            <Grid item xs={12} md={12} sm={12}>

                                <Button disabled={!usuario} variant="contained" color="primary" disableElevation style={{ width: '100%' }} onClick={handleEntrar} >
                                    Entrar
                                </Button>
                            </Grid>

                        </Grid>
                    </div>
                    <div style={classes.containerRodape}>
                        <div style={{textAlign: 'center', height: 65}}>
                            <Typography variant='caption' color='primary' >Versão {packageJson.version}</Typography><br />
                            <Typography variant='caption' color='primary' >Centro de Educação a Distância - Tecnologia da Informação</Typography>
                        </div>
                    </div>
                </Grid>
            </Grid>

        </div >
    );
}