<template>
  <div>
    <div>
        <b-modal v-model="modalShow">话题不能超过5个!</b-modal>
    </div>
    <b-form-group label="添加话题：">
      <b-form-tags v-model="value" no-outer-focus class="mb-2">
        <template v-slot="{ tags, disabled, addTag, removeTag }">
          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
            <li v-for="tag in tags" :key="tag" class="list-inline-item">
              <b-form-tag
                @remove="removeTag(tag)"
                :title="tag"
                :disabled="disabled"
                variant="info"
              >{{ tag }}</b-form-tag>
            </li>
          </ul>

          <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
            <template v-slot:button-content>
              <b-icon icon="tag-fill"></b-icon> Choose tags
            </template>
            <b-dropdown-form @submit.stop.prevent="() => {}">
              <b-form-group
                label-for="tag-search-input"
                label="Search tags"
                label-cols-md="auto"
                class="mb-0"
                label-size="sm"
                :description="searchDesc"
                :disabled="disabled"
              >
                <b-form-input
                  v-model="search"
                  id="tag-search-input"
                  type="search"
                  size="sm"
                  autocomplete="off"
                 ></b-form-input>
              </b-form-group>
            </b-dropdown-form>
            <b-dropdown-divider></b-dropdown-divider>
            <div class="tag-list">
                <b-dropdown-item-button
                    v-for="option in availableOptions"
                    :key="option"
                    @click="onOptionClick({ option, addTag })"
                >
                {{ option }}
                </b-dropdown-item-button>
                <b-dropdown-text v-if="availableOptions.length === 0">
                    There are no tags available to select
                </b-dropdown-text>
            </div>
            
          </b-dropdown>
        </template>
      </b-form-tags>
    </b-form-group>
  </div>
</template>

<script>
  export default {
    name: 'ChooseTag',
    data() {
      return {
        options: [],
        search: '',
        value: [],
        modalShow: false
      }
    },
    created(){
        this.$axios.get('/api/tag')
            .then((res) => {
                var response = res.data;
                if (response.code == 200) {
                    response.data.tagDTOs.forEach(element => {
                        element.tags.forEach(tag => {
                            this.options.push(tag);
                        })
                    });
                } else {
                    this.toastOfDanger('服务端返回异常', '糟糕，服务器好像开小差了'+response.message);
                }
            })
            .catch((error) => { 
                this.toastOfDanger('服务端连接异常', '糟糕，服务器好像开小差了'+error);
            });
    },
    computed: {
      criteria() {
        return this.search.trim().toLowerCase()
      },
      availableOptions() {
        const criteria = this.criteria
        const options = this.options.filter(opt => this.value.indexOf(opt) === -1)
        if (criteria) {
          return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
        }
        return options
      },
      searchDesc() {
        if (this.criteria && this.availableOptions.length === 0) {
          return 'There are no tags matching your search criteria'
        }
        return ''
      }
    },
    methods: {
      onOptionClick({ option, addTag }) {
        if(this.value.length == 5){
          this.modalShow = true;
        } else {
          addTag(option)
          this.search = ''  
        }
      }
    }
  }
</script>

<style scoped>
.tag-list {
    height: 200px;
    overflow-y: auto
}
</style>>