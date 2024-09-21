import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth/AuthContext.jsx";
import { EditIcon } from "../../components/EditIcon.jsx";
import { DeleteIcon } from "../../components/DeleteIcon.jsx";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  Chip,
  Spinner,
} from "@nextui-org/react";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const getToken = () => localStorage.getItem("token");

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "https://api-dosto-club-2.onrender.com/books"
      );
      const data = await response.json();

      const booksWithEpubStatus = await Promise.all(
        data.map(async (book) => {
          try {
            const epubResponse = await fetch(
              `https://api-dosto-club-2.onrender.com/epub-book/${book._id}`
            );
            const epubData = await epubResponse.json();
            return {
              ...book,
              epubUploaded: epubData && epubData.filePath ? true : false,
            };
          } catch (epubError) {
            console.error(
              `Error fetching EPUB for book ${book._id}:`,
              epubError
            );
            return {
              ...book,
              epubUploaded: false,
            };
          }
        })
      );

      setBooks(booksWithEpubStatus);
      localStorage.setItem("books", JSON.stringify(booksWithEpubStatus));
    } catch (error) {
      console.error("Error fetching books", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const handleDeleteClick = (book) => {
    setSelectedBook(book);
    onOpen();
  };

  const handleDelete = async () => {
    const token = getToken();
    if (selectedBook) {
      try {
        const response = await fetch(
          `https://api-dosto-club-2.onrender.com/book/${selectedBook._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          fetchBooks();
          setSelectedBook(null);
          onOpenChange(false);
          console.log("Libro eliminado");
        } else {
          const errorData = await response.json();
          console.error("Error al eliminar el libro:", errorData);
        }
      } catch (error) {
        console.error("Error en la solicitud de eliminación:", error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <div className=" min-h-screen">
          <h1 className="m-3 text-2xl">Dashboard</h1>
          <div className="m-3">
            <Button color="primary">
              <Link to="/create-book" className="text-white">
                Publish new book
              </Link>
            </Button>
          </div>
          <div className="m-3">
            <Table aria-label="Example table with custom cells">
              <TableHeader>
                <TableColumn>IMAGE</TableColumn>
                <TableColumn>TITTLE</TableColumn>
                <TableColumn>AUTHOR</TableColumn>
                <TableColumn>ORIGINAL NAME</TableColumn>
                <TableColumn>GENDER</TableColumn>
                <TableColumn>DESCRIPTION</TableColumn>
                <TableColumn>ARCHIVE EPUB</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book._id}>
                    <TableCell>
                      <div>
                        <img
                          src={`https://api-dosto-club-2.onrender.com/${book.imagePath}`}
                          alt={book.titulo}
                          style={{ width: "100px", height: "auto" }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{book.titulo}</TableCell>
                    <TableCell>{book.autor}</TableCell>
                    <TableCell className="text-customGreen">
                      {book.originalName}
                    </TableCell>
                    <TableCell>{book.genero}</TableCell>
                    <TableCell>{book.descripcion}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {book.epubUploaded ? (
                          <Chip color="success">Uploaded</Chip>
                        ) : (
                          <Chip color="default">Not uploaded</Chip>
                        )}
                        <Tooltip content="Upload Epub">
                          <Link to={`/upload-epub/${book._id}`}>
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                              <i className="bx bx-cloud-upload bx-sm mx-3"></i>
                            </span>
                          </Link>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex">
                        <div className="m-2">
                          <Tooltip content="Edit book">
                            <Link to={`/edit-book/${book._id}`}>
                              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                              </span>
                            </Link>
                          </Tooltip>
                        </div>
                        <div className="mx-1">
                          <Tooltip content="Delete book">
                            <Button
                              isIconOnly
                              onClick={() => handleDeleteClick(book)}
                              size="sm"
                              className="bg-transparent"
                            >
                              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                              </span>
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {selectedBook && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Delete book {selectedBook.titulo}?
                </ModalHeader>
                <ModalBody>
                  <p>This action cannot be undone.</p>
                </ModalBody>
                <ModalFooter>
                  <form>
                    <Button
                      color="default"
                      variant="light"
                      onClick={onClose}
                      className="mx-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      color="danger"
                      variant="light"
                      onClick={handleDelete}
                      className="mx-1"
                    >
                      Delete
                    </Button>
                  </form>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Dashboard;
