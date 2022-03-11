
const baseUrl = 'http://localhost:3001/api/products'

export const fetchCrud = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;

    if ( method === 'GET' ) {
        return fetch( url );
    } else if ( method === 'DELETE') {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            }
        });
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}