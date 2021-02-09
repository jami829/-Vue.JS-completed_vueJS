<template>
  <div id="main">
    <Modal
      :isModalOpen="isModalOpen"
      @close-modal="openFilter"
      @checked="getFilterValue"
      v-if="isModalOpen"
    />
    <Nav />
    <div id="container_main">
      <div id="login_btn">
        <span>로그인</span>
      </div>
      <div id="contents_box_main">
        <div id="filter_box">
          <span id="sort">
            <div id="asc_box">
              <span
                v-if="options.params.ord === 'asc'"
                class="order_icon_active"
              >
              </span>
              <span v-else class="order_icon"></span>
              <span @click="handleAsc" id="asc">오름차순</span>
            </div>
            <div id="desc_box">
              <span
                v-if="options.params.ord === 'desc'"
                class="order_icon_active"
              ></span>
              <span v-else class="order_icon"></span>
              <span @click="handleDesc" id="desc">내림차순</span>
            </div>
          </span>
          <span id="filter_btn" @click="openFilter">필터</span>
        </div>
        <div id="container_main">
          <div v-for="(feed, idx) in feedArr" :key="idx">
            <Card :feed="feed" />
            <!-- 페이지당 받아오는 광고는 10개이지만 게시할 수 있는 광고는 페이지당 약 3개.
           따라서 어느 광고를 게시할지 특정이 되지 않아 받아온 광고를 배열에 저장 후 랜덤으로 게시하게 설정 -->
            <Ads
              :ads="adsArr[Math.floor(Math.random() * adsArr.length)]"
              v-if="(idx + 1) % 3 === 0"
            />
          </div>

          <div v-if="loading">로딩 중...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "./Modal";
import Nav from "./Nav";
import Card from "./Card";
import Ads from "./Ads";

export default {
  name: "Main",
  components: {
    Modal,
    Nav,
    Card,
    Ads,
  },
  data() {
    return {
      isModalOpen: false,
      feedArr: [],
      adsArr: [],
      data: [],
      options: {
        params: {
          page: 1,
          ord: "asc",
          limit: 10,
          category: [],
        },
      },
      loading: false,
    };
  },
  // 오름차순, 내림차순 정렬: updataed에서 실행
  // axios로 받아온 feed를 store에 저장한 후 store에서 getter로 역순한 배열을 구해놓고 여기에 computed실행해놓는다.
  computed: {
    descFeeds() {
      return this.$store.getters.descFeeds;
    },
  },
  methods: {
    // 무한 스크롤 피드 받아오기: API로부터 받아온 페이지 데이터를 이용해 다음 데이터 로드
    getFeeds() {
      // 데이터를 받아오는 동안 로딩바 렌더
      this.loading = true;
      this.$axios
        .get("https://problem.comento.kr/api/list", this.options)
        .then((response) => {
          console.log("뭘받아와 겟피드", response.data.data);
          // 기존 state 값의 불변성 유지를 위해 새로운 배열에 spread를 사용해 새로운 배열에 구현
          // this.feedArr = [...this.feedArr, ...response.data.data];
          this.$store.commit("feeds", response.data.data);
          this.feedArr = this.$store.state.feedArr;
          console.log("new Feeds", this.feedArr);
          console.log("store feeds", this.$store.state.feedArr);
        });
      // 데이터를 받아오면 로딩바 해제
      this.loading = false;
    },

    getAdsList() {
      this.$axios
        .get("https://problem.comento.kr/api/ads", this.options)
        .then((response) => {
          this.adsArr = [...this.adsArr, ...response.data.data];
          console.log("광고", this.adsArr);
        });
    },

    // 무한 스트롤 이벤트 핸들러
    async handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        this.options.params.page = this.options.params.page + 1; // 기존 state의 page 값을 변경시킨 후 axios로 다음 페이지 feeds를 불러오게 한다.
        // console.log("변경된 페이지", this.options.params.page);
        // 페이지 끝에 도달하면 추가 데이터를 받아온다.
        await this.getAdsList();
        await this.getFeeds();
      }
    },
    // 오름차순, 내림차순 정렬: updataed에서 실행
    handleAsc() {
      this.options.params.ord = "asc";
    },
    handleDesc() {
      this.options.params.ord = "desc";
    },
    openFilter() {
      this.isModalOpen = !this.isModalOpen;
    },
    // 기존 상태값을 초기화 한 후,
    // 필터체크로 인해 새로 저장된 값을 store에서 가져오고, 그 값을 상태값인 category 배열에 넣어준다.
    // 그 값으로 feed 리스트들을 axios요청하게 한다.
    // Modal 컴포넌트에서 저장버튼 눌렀을 시 작동.
    getFilterValue() {
      // this.feedArr = [];
      this.$store.commit("ressetFeeds");
      this.options.params.category = [];
      this.$store.state.isChecked.forEach((item) => {
        if (item.checked) {
          this.options.params.category = [
            ...this.options.params.category,
            item.id,
          ];
        }
      });
      if (this.isModalOpen) {
        this.openFilter();
      }
      this.getFeeds();
    },
  },
  // 스크롤 전 리스트
  created: async function () {
    this.getFilterValue();
    await this.getAdsList();
    // await this.getFeeds();
    // this.feedArr = this.$store.state.feedArr;
  },
  mounted: function () {},
  updated: function () {
    console.log("zkspxkzp", this.options.params.category);
    // scroll event listner 등록
    window.addEventListener("scroll", this.handleScroll);

    if (this.options.params.ord === "desc") {
      this.feedArr = this.descFeeds;
    } else {
      this.feedArr = this.$store.state.feedArr;
    }
  },
  // scroll event listner 해제
  destroyed: function () {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
#container_main {
  display: flex !important;
  flex-direction: column;

  #login_btn {
    display: flex;
  }
  #contents_box_main {
    // display: flex;
    padding: 40px;

    #filter_box {
      display: flex;
      justify-content: space-between;
      margin-bottom: 14px;

      #sort {
        display: flex;
        #asc_box {
          display: flex;
          align-items: center;
          margin-right: 13px;
        }
        #desc_box {
          display: flex;
          align-items: center;
        }
        .order_icon_active {
          display: inline-block;
          width: 6px;
          height: 6px;
          vertical-align: middle;
          border-radius: 10px;
          background: #00c854;
        }
        .order_icon {
          display: inline-block;
          border-radius: 10px;
          width: 6px;
          height: 6px;
          background: #e1e4e7;
        }
        span {
          &:hover {
            cursor: pointer;
          }
        }
        #asc {
          color: #495057;
          font-size: 13px;
          margin-left: 5px;
        }
        #desc {
          color: #e1e4e7;
          font-size: 13px;
          margin-left: 5px;
        }
      }
      #filter_btn {
        border: 1px solid #e1e4e7;
        border-radius: 3px;
        color: #e1e4e7;
        padding: 5px 14px 3px 12px;
        font-size: 13px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>

