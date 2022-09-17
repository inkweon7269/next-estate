let env;
console.log('NEXT_PUBLIC_TYPE', process.env.NEXT_PUBLIC_TYPE);

switch (process.env.NEXT_PUBLIC_TYPE) {
    case 'development':
        env = 'development';
        break;
    case 'production':
        env = 'production';
        break;
    default:
        env = 'localhost';
        break;
}

const configs = {
    localhost: {
        HTTP_ONLY: false,
        baseUrl: 'http://localhost:8000',
    },
    development: {
        HTTP_ONLY: false,
        baseUrl: 'http://localhost:8000',
    },
    production: {
        HTTP_ONLY: true,
        baseUrl: 'http://localhost:8000',
    },
}[env];

export default configs;