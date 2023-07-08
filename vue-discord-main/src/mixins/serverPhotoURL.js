export default {
  name: "serverPhotoURL",
  methods: {
    serverPhotoURL(server) {
      return `url(${server?.photoURL || "/src/assets/default-avatar.webp"})`;
    },
  },
};
