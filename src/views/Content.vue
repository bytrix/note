<template>
    <MantSpin :loading="loading">
        <MantCard v-if="note._id">
            <template slot="header">
                <div class="title">{{note.title}}</div>
                <div class="create_time">{{note.create_time}}</div>
            </template>
            <markdown-it-vue :content="note.content" />
        </MantCard>
        <MantCard v-else title="404">
            <MantIcon size='lg' :icon="['fas', 'flushed']" />
            咦？你似乎来到了火星～
        </MantCard>
    </MantSpin>
</template>

<script>
import { mapGetters } from 'vuex'
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
console.log('MarkdownItVue', MarkdownItVue)
export default {
    computed: {
        ...mapGetters(['note']),
    },
    components: {
        MarkdownItVue
    },
    data() {
        return {
            loading: false
        }
    },
    watch: {
        $route: {
            handler(to) {
                this.loading = true
                const _id = to.params.id
                this.$store.dispatch({
                    type: 'getNote',
                    payload: {
                        _id
                    }
                }).then(() => {
                    setTimeout(() => {
                        this.loading = false
                    }, 500);
                })
            },
            deep: true
        }
    },
    mounted() {
        const _id = this.$route.params.id
        if(!_id) {
            return
        }
        this.$store.dispatch({
            type: 'getNote',
            payload: {
                _id
            }
        })
    }
}
</script>

<style scope>
.create_time {
    font-size: 14px;
}
.title {
    font-size: 2em !important;
}
</style>