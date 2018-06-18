
export const urlConstants = {
    /* methoden services */
    getAllMethods: { service: 'methoden', hasParameter: false, name:'getAllMethods'},
    createMethod: { service: 'methoden', hasParameter: false, name:'createMethod'},
    getAllMethodLevels: { service: 'methoden', hasParameter: false , name:'getAllMethodLevels'},
    createMethodLevel: { service: 'methoden', hasParameter: false, name:'createMethodLevel'},
    updateMethodLevel: { service: 'methoden', hasParameter: true, name:'updateMethodLevel'},
    getAllMethodTypes: { service: 'methoden', hasParameter: false, name:'getAllMethodTypes'},
    createMethodType: { service: 'methoden', hasParameter: false, name:'createMethodType'},
    updateMethodType: { service: 'methoden', hasParameter: true, name:'updateMethodType'},
    deleteMethod:{ service: 'methoden', hasParameter: true, name:'deleteMethod'},
    getMethod: { service: 'methoden', hasParameter: true, name:'getMethod'},
    updateMethod: { service: 'methoden', hasParameter: true, name:'updateMethod'},
    /* goals services */
    getGoals: { service: 'goals', hasParameter: false, name:'getGoals'},
    createGoal: { service: 'goals', hasParameter: false, name:'createGoal'},
    deleteGoal: { service: 'goals', hasParameter: true, name:'deleteGoal'},
    getGoal: { service: 'goals', hasParameter: true, name:'getGoal'},
    updateGoal: { service: 'goals', hasParameter: true, name:'updateGoal'},
    /* roles services */
    getRoles: { service: 'roles', hasParameter: false, name:'getRoles'},
    createRole: { service: 'roles', hasParameter: false, name:'createRole'},
    deleteRole: { service: 'roles', hasParameter: true, name:'deleteRole'},
    getRole: { service: 'roles', hasParameter: true, name:'getRole'},
    updateRole: { service: 'roles', hasParameter: true, name:'updateRole'},
    /* Type services */
    getTypes: { service: 'types', hasParameter: false, name:'getTypes'},
    createType: { service: 'types', hasParameter: false, name:'createType'},
    deleteType: { service: 'types', hasParameter: true, name:'deleteType'},
    getType: { service: 'types', hasParameter: true, name:'getType'},
    updateType: { service: 'types', hasParameter: true, name:'updateType'},

    /* URLs for methoden service */
    methoden: {
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
    },
    /* URLs for goal service */
    goals:{
        apiURL: 'http://localhost:8081',

        getGoals: { url: '/api/seminars/goals', method: 'GET'},
        createGoal: { url: '/api/seminars/goals', method: 'POST'},
        deleteGoal: { url: '/api/seminars/goals/', method: 'DELETE'},
        getGoal: { url: '/api/seminars/goals/', method: 'GET'},
        updateGoal: { url: '/api/seminars/goals/', method: 'PUT'}
    },
    /* URLs for role service */
    roles:{
        apiURL: 'http://localhost:8081',
        getRoles: { url: '/api/seminars/roles', method: 'GET'},
        createRole: { url: '/api/seminars/roles', method: 'POST'},
        deleteRole: { url: '/api/seminars/roles/', method: 'DELETE'},
        getRole: { url: '/api/seminars/roles/', method: 'GET'},
        updateRole: { url: '/api/seminars/roles/', method: 'PUT'}
    },
    /* URLs for type service */
    types:{
        apiURL: 'http://localhost:8081',
        getTypes: { url: '/api/seminars/types', method: 'GET'},
        createType: { url: '/api/seminars/types', method: 'POST'},
        deleteType: { url: '/api/seminars/types/', method: 'DELETE'},
        getType: { url: '/api/seminars/types/', method: 'GET'},
        updateType: { url: '/api/seminars/types/', method: 'PUT'}
    }
};
