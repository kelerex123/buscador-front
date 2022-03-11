import React from 'react'
import { fetchCrud } from '../helpers/fetch';
import { useForm } from '../hooks/useForm';
import Swal from 'sweetalert2';

export const AñadirScreen = () => {

    const [product, handleInputChange, reset] = useForm({
        name: '',
        price: '',
        stock: '',
        ecommerce: ''
    });

    const {name, price, stock, ecommerce} = product;

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (name === '' || price === '' || stock === '' || ecommerce === '') return;
        Swal.fire({
            title: 'Cargando...',
            showConfirmButton: false,
            allowOutsideClick: false,
        })
        const newProduct = {...product}
        const resp = await fetchCrud('', newProduct, 'POST')
        const msg = await resp.json();
        Swal.close();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El producto ha sido guardado',
            showConfirmButton: false,
            timer: 1500
        })
        reset();
        console.log(msg);

    }

    return (
        <div className='mt-4'>
            <h2>Añadir Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor ="productName" className="form-label">Nombre</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="productName" 
                        name='name' 
                        value={name}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor ="productPrice" className="form-label">Precio</label>
                    <input 
                        type="text"
                        className="form-control" 
                        id="productPrice" 
                        name='price' 
                        value={price} 
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor ="productStock" className="form-label">Stock</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="productStock" 
                        name='stock' 
                        value={stock}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor ="productStock" className="form-label">Eccomerce</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="productStock" 
                        name='ecommerce' 
                        value={ecommerce}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Añadir</button>
            </form>

        </div>
    )
}
