const PATH_ROUTES_DEV = {
    'CREATE_TRACING': 'performance',
    'GET_TEAMS': 'teams',
    'CREATE_TEAM': 'team',
    'GET_TRACING': 'performances',
    'GET_USERS': 'users',
    'GET_AFFECTATIONS': 'affectations',
    'CREATE_AFFECTATION': 'affectation'
};

const PATH_ROUTES_PROD = {
    'CREATE_TRACING': 'api/performance/create',
    'GET_TEAMS': 'api/performance/team/create',
    'GET_TRACING': 'api/performance',
    'GET_PERSONS': 'api/performance/users',
    'GET_AFFECTATIONS': 'api/performance/affectations/create'
};
console.log(process.env.STAGE)
export const PATH_ROUTES = process.env.STAGE == 'DEV' ? PATH_ROUTES_DEV : PATH_ROUTES_DEV;
