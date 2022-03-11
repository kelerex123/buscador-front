import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {fetchCrud} from '../helpers/fetch';
import {ProductsContext} from '../App';

export const TablaScreen = () => {

    const {products, setProducts} = useContext(ProductsContext)
    const [loading, setLoading] = useState(true)

    let navigate = useNavigate();


    useEffect( () => {
        let isTerminated = false;
        const getProducts = async() => {
            const resp = await fetchCrud('', null);
            const data = await resp.json();
            console.log(data);
            if(!isTerminated) {
                setProducts([...data].sort( (a,b) => {
                    return a.id-b.id;
                }));
                setLoading(false);
            }
        }

        getProducts();
    
        return () => {
            isTerminated = true;
        }
    },[])

    const handleClick = () => {
        navigate('/anadir');
    }
 
    const handleDelete = async(id) => {        

        const resp = await fetchCrud(id, null, 'DELETE')
        const msg = await resp.json();
        setProducts( products.filter( product => product.id !== id ) )
        console.log(msg);
    }

    return (
        <>  
            <div className='d-flex justify-content-end mt-5'>
                <button className='btn btn-primary' onClick={ handleClick }>Añadir Producto</button>
            </div>
            {
                loading
                    ?   
                        (
                            <div className='d-flex justify-content-center mt-5'>
                                <h1>Cargando...</h1>
                            </div>
                        )
                    :
                        (
                            <table className="table mt-3">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Eccomerce</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map( (product, i) => (
                                            <tr key={product.id}>
                                                <th scope="row">{i+1}</th>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>{product.stock}</td>
                                                <td>{product.ecommerce}</td>
                                                <td className=''>
                                                    <div className='d-flex justify-content-between'>
                                                        <button className='btn btn-primary' onClick={ () => navigate(`/modificar/${product.id}`)}>Modificar</button>
                                                        <button className='btn btn-warning' onClick={ () => handleDelete(product.id)}>Eliminar</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }            
                                </tbody>
                            </table>
                        )
                    
            }
            
        </>
        
    )
}
