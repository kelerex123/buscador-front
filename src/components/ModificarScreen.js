
import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { ProductsContext } from '../App';
import { fetchCrud } from '../helpers/fetch';
import { useForm } from '../hooks/useForm';

export const ModificarScreen = () => {

    const params = useParams();
    const {products, setProducts} = useContext(ProductsContext);
    const [product, handleInputChange, ,setValues] =useForm({
        name: '',
        price: '',
        stock: '',
        ecommerce: ''
    });

    const [loading, setLoading] = useState(true);

    const {name, price, stock, ecommerce} = product;

    useEffect( () => {
        let isTerminated = false;
        const getProduct = async(id) => {
            const resp = await fetchCrud(id, null);
            const {name, price, stock, ecommerce} = await resp.json();
            console.log(name + " " + price + " " + stock + " " + ecommerce);
            if(!isTerminated) {
                setValues({
                    name,
                    price,
                    stock,
                    ecommerce
                })
                setLoading(false);
            }
        }

        getProduct(params.id);
    
        return () => {
            isTerminated = true;
        }
    }, [params.id])

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (name === '' || price === '' || stock === '' || ecommerce === '') return;
        Swal.fire({
            title: 'Cargando...',
            showConfirmButton: false,
            allowOutsideClick: false,
        })
        const newProduct = {...product}
        const resp = await fetchCrud(params.id, newProduct, 'PUT')
        const msg = await resp.json();
        console.log(msg);
        setProducts(products.map( product => {
            if(product.id === params.id) {
                return {
                    ...product, ...newProduct
                }
            } else {
                return product;
            }
        }))
        Swal.close();

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El producto fue modificado',
            showConfirmButton: false,
            timer: 1500
        })
        console.log(msg);

    }

    return (
        <div className='mt-4'>
            <h2>Modificar Producto</h2>

            {
                !loading ?
                    (<form onSubmit={handleSubmit}>
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
                            <label htmlFor ="productEcommerce" className="form-label">Eccomerce</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="productEcommerce" 
                                name='ecommerce' 
                                value={ecommerce}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Modificar</button>
                    </form>)
                :
                    (
                        <div className='d-flex justify-content-center mt-5'>
                            <h1>Cargando...</h1>
                        </div>
                    )
            }
            

        </div>
    )
}
