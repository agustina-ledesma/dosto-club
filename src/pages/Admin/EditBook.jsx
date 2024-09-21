import React, { useState, useEffect } from "react";
import { Input, DatePicker, Textarea, Button, image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    titulo: "",
    autor: "",
    originalName: "",
    genero: "",
    descripcion: "",
    image: null,
  });

  /*  traer info del libro  */

  useEffect(() => {
    fetch(`https://api-dosto-club-2.onrender.com/book/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Error fetching book details:", error));
      console.log(id);
  }, [id]);

  const navigate = useNavigate();
  const getToken = () => localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleFileChange = (e) => {
    setBook({ ...book, image: e.target.files[0] });
  };

  /* const handleDateChange = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    setBook({ ...book, fechaPublicacion: formattedDate });
  }; */
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = getToken();
    
    // Verificar el valor del ID
    console.log('ID del libro:', id);
  
    // Crear un objeto FormData
    const formData = new FormData();
  
    // Agregar los campos de texto al FormData
    formData.append('titulo', book.titulo);
    formData.append('autor', book.autor);
    formData.append('originalName', book.originalName);
    formData.append('genero', book.genero);
    formData.append('descripcion', book.descripcion);
  
    // Agregar la imagen si existe
    if (book.image) {
      formData.append('image', book.image);
    }
  
    try {
      const response = await fetch(`https://api-dosto-club-2.onrender.com/book/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Libro editado con éxito:', data);
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        console.error('Error al actualizar el libro:', errorData);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  

  return (
    <div className="m-3 flex justify-center">
      <div className="w-full max-w-screen-xl ">
        <h1 className="m-3 text-2xl">Edit book {book.titulo}</h1>
        <form className="p-2" onSubmit={handleSubmit}>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 my-3">
            <Input
              type="text"
              label="Tittle"
              variant="bordered"
              name="titulo"
              id="titulo"
              className="w-full"
              value={book.titulo}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              label="Author"
              variant="bordered"
              name="autor"
              id="autor"
              className="w-full"
              value={book.autor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 my-3">
          <Input
              type="text"
              label="Original name"
              variant="bordered"
              name="originalName"
              id="originalName"
              className="w-full"
              value={book.originalName}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              label="Gender"
              variant="bordered"
              name="genero"
              id="genero"
              className="w-full"
              value={book.genero}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full my-3">
            <Textarea
              label="Description"
              variant="bordered"
              className="w-full"
              name="descripcion"
              value={book.descripcion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-3">
            <small className="text-gray-600 my-2">Portada actual:</small>
            <div className="my-3">
              <img
                src={`https://api-dosto-club-2.onrender.com/${book.imagePath}`}
                alt={book.titulo}
                style={{ width: "100px", height: "auto" }}
                className="border p-3 rounded-lg"
              />
            </div>
          </div>
          <div className="w-full my-3">
            <input
              type="file"
              name="image"
              className="w-full border p-3 rounded-lg"
              onChange={handleFileChange}
            />
          </div>
          <div className="w-full my-3">
            <Button color="primary" variant="solid" type="submit">
              Update Book
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
