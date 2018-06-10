
export const urlConstants = {
    apiURL: 'http://localhost:1234',

    getAllMethods: { url: '/api/methods', method: 'GET'},
    createMethod: { url: '/api/methods', method: 'POST'},

    getAllMethodLevels: { url: '/api/methods/levels', method: 'GET'},
    createMethodLevel: { url: '/api/methods/levels', method: 'POST'},
    updateMethodLevel: { url: '/api/methods/types/', method: 'PUT'},

    getAllMethodTypes: { url: '/api/methods/types', method: 'GET'},
    createMethodType: { url: '/api/methods/types', method: 'POST'},
    updateMethodType: { url: '/api/methods/types/', method: 'PUT'},

    deleteMethod: { url: '/api/methods/', method: 'DELETE'},
    getMethod: { url: '/api/methods/', method: 'GET'},
    updateMethod: { url: '/api/methods/', method: 'PUT'}
};
