export default {
    name: 'userPhotoURL',
    methods: {
        userPhotoURL(user) {
            return `url(${(user?.photoURL || '/src/assets/default-avatar.webp')})`;
        },
    },
};
