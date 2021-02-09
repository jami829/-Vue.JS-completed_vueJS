<template>
  <div id="filter">
    <div id="overlay" @click="handleModal"></div>
    <div id="contents_filter">
      <h2>필터</h2>
      <div id="close_icon" @click="handleModal">
        <div id="close1"></div>
        <div id="close2"></div>
      </div>
      <div>
        <div
          v-for="(item, idx) in categoryArr"
          :key="idx"
          class="input_checkbox"
        >
          <input
            type="checkbox"
            style="zoom: 1.5"
            v-model="isChecked[item.id - 1].checked"
          />
          <span>{{ item.name }}</span>
        </div>
      </div>
      <button @click="saveChecked">저장하기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["isModalOpen"],
  data() {
    return {
      categoryArr: [],
      modalOpen: this.isModalOpen,
      isChecked: this.$store.state.isChecked,
    };
  },
  methods: {
    handleModal() {
      this.$emit("close-modal");
    },
    // 체크박스 클릭할 때마다 불린 값 변동, 변동된 값을 바로 store에 영향주기 & 모달 끄기
    saveChecked() {
      this.$emit("checked");
      this.$store.commit("saveChecked", this.isChecked);
    },

    getCategory() {
      this.$axios
        .get("https://problem.comento.kr/api/category")
        .then((response) => {
          console.log("filter", response.data);
          this.categoryArr = [...response.data.category];
        });
    },
  },
  created: function () {
    this.getCategory();
    console.log("ismodal?", this.modalOpen);
  },
  mounted: function () {
    console.log("체크된거 스토어", this.$store.state.isChecked);
  },
};
</script>

<style lang="scss" scoped>
#filter {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 400;

  #overlay {
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    width: 100vw;
    height: 100vh;
  }

  #contents_filter {
    width: 460px;
    height: 268px;
    position: relative;
    padding: 15px 30px;
    background: white;

    #close_icon {
      position: absolute;
      top: 20px;
      right: 15px;
      height: 20px;

      &:hover {
        cursor: pointer;
      }

      #close1 {
        width: 15px;
        border: 1px solid #adb5bd;
        transform: rotate(45deg) translate(1.88px, 1px);
        background: #adb5bd;
      }
      #close2 {
        width: 15px;
        border: 1px solid #adb5bd;
        background: #adb5bd;
        transform: rotate(-45deg);
      }
    }
    .input_checkbox {
      font-size: 22px;
      span {
        margin-left: 1px;
        line-height: 1.56;
      }
    }
  }

  button {
    border: 0;
    background: #00c854;
    border-radius: 3px;
    margin: 30px 0;
    margin-bottom: 15px;
    float: right;
    color: white;
    width: 99px;
    height: 40px;
    font-size: 16px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>