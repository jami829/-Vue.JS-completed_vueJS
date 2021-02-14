<template>
  <div class="card">
    <div class="card_container">
      <div class="content_detail">
        <span>{{
          feed.category_id === 1
            ? "apple"
            : feed.category_id === 2
            ? "banana"
            : "coconut"
        }}</span>

        <div class="feed_id">
          {{ feed.id }}
          <div class="feed_id_info">게시글이 등록된 순서입니다.</div>
        </div>
      </div>

      <div class="division_line"></div>
      <div class="card_detail">
        <span>{{ feed.user_id }}</span>
        <span> | </span>
        <span>{{ feed.created_at.substring(0, 10) }}</span>
      </div>
      <!-- 카드 타이틀 줄기, 펼치기, 접기 -->
      <!-- <div
        class="card_title"
        v-if="feed.title.length < 100" 
        @click="goToDetails"
      > -->
      <div class="card_title" v-if="viewMore">
        <span @click="goToDetails">
          {{ feed.title }}
        </span>
        <span class="fold" v-if="viewMore" @click="view">접기</span>
      </div>
      <!-- <div
        class="card_title"
        v-else-if="feed.title.length >= 100 && !viewMore"
        @click="goToDetails"
      > -->
      <div class="card_title" v-else-if="!viewMore">
        <span @click="goToDetails">
          {{ feed.title.substring(0, 120) }}...
        </span>
        <span class="view" v-if="!viewMore" @click="view">더보기</span>
      </div>
      <!-- <div class="card_title" v-if="viewMore" @click="goToDetails">
        <span>
          {{ feed.title }}
        </span>
        <span class="view" v-if="!viewMore" @click="view">더보기</span>
      </div>
       -->

      <!-- 카드 컨텐츠 줄기, 펼치기, 접기 -->
      <div class="summary" v-if="viewMoreSub">
        <span @click="goToDetails">
          {{ feed.contents }}
        </span>
      </div>
      <div class="summary" v-else-if="!viewMoreSub">
        <span @click="goToDetails">
          {{ feed.contents.substring(0, 120) }}...
        </span>

        <span class="view_sub" v-if="!viewMoreSub" @click="viewSub"
          >더보기</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["feed"],
  data() {
    return {
      viewMore: false,
      viewMoreSub: false,
      options: {
        params: {
          id: this.feed.id,
        },
      },
      contents: {},
    };
  },
  created: function () {
    console.log("feed", this.feed);
    console.log("vu", this.viewMore);
  },
  methods: {
    view() {
      this.viewMore = !this.viewMore;
    },
    viewSub() {
      this.viewMoreSub = !this.viewMoreSub;
    },
    goToDetails() {
      this.$router.push({
        name: "details",
        params: {
          id: this.feed.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #e1e4e7;
  border-radius: 5px;
  padding: 25px 30px 21px;
  margin-bottom: 30px;

  .card_container {
    position: relative;
    .content_detail {
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #7e848a;

      .feed_id_info {
        display: none;
        position: absolute;
        top: -10%;
        right: -2%;
      }
      .feed_id {
        &:hover .feed_id_info {
          display: flex;
        }
        cursor: pointer;
      }
    }
    .division_line {
      border: 1px solid #e1e4e7;
    }
    .card_detail {
      margin-top: 17px;
      font-size: 13px;
      span {
        margin-right: 12px;
      }
    }
    .card_title {
      font-weight: bold;
      font-size: 18px;
      margin-top: 25px;
      margin-bottom: 15px;
      color: #282c30;

      &:hover {
        cursor: pointer;
      }
    }
    .summary {
      font-size: 16px;
      color: #495057;

      &:hover {
        cursor: pointer;
      }
    }
    // 타이틀
    .view {
      color: rgba(128, 128, 128, 0.473);
      margin-left: 13px;
      font-size: 13px;
      &:hover {
        cursor: pointer;
        color: black;
      }
    }
    .fold {
      color: rgba(128, 128, 128, 0.473);
      margin-left: 13px;
      font-size: 13px;
      &:hover {
        cursor: pointer;
        color: black;
      }
    }
    // 컨텐츠
    .view_sub {
      color: rgba(128, 128, 128, 0.473);
      margin-left: 13px;
      font-size: 13px;
      &:hover {
        cursor: pointer;
        color: black;
      }
    }
  }
}
</style>