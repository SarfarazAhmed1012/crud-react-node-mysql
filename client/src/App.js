import "./App.scss";
import { useState } from "react";
import Axios from "axios";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function App() {
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState(0);
  const [author, setAuthor] = useState("");
  const [edition, setEdition] = useState("");
  const [year, setYear] = useState(0);

  const [newYear, setNewYear] = useState(0);

  const [booksList, setBooksList] = useState([]);

  const addBook = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/create", {
      isbn: isbn,
      title: title,
      author: author,
      edition: edition,
      year: year,
    }).then(() => {
      console.log("success");
      // setIsbn("");
      // setTitle("");
      // setAuthor("");
      // setEdition("");
      // setYear("");
    });
  };

  const getBooks = () => {
    Axios.get("http://localhost:3001/books").then((response) => {
      setBooksList(response.data);
      console.log(response.data);
    });
  };

  const updateBookYear = (id) => {
    Axios.put("http://localhost:3001/update", { year: newYear, id: id }).then(
      (response) => {
        setBooksList(
          booksList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  isbn: val.isbn,
                  title: val.title,
                  author: val.author,
                  edition: val.edition,
                  year: newYear,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteBook = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setBooksList(
        booksList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <Typography variant="h3" color="primary">
        Basic CRUD on Book Management
      </Typography>
      <div className="form__group field">
        <input
          type="input"
          className="form__field"
          required
          onChange={(event) => {
            setIsbn(event.target.value);
          }}
        />
        <label htmlFor="name" className="form__label">
          ISBN
        </label>
      </div>
      <div className="form__group field">
        <input
          type="input"
          className="form__field"
          required
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <label htmlFor="name" className="form__label">
          Title
        </label>
      </div>
      <div className="form__group field">
        <input
          type="input"
          className="form__field"
          required
          onChange={(event) => {
            setAuthor(event.target.value);
          }}
        />
        <label htmlFor="name" className="form__label">
          Author
        </label>
      </div>
      <div className="form__group field">
        <input
          type="input"
          className="form__field"
          required
          onChange={(event) => {
            setEdition(event.target.value);
          }}
        />
        <label htmlFor="name" className="form__label">
          Edition
        </label>
      </div>
      <div className="form__group field">
        <input
          type="number"
          className="form__field"
          required
          onChange={(event) => {
            setYear(event.target.value);
          }}
        />
        <label htmlFor="name" className="form__label">
          Year
        </label>
      </div>
      <div>
        <Button onClick={addBook}>Add Book</Button>
      </div>
      <div>
        <Button onClick={getBooks}>Show Books</Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ISBN</StyledTableCell>
                <StyledTableCell align="right">Title</StyledTableCell>
                <StyledTableCell align="right">Author</StyledTableCell>
                <StyledTableCell align="right">Edition</StyledTableCell>
                <StyledTableCell align="right">Year</StyledTableCell>
                <StyledTableCell align="left">Update Year</StyledTableCell>
                {/* <StyledTableCell align="left">Update Year</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {booksList.map((row) => (
                <TableRow
                  key={row.isbn}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.isbn}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.title}</StyledTableCell>
                  <StyledTableCell align="right">{row.author}</StyledTableCell>
                  <StyledTableCell align="right">{row.edition}</StyledTableCell>
                  <StyledTableCell align="right">{row.year}</StyledTableCell>
                  <input
                    type="text"
                    placeholder="update year"
                    className="form__field_input"
                    onChange={(event) => {
                      setNewYear(event.target.value);
                    }}
                  ></input>
                  <Button
                    onClick={() => {
                      updateBookYear(row.id);
                    }}
                  >
                    {" "}
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      deleteBook(row.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;
