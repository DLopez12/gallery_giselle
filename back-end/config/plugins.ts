export default ({ env }) => ({
    upload: {
        config: {
            breakpoints: {
                xlarge: 1920,
                large: 1000,
                medium: 750,
                small: 500,
                thumbnail: 232,
            },
            provider: 'local',
            providerOptions: {
                sizeLimit: 250 * 1024 * 1024, // 250 MB
            },
        },
    },
    'users-permissions': {
        config: {
            jwtSecret: env('JWT_SECRET'),
        },
    },
});
