import { setIsLoading } from 'react'

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';


export const TablaProductos = ({ isAdmin }) => {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para controlar la apertura/cierre del modal
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        descripcion: '',
        precioPorMoneda: '',
        compania:'' 
    });

    useEffect(() => {
        
        fetch("http://localhost:8080/api/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);



    const handleOpenModal = () => {
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDelete = (productId) => {
        
        fetch(`http://localhost:8080/api/products/${productId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            // Si la eliminación es exitosa, puedes realizar alguna acción adicional, como actualizar la lista de productos en el front-end
            setData(prevData => prevData.filter(item => item.id !== productId))
            console.log('Producto eliminado exitosamente');
          })
          .catch(error => {
            console.error('Error:', error);
          });

        console.log("Eliminar producto con ID:", productId);
      };

    const handleSave = () => {
        // Aquí enviarías formData al servicio
        console.log("Datos a guardar:", formData);
        // Luego de enviar los datos, puedes cerrar el modal
        setModalIsOpen(false);
    };


    return (
        <div>
            {(
                <button disabled={!isAdmin} onClick={handleOpenModal}>Create</button>
            )}
            {/* Se muestra el spinner si isLoading es true */}
            {isLoading ? (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripcion</th>
                            <th>Empresa</th>
                            {isAdmin && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>{item.companyId}</td>
                                {isAdmin && (
                                    <td>
                                        <button onClick={() => handleEdit(item.id)}>Edit</button>
                                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Modal"
            >
                <h2>Nuevo Producto</h2>
                <form>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Precio:</label>
                        <input type="number" name="precio" value={formData.precio} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Precio por Moneda:</label>
                        <input type="text" name="precioPorMoneda" value={formData.precioPorMoneda} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Compañía:</label>
                        <input type="text" name="compania" value={formData.compania} onChange={handleChange} />
                    </div>
                </form>
                <button onClick={handleSave}>Guardar</button>
                <button onClick={handleCloseModal}>Cancelar</button>
            </Modal>
        </div>
    );
};
