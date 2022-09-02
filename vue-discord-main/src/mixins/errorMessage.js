export default {
    name: 'errorMessage',
    methods: {
        errorMessage({response}, key, callback) {
            if(response.status === 403) this.message.error(this.$t('forbidden'));
            else this.message.error(this.$t(key));
            if(callback) callback(response.status);
        },
    },
};
