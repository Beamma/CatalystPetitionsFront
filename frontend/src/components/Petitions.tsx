import { Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import React from "react";
import NavBar from './NavBar';
import CSS from 'csstype';

const Petitions = () => {

    const [petitions, setPetitions] = React.useState<petitionReturn>({petitions: [], count: 0});

    interface HeadCell {
        id: string;
        label: string;
        numeric: boolean;
    }
    
    const headCells: readonly HeadCell[] = [
        {id: 'Image', label: 'Image', numeric: false},
        { id: 'Title', label: 'Title', numeric: false },
        { id: 'CreationDate', label: 'Creation Date', numeric: false },
        { id: 'Category', label: 'Category', numeric: false },
        { id: 'Owner', label: 'Owner', numeric: false },
    ];

    const card: CSS.Properties = {
        padding: "10px",
        margin: "20px",
    }

    React.useEffect(() => {
        getAllPetitions()
    }, [])

    const getAllPetitions = () => {
        axios.get("http://localhost:4941/api/v1/petitions")
            .then((reponse) => {
                setPetitions(reponse.data)
                console.log(petitions);
            })
    }

    const petition_rows = () => {
        return petitions.petitions.map((row: petition) =>
            <TableRow hover
                tabIndex={-1}
                key={row.petitionId}>
                <TableCell align="left"><img src={'http://localhost:4941/api/v1/petitions/' + row.petitionId +'/image'} width={150} height={150}></img></TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.creationDate}</TableCell>
                <TableCell align="left">{row.categoryId}</TableCell>
                <TableCell align="left">{row.ownerFirstName} {row.ownerLastName}</TableCell>
            </TableRow>
        )
        }

    return (
        <div>
            <NavBar></NavBar>
            <Paper elevation={3} style={card}>
                <h1>Petitions</h1>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        // align={headCell.numeric ? 'left' : 'right'}
                                        padding={'normal'}>
                                        {headCell.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                    <TableBody>
                        {petition_rows()}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* <Paper elevation={3} style={card}>
                <h1>Add a new user</h1>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <TextField id="outlined-basic" label="Username" variant="outlined" value={addUserUsername}
                        onChange={(event) => setAddUserUsername(event.target.value)} />
                    <Button variant="outlined" onClick={() => { addUser() }}>
                        Submit
                    </Button>
                </Stack>
            </Paper> */}

            {/* <Snackbar
                autoHideDuration={6000}
                open={snackOpen}
                onClose={handleSnackClose}
                key={snackMessage}>
                <Alert onClose={handleSnackClose} severity="success" sx={{width: '100%'}}>
                    {snackMessage}
                </Alert>
            </Snackbar> */}
        </div>
    )
}

export default Petitions;