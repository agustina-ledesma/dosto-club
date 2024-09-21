import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteIcon } from "../../components/DeleteIcon.jsx";
import { EditIcon } from "../../components/EditIcon.jsx";
import {
  Button,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";

const UploadEpub = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [epubId, setEpubId] = useState(null); 
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchEpub = async () => {
      try {
        const response = await fetch(`https://api-dosto-club-2.onrender.com/epub-book/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched EPUB data:", data);
        if (data.fileName) {
          setFileName(data.fileName); // Actualiza el nombre del archivo
          setEpubId(data._id); // Guarda el _id del EPUB
        }
      } catch (error) {
        console.error("Error fetching EPUB data", error);
      }
    };

    fetchEpub();
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("epub", file);

    try {
      const response = await fetch(`https://api-dosto-club-2.onrender.com/epub/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("EPUB subido con éxito");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en la solicitud", error);
    }
  };

  const handleDelete = async () => {
    if (!epubId) {
      console.error("No EPUB ID available for deletion");
      return;
    }

    try {
      const response = await fetch(`https://api-dosto-club-2.onrender.com/epub/${epubId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("EPUB eliminado con éxito");
      setFileName(""); 
      setEpubId(null); 
      onOpenChange();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en la solicitud de eliminación", error);
    }
  };

  return (
    <>
      <div className="w-full max-w-screen-xl mx-auto">
        <h1 className="m-3 text-2xl">Upload Epub</h1>
        {fileName && (
          <div className="mx-3 bg-slate-50 py-4 rounded-lg">
            <div className="flex justify-between">
              <div className="m-2">
                <Chip color={fileName ? "success" : "default"}>
                  {fileName || "No file uploaded"}
                </Chip>
              </div>
              <div className="mx-1">
                <Tooltip content="Delete Epub">
                  <Button
                    onPress={onOpen}
                    isIconOnly
                    size="sm"
                    className="bg-transparent m-1"
                  >
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon />
                    </span>
                  </Button>
                </Tooltip>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          ¿Delete Epub?
                        </ModalHeader>
                        <ModalBody>
                          <p>Are you sure you want to delete this EPUB file?</p>
                          <form>
                            <Button
                              color="default"
                              variant="light"
                              onPress={onClose}
                            >
                              Close
                            </Button>
                            <Button
                              color="danger"
                              onPress={() => {
                                handleDelete();
                                onClose();
                              }}
                              className="m-3"
                            >
                              Delete
                            </Button>
                          </form>
                        </ModalBody>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            </div>
          </div>
        )}
        <div>
          <form className="mx-3" onSubmit={handleSubmit}>
            <div className="w-full my-3">
              <p className="my-3">Load the epub file of the book</p>
              <input
                type="file"
                name="epub"
                id="epub"
                aria-label="epub"
                className="w-full border p-3 rounded-lg"
                onChange={handleFileChange}
              />
            </div>
            <div className="w-full my-3">
              <Button color="primary" variant="solid" type="submit">
                Upload Epub
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadEpub;
