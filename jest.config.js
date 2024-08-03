const config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
    },
    transformIgnorePatterns: ['/node_modules/(?!axios/)'],
    moduleNameMapper: {
        '^.+\\.svg$': 'jest-svg-transformer',
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '^axios$': 'axios/dist/node/axios.cjs',
    },
};

export default config;