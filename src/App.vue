<template>
  <div id="app">
    <MantModal width="400px" :visible="showContactModal" @close="showContactModal = false">
      <img style="display: block; margin: 0 auto;" src="https://qr.api.cli.im/newqr/create?data=%25E6%25B5%258B&level=H&transparent=false&bgcolor=%23FFFFFF&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&logoshape=no&size=260&kid=cliim&key=751a1a513a90cab6c2bd6269c6260d67" />
      <template slot="footer"><MantIcon :icon="['fal', 'envelope']" style="padding: 3px 9px 3px 3px"/>wengzhijie@126.com</template>
    </MantModal>
    <MantCard class="header">
      <h1>Jack's notes</h1>
      <div style="flex: 1" />
      <MantButton type="link" :icon="['fab', 'weixin']" @click="showContactModal = true" plain circle></MantButton>
      <MantButton type="primary" :icon="['fal', 'plus']" @click="onNewNote">新建笔记</MantButton>
    </MantCard>
    <MantEditableModal
      :visible="showNoteModal"
      :title="eval(`this.${genericFormData['C']}`).title"
      :maskClosable="false"
      @change="onNoteChange"
      @close="onClose"
    >
      {{note.content}}
      <div slot="footer">
        <MantButton type="primary">保存</MantButton>
      </div>
    </MantEditableModal>
    <MantRow :gutter="[0, 14]">
      <MantCol :flex="2">
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
              <MantDropdown text="more" :trigger="['click']" style="display: inline-block; padding: 0px">
                <MantDropdownItem @click="onItemDelete(item)" text="delete"/>
              </MantDropdown>
              <MantButton
                :icon="['fal', 'plus']"
                size="small"
                circle
                style="margin-right: 0px"
                @click="onItemAdd(item)"
              />
            </template>
          </MantTree>
      </MantCol>
      <MantCol :flex="4">
        <MantCard :title="note.title">
          <div v-html="marked(note.content || '')" />
        </MantCard>
      </MantCol>
    </MantRow>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import marked from 'marked'
export default {
  data() {
    return {
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
    onClose() {
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
      this.newNote.title = note.title
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

h1 {
  font-size: 28px;
  color: $heading-color;
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
