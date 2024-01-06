import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



export default function AddUser(props: any) {
  const [user, setUser] = useState<any>({
    name: "",
    username: "",
    email: ""
  })
  const navigate = useNavigate();
  const { id } = useParams()
  const [isEdit, setIsEdit] = useState<boolean>(false)

  useEffect(() => {
    if (id) {
      setIsEdit(true)
      loadCurrentUser()
    }
  }, [])
  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (user && user?.name.length > 0 && user?.username.length > 0 && user?.email.length > 0) {
      if (isEdit) {
        await axios.put(`http://localhost:8080/user/${id}`, user).then(() => {
          navigate("/");
        })
      } else {
        await axios.post("http://localhost:8080/user", user).then(() => {
          //navigate to home
          navigate("/");
        })
      }

    }
  }

  const onCancel = (e: any) => {
    e.preventDefault();
    navigate("/");

  }

  const { name, username, email } = user;

  const onLocalChange = (e: any) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  }

  const loadCurrentUser = async () => {
    await axios.get(`http://localhost:8080/user/${id}`).then((res) => {
      setUser(res.data)
    })

  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">

        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Update' : 'Create'} User Form
        </Typography>
        <div className='row gap-2'>
          <Typography variant="h6" gutterBottom>
            Name
          </Typography>
          <TextField fullWidth label="Enter your name" id="name" value={name} onChange={(e) => onLocalChange(e)} />
          <Typography variant="h6" gutterBottom>
            Username
          </Typography>
          <TextField fullWidth label="Enter username" id="username" value={username} onChange={(e) => onLocalChange(e)} />
          <Typography variant="h6" gutterBottom>
            Email
          </Typography>
          <TextField fullWidth label="Enter email" id="email" value={email} className='mb-3' onChange={(e) => onLocalChange(e)} />
        </div>

        <div aria-label="outlined primary button group">
          <Button color="success" className='mx-2' variant="contained" onClick={(e) => onSubmit(e)}>
            {isEdit ? 'Update' : 'Submit'}
          </Button>
          <Button color="error" className='ms-2' variant="contained" onClick={(e) => onCancel(e)}>
            Cancel
          </Button>
        </div>

      </Container>
    </React.Fragment>
  )
}
