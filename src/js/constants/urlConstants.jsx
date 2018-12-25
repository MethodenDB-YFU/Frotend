/**
 *
 */
export const urlConstants = {
    /* methoden services */
    getAllMethods: { service: 'methoden', name:'getAllMethods', sendUserId: true},
    createMethod: { service: 'methoden', name:'createMethod', sendUserId: true},
    getAllMethodLevels: { service: 'methoden', name:'getAllMethodLevels', sendUserId: true},
    createMethodLevel: { service: 'methoden', name:'createMethodLevel', sendUserId: true},
    updateMethodLevel: { service: 'methoden', name:'updateMethodLevel', sendUserId: true},
    getAllMethodTypes: { service: 'methoden', name:'getAllMethodTypes', sendUserId: true},
    createMethodType: { service: 'methoden', name:'createMethodType', sendUserId: true},
    updateMethodType: { service: 'methoden', name:'updateMethodType', sendUserId: true},
    deleteMethod:{ service: 'methoden', name:'deleteMethod', sendUserId: true},
    getMethod: { service: 'methoden', name:'getMethod', sendUserId: true},
    updateMethod: { service: 'methoden', name:'updateMethod', sendUserId: true},
    /* goals services */
    getGoals: { service: 'goals', name:'getGoals', sendUserId: true},
    createGoal: { service: 'goals', name:'createGoal', sendUserId: true},
    deleteGoal: { service: 'goals', name:'deleteGoal', sendUserId: true},
    getGoal: { service: 'goals', name:'getGoal', sendUserId: true},
    updateGoal: { service: 'goals', name:'updateGoal', sendUserId: true},
    /* roles services */
    getRoles: { service: 'roles', name:'getRoles', sendUserId: true},
    createRole: { service: 'roles', name:'createRole', sendUserId: true},
    deleteRole: { service: 'roles', name:'deleteRole', sendUserId: true},
    getRole: { service: 'roles', name:'getRole', sendUserId: true},
    updateRole: { service: 'roles', name:'updateRole', sendUserId: true},
    /* Type services */
    getTypes: { service: 'types', name:'getTypes', sendUserId: false},
    createType: { service: 'types', name:'createType', sendUserId: false},
    deleteType: { service: 'types', name:'deleteType', sendUserId: false},
    getType: { service: 'types', name:'getType', sendUserId: false},
    updateType: { service: 'types', name:'updateType', sendUserId: false},

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
