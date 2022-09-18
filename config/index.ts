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
        baseUrl: 'http://localhost:8000',
    },
    development: {
        baseUrl: 'http://localhost:8000',
    },
    production: {
        baseUrl: 'http://localhost:8000',
    },
}[env];

export default configs;