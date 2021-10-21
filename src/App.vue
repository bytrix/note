<template>
  <div id="app">
    <MantModal :width="100" :visible="showContactModal" @close="showContactModal = false">
      <img style="display: block; margin: 0 auto;" src="https://qr.api.cli.im/newqr/create?data=%25E6%25B5%258B&level=H&transparent=false&bgcolor=%23FFFFFF&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&logoshape=no&size=260&kid=cliim&key=751a1a513a90cab6c2bd6269c6260d67" />
      <template>
      <div slot="footer">s</div>
      </template>
    </MantModal>
    <MantCard class="header">
      <h1>Jack's notes</h1>
      <div style="flex: 1" />
      <!-- <MantDropdown text="kk">
        <MantDropdownItem text="a" />
      </MantDropdown> -->
      <MantButton type="link" :icon="['fal', 'phone']" @click="showContactModal = true">联系我</MantButton>
      <MantButton type="primary" :icon="['fal', 'plus']" @click="newNote">新建笔记</MantButton>
    </MantCard>
    <MantEditableModal
      :visible="showNoteModal"
      :title="note.title"
      :maskClosable="false"
      @close="onClose"
    >
      {{note.content}}
      <!-- <template> -->
        <div slot="footer">a</div>
      <!-- </template> -->
    </MantEditableModal>
    <MantRow>
      <MantCol :flex="1">
        <MantCard>
          <MantTree
            :data="notes.children"
            v-on="{
              expand: onItemClick,
              add: onAdd
            }"
          >
            <template slot="right">
              <MantButton
                :icon="['fal', 'plus']"
                size="small"
                circle
                @click="onItemClick"
              />
            </template>
          </MantTree>
        </MantCard>
      </MantCol>
      <MantCol :flex="4">
        <MantCard :title="note.title">
          {{note.content}}
        </MantCard>
      </MantCol>
      <!-- <MantCol :flex="2">
        <MantCard>
          a
        </MantCard>
      </MantCol> -->
    </MantRow>
    <!-- <MantButton>aa</MantButton>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MantDesign from 'mant-design'
console.log('MantDesign', MantDesign.install)
export default {
  data() {
    return {
      showNoteModal: false,
      showContactModal: false,
      note: {},
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
    onAdd(item) {
      console.log('onadd', item)
      this.showNoteModal = true
      this.note = item
    },
    onItemClick(item) {
      console.log('item', item)
      if(!item.children) {
        this.note = item
      }
      // this.showNoteModal = true
    },
    newNote() {
      this.showNoteModal = true
    },
    onClose() {
      console.log('on close', this.note, this.note.title)
      if(this.note.title) {
        this.$store.dispatch({
          type: "addNote",
          payload: this.note
        })
      }
      this.showNoteModal = false
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
  // background-color: $block-bg-color;
  // padding: 12px;
  // display: flex;
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
  // margin: 0px;
  margin: 22px;
}

#nav {
  // padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
