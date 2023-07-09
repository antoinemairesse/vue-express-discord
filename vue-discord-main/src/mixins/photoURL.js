export default {
  name: "photoURL",
  methods: {
    userPhotoURL(user) {
      return `url(${user?.photoURL || "/src/assets/default-avatar.webp"})`;
    },
    serverPhotoURL(server) {
      return `url(${server?.photoURL || "/src/assets/default-avatar.webp"})`;
    },
  },
};
