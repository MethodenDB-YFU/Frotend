/**
 * 
 */
export const urlConstants = {
    /* methoden services */
    getAllMethods: { service: 'methoden', name:'getAllMethods'},
    createMethod: { service: 'methoden', name:'createMethod'},
    getAllMethodLevels: { service: 'methoden', name:'getAllMethodLevels'},
    createMethodLevel: { service: 'methoden', name:'createMethodLevel'},
    updateMethodLevel: { service: 'methoden', name:'updateMethodLevel'},
    getAllMethodTypes: { service: 'methoden', name:'getAllMethodTypes'},
    createMethodType: { service: 'methoden', name:'createMethodType'},
    updateMethodType: { service: 'methoden', name:'updateMethodType'},
    deleteMethod:{ service: 'methoden', name:'deleteMethod'},
    getMethod: { service: 'methoden', name:'getMethod'},
    updateMethod: { service: 'methoden', name:'updateMethod'},
    /* goals services */
    getGoals: { service: 'goals', name:'getGoals'},
    createGoal: { service: 'goals', name:'createGoal'},
    deleteGoal: { service: 'goals', name:'deleteGoal'},
    getGoal: { service: 'goals', name:'getGoal'},
    updateGoal: { service: 'goals', name:'updateGoal'},
    /* roles services */
    getRoles: { service: 'roles', name:'getRoles'},
    createRole: { service: 'roles', name:'createRole'},
    deleteRole: { service: 'roles', name:'deleteRole'},
    getRole: { service: 'roles', name:'getRole'},
    updateRole: { service: 'roles', name:'updateRole'},
    /* Type services */
    getTypes: { service: 'types', name:'getTypes'},
    createType: { service: 'types', name:'createType'},
    deleteType: { service: 'types', name:'deleteType'},
    getType: { service: 'types', name:'getType'},
    updateType: { service: 'types', name:'updateType'},

    /* URLs for methoden service */
    methoden: {
        apiURL: 'http://localhost:8082',

        getAllMethods: { url: '/api/methods', method: 'GET',  hasParameter: false},
        createMethod: { url: '/api/methods', method: 'POST',  hasParameter: false},
    
        getAllMethodLevels: { url: '/api/methods/levels', method: 'GET', hasParameter: false},
        createMethodLevel: { url: '/api/methods/levels', method: 'POST', hasParameter: false},
        updateMethodLevel: { url: '/api/methods/types/', method: 'PUT', hasParameter: true},
    
        getAllMethodTypes: { url: '/api/methods/types', method: 'GET', hasParameter: false},
        createMethodType: { url: '/api/methods/types', method: 'POST', hasParameter: false},
        updateMethodType: { url: '/api/methods/types/', method: 'PUT', hasParameter: true},
    
        deleteMethod: { url: '/api/methods/', method: 'DELETE', hasParameter: true},
        getMethod: { url: '/api/methods/', method: 'GET', hasParameter: true},
        updateMethod: { url: '/api/methods/', method: 'PUT', hasParameter: true}
    },
    /* URLs for goal service */
    goals:{
        apiURL: 'http://localhost:8081',

        getGoals: { url: '/api/seminars/goals', method: 'GET', hasParameter: false},
        createGoal: { url: '/api/seminars/goals', method: 'POST', hasParameter: false},
        deleteGoal: { url: '/api/seminars/goals/', method: 'DELETE', hasParameter: true},
        getGoal: { url: '/api/seminars/goals/', method: 'GET', hasParameter: true},
        updateGoal: { url: '/api/seminars/goals/', method: 'PUT', hasParameter: true}
    },
    /* URLs for role service */
    roles:{
        apiURL: 'http://localhost:8081',
        getRoles: { url: '/api/seminars/roles', method: 'GET', hasParameter: false},
        createRole: { url: '/api/seminars/roles', method: 'POST', hasParameter: false},
        deleteRole: { url: '/api/seminars/roles/', method: 'DELETE', hasParameter: true},
        getRole: { url: '/api/seminars/roles/', method: 'GET', hasParameter: true},
        updateRole: { url: '/api/seminars/roles/', method: 'PUT', hasParameter: true}
    },
    /* URLs for type service */
    types:{
        apiURL: 'http://localhost:8081',
        getTypes: { url: '/api/seminars/types', method: 'GET', hasParameter: false},
        createType: { url: '/api/seminars/types', method: 'POST', hasParameter: false},
        deleteType: { url: '/api/seminars/types/', method: 'DELETE', hasParameter: true},
        getType: { url: '/api/seminars/types/', method: 'GET', hasParameter: true},
        updateType: { url: '/api/seminars/types/', method: 'PUT', hasParameter: true}
    }
};
