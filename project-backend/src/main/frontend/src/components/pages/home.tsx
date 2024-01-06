import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface State extends SnackbarOrigin {
    open: boolean;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    name: string,
    username: string,
    id: number,
    email: string,
) {
    return { id, name, username, email };
}


export default function BasicTable() {
    const [users, setUsers] = useState<any>([])
    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()

        return () => {

        }
    }, [])

    const [openDialog, setOpenDialog] = useState(false)
    const [dialogData, setDialogData] = useState<any>({})
    const [msg, setMsg] = useState<String>('Alert')
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false)
    const [openUserDetails, setOpenDetails] = useState<boolean>(false)

    const loadUsers: any = async () => {
        const result = await axios.get("http://localhost:8080/users")
        if (result && result.status === 200) {
            const data = result.data.map((user: any) => {
                return createData(user.name, user.username, user.id, user.email);
            });
            setUsers(data);
        }
    }

    const showConfirmation = (user: any) => {
        return new Promise((resolve, reject) => {
            setDialogData(user)
            resolve(true)
        })
    }

    const onUserDelete: any = async (...props: any) => {
        console.log(props);
        showConfirmation(props[1]).then((res) => {
            if (res) {
                setOpenDialog(true)
            }
        })
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const closeDialog = () => {
        setOpenDialog(false);
    };

    const [snackBar, setSnackBar] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center'
    })

    const { open, vertical, horizontal } = snackBar;

    const deleteUser = async (id: any) => {
        await axios.delete(`http://localhost:8080/user/${id}`).then((res) => {
            setOpenDialog(false)
            setMsg(res.data)
            setOpenSnackBar(true)
            setSnackBar({ open: true, vertical: 'bottom', horizontal: 'center' });
            loadUsers()
        })
    }

    const closeSnackBar = () => {
        setSnackBar({ ...snackBar, open: false })
        setOpenSnackBar(false)
    }

    const onEditUser = (...props: any) => {
        const id = props[1].id
        navigate(`/edituser/${id}`)
    }
    const [curUser, setCurUser] = useState<any>({
        id: null,
        name: '',
        username: '',
        email: ''
    })

    const viewUser = (...props: any) => {
        const curUser = props[1];
        setCurUser({ ...curUser })
        setOpenDetails(true)
    }

    const closeDetails = () => {
        setOpenDetails(false)
    }


    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ bgcolor: '#cfe8fc', height: '100%' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead >
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="right">username</StyledTableCell>
                                    <StyledTableCell align="right">user id</StyledTableCell>
                                    <StyledTableCell align="right">email</StyledTableCell>
                                    <StyledTableCell align="right">action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user: any) => (
                                    <StyledTableRow key={user.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {user.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{user.username}</StyledTableCell>
                                        <StyledTableCell align="right">{user.id}</StyledTableCell>
                                        <StyledTableCell align="right">{user.email}</StyledTableCell>
                                        <StyledTableCell align='right'>
                                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                <Tooltip title='View' placement='top'>
                                                    <IconButton aria-label='View' onClick={(e) => viewUser(e, user)}><VisibilityIcon /></IconButton>
                                                </Tooltip>
                                                <Tooltip title='Edit' placement='top'>
                                                    <IconButton aria-label='Edit' color='secondary' onClick={(e) => onEditUser(e, user)}><EditIcon /></IconButton>
                                                </Tooltip>
                                                <Tooltip title='Delete' placement='top'>
                                                    <IconButton aria-label='Delete' color='error' onClick={(e) => onUserDelete(e, user)}><DeleteIcon /></IconButton>
                                                </Tooltip>
                                            </ButtonGroup>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Dialog
                    fullWidth={true}
                    maxWidth={'xs'}
                    open={openUserDetails}
                    onClose={closeDialog}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle sx={{ mx: 'auto' }} id="responsive-dialog-title">
                        {"User Details"}
                    </DialogTitle>
                    <DialogContent>
                        <ThemeProvider theme={lightTheme}>
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: 'background.default',
                                    display: 'grid',
                                    gridTemplateColumns: { md: '1fr' },
                                    gap: 2,
                                }}
                            >
                                {Object.entries(curUser).map((ele) => {
                                    return (
                                        <Item sx={{ width: 'auto' }} key={ele[0]} elevation={24}>
                                            {`${ele[0]}: ${ele[1]}`}
                                        </Item>
                                    )
                                })}

                            </Box>
                        </ThemeProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ mx: 'auto' }} variant="outlined" color='primary' onClick={closeDetails} autoFocus>
                            Home
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
            <Dialog
                fullScreen={fullScreen}
                open={openDialog}
                onClose={closeDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Delete confirmation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the user with id {dialogData?.id} and username {dialogData?.username}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color='error' autoFocus onClick={(e) => deleteUser(dialogData.id)}>
                        Delete
                    </Button>
                    <Button variant="outlined" color='primary' onClick={closeDialog} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Box sx={{ width: 500 }}>
                <Snackbar

                    anchorOrigin={{ vertical, horizontal }}
                    open={openSnackBar}
                    onClose={closeSnackBar}
                    message={msg}
                    key={vertical + horizontal}
                >
                    <Alert onClose={closeSnackBar} severity="success" sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>
            </Box>
        </React.Fragment>

    );
}