<template>
    <div>
        <h2 v-if="user">{{user.nickname}}</h2>
        <h2 v-if="$store.state.session">{{$store.state.session.nickname}}</h2>
        <p v-if="!detail && !loading">数据丢失</p>
        <p v-if="detail">{{detail.id}}: {{detail.title}}</p>
    </div>
</template>

<script>
    import { getPostDetail } from '../utils/services';
    import { mapState, mapMutations } from 'vuex';
    export default {
        name: "PostDetail",
        props: ['id'],
        data: function () {
            return {
                detail: undefined,
                loading: true,
            }
        },
        computed: mapState({
            user: state => state.session
        }),
        async created() {
            const { err, data } = await getPostDetail(this.id);
            if (!err) {
                this.detail = data;
            }
            this.loading = false;
        }
    }
</script>

<style scoped>

</style>