<template>
  <div id="app">
    <MantSpin :loading="loading">
    <MantModal width="400px" :visible="showContactModal" @close="showContactModal = false">
      <img style="display: block; margin: 0 auto;" src="https://626c-blog-api-2g8nea5tcfdeadd4-1304508799.tcb.qcloud.la/WechatIMG27.jpeg?sign=b6cd52f67aba4f42d573912c6726be0a&t=1635038074" />
      <template slot="footer"><MantIcon :icon="['fal', 'envelope']" style="padding: 3px 9px 3px 3px"/>wengzhijie@126.com</template>
    </MantModal>
    <MantCard class="header">
      <h1>🌱Jack's notes</h1>
      <div style="flex: 1" />
      <MantButton type="link" :icon="['fab', 'weixin']" @click="showContactModal = true" plain circle></MantButton>
      <MantButton type="primary" :icon="['fal', 'plus']" @click="onNewNote">新建笔记</MantButton>
    </MantCard>

    <!-- 新增笔记 -->
    <MantEditableModal
      :visible="showNoteModal"
      :title="newNote.title"
      :maskClosable="false"
      @change="onNoteChange"
      @close="onSave"
    >
      {{note.content}}
      <div slot="footer">
        <MantButton type="primary" @click="onSave" :disabled="!newNote.title">保存</MantButton>
      </div>
    </MantEditableModal>

    <!-- <MantEditableModal
      :visible="showNoteModal"
      :title="eval(`this.${genericFormData['C']}`).title"
      :maskClosable="false"
      @change="onNoteChange"
      @close="onSave"
    >
      {{note.content}}
      <div slot="footer">
        1{{eval(`this.${genericFormData['C']}`).title}}12
        <MantButton type="primary" @click="onSave" :disabled="!eval(`this.${genericFormData['C']}`).title">保存</MantButton>
      </div>
    </MantEditableModal> -->

    <MantRow :gutter="[0, 14]">
      <MantCol :flex="'none'" style="width: 300px">
          <MantTree
            :data="notes"
            v-on="{
              expand: onItemClick,
              add: onAdd
            }"
            style="padding: 12px !important"
            :properties="{
              id: '_id'
            }"
          >
            <template slot-scope="{item}">
              <MantDropdown :icon="['fal', 'ellipsis-v']" :trigger="['click']" style="display: inline-block; padding: 0px; transform: translateY(2px)">
                <MantDropdownItem :icon="['fal', 'trash-alt']" @click="onItemDelete(item)" text="删除"/>
              </MantDropdown>
              <MantButton
                :icon="['fal', 'plus']"
                size="small"
                circle
                type="link"
                style="margin-right: 0px"
                @click="onItemAdd(item)"
              />
            </template>
          </MantTree>
      </MantCol>
      <MantCol :flex="1" style="width: 0px">
        <MantCard>
          <template slot="header">
            <div>
              <div class="title">{{note.title}}</div>
              <div class="create_time">{{note.create_time}}</div>
            </div>
          </template>
          <!-- <div v-html="marked(note.content || '')" /> -->
          <!-- <vue-mathjax :formula="note.content"></vue-mathjax> -->
          <markdown-it-vue class="md-body" :content="note.content || ''" />
        </MantCard>
      </MantCol>
    </MantRow>
    </MantSpin>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import marked from 'marked'
export default {
  data() {
    return {
      loading: true,
      showNoteModal: false,
      showContactModal: false,
      note: {},
      newNote: {},
      genericFormData: {
        'C': 'newNote',
        'R': 'note',
        'U': '',
        'D': ''
      }
    }
  },
  mounted() {
    this.$store.dispatch({
      type: "getNotes"
    }).then(() => {
      setTimeout(() => {
        this.loading = false
      }, 700);
    })
  },
  computed: {
    ...mapGetters(['notes'])
  },
  methods: {
    marked,
    eval(x) {
      return eval(x)
    },
    onItemDelete(item) {
      this.$store.dispatch({
        type: "deleteNote",
        payload: item
      }).then(() => {
        this.$store.dispatch({
          type: "getNotes"
        })
      })
    },
    onAdd(item) {
      this.showNoteModal = true
      this.note = item
    },
    onItemClick(item) {
      if(!item.children) {
        this.note = item
      }
    },
    onItemAdd(item) {
      this.showNoteModal = true
      this.newNote.parent_id = item._id
    },
    onNewNote() {
      this.showNoteModal = true
    },
    onSave() {
      if(this.newNote.title) {
        this.$store.dispatch({
          type: "addNote",
          payload: this.newNote
        }).then(() => {
          this.$store.dispatch({
            type: "getNotes"
          })
          this.newNote = {}
        })
      }
      this.showNoteModal = false
    },
    onNoteChange(note) {
      // this.newNote.title = note.title
      console.log(eval(`this.${this.genericFormData['C']}`))
      eval(`this.${this.genericFormData['C']}`).title = note.title
      this.newNote.content = note.content
    }
  }
}
</script>

<style lang="scss">
// color
$bg-color: #030303;
$primary-color: #bbe666;
$text-color: rgb(124,131,144);
$text-color-dark: #253615;
$heading-color: #fbfdfd;
$block-bg-color: rgb(25,31,40); //1a1f28
$block-bg-color-secondary: rgb(34,44,52); //222c34
$border-color: #24282d;

// size
$border-radius: 18px;
$font-size-base: 14px;
$font-size-lg: $font-size-base + 2px;
$font-size-sm: $font-size-base - 2px;

$duration: 0.3s;

.create_time {
  font-size: 14px;
  margin-bottom: 22px;
  color: darken($color: $text-color, $amount: 15);
}

h1 {
  font-size: 28px;
  color: $heading-color;
}
.mant-tree {
  .item .text {
    width: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.markdown-body pre {
  background-color: $block-bg-color-secondary !important;
  padding: 12px;
  code {
    color: $text-color;
  }
}

.markdown-body {
  color: #fff !important;
  // width: 0px;
  * {
    white-space: break-spaces;
  }
  blockquote {
    border-left-color: $block-bg-color-secondary !important;
  }
  th, td {
    color: $text-color;
    background-color: $block-bg-color-secondary;
    border-color: $border-color !important;
  }
  ul, a, p {
    color: $text-color !important;
  }
  .katex {
    color: #fff;
  }
  .katex-display {
    text-align: left;
  }
  h2 {
    border-bottom-color: $border-color !important;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px !important;
}
.header {
  .non-footer {
    display: flex;
    h1 {
      margin: 0px;
    }
  }
}
.non-footer {
  img {
    max-width: 100%;
    // width: 100px;
  }
}
.mant-tree {
  padding: 0px !important;
}
body {
  margin: 22px;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
