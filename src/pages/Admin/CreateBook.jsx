import React, { useState } from "react";
import { Input, DatePicker, Textarea, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const [book, setBook] = useState({
    titulo: "",
    autor: "",
    originalName: "",
    genero: "",
    descripcion: "",
    image: null,
  });

  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "image") {
      setBook({ ...book, image: files[0] });
    } 
  };

  const handleDateChange = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    setBook({ ...book, fechaPublicacion: formattedDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();

    const formData = new FormData();
    formData.append("titulo", book.titulo);
    formData.append("autor", book.autor);
    formData.append("originalName", book.originalName);
    formData.append("genero", book.genero);
    formData.append("descripcion", book.descripcion);
    if (book.image) {
      formData.append("image", book.image);
    }
    try {
      const response = await fetch("https://api-dosto-club-2.onrender.com/books", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Libro creado con éxito");
        navigate("/dashboard");
      } else {
        console.error("Error al crear el libro");
      }
    } catch (error) {
      console.error("Error en la solicitud", error);
    }
  };

  return (
    <div className="m-3 flex justify-center">
      <div className="w-full max-w-screen-xl ">
        <h1 className="m-3 text-2xl">Publish a new book</h1>
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
              Publish book
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;
