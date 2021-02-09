<template>
  <div class="ads">
    <div class="sponsored">sponsored</div>
    <div class="container_ads">
      <div class="photo">
        <img :src="`https://cdn.comento.kr/assignment/${ads.img}`" />
      </div>
      <div class="cotents_box_ads">
        <!-- 카드 타이틀 줄기, 펼치기, 접기 -->
        <div class="title_ads" v-if="ads.title.length < 100">
          {{ ads.title }}
        </div>
        <div class="title_ads" v-else-if="ads.title.length >= 100 && !viewMore">
          {{ ads.title.substring(0, 120) }}...
        </div>

        <div class="title_ads" v-if="viewMore">{{ ads.title }}</div>

        <span class="view_ads" v-if="!viewMore" @click="view">더보기</span>
        <span class="fold_ads" v-if="viewMore" @click="view">접기</span>
        <!-- 카드 컨텐츠 줄기이, 펼치기, 접기 -->
        <div class="contents_ads" v-if="ads.contents.length < 100">
          {{ ads.contents }}
        </div>
        <div
          class="contents_ads"
          v-else-if="ads.contents.length >= 100 && !viewMoreSub"
        >
          {{ ads.contents.substring(0, 120) }}...
        </div>
        <!-- <div class="contents_ads">{{ ads.contents }}</div> -->
        <div class="contents_ads" v-if="viewMoreSub">{{ ads.contents }}</div>
        <span class="view_sub_ads" v-if="!viewMoreSub" @click="viewSub"
          >더보기</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ads",
  props: ["ads"],
  data() {
    return {
      viewMore: false,
      viewMoreSub: false,
      adsArr: this.ads,
    };
  },
  methods: {
    view() {
      this.viewMore = !this.viewMore;
    },
    viewSub() {
      this.viewMoreSub = !this.viewMoreSub;
    },
  },
};
</script>

<style lang="scss" scoped>
.ads {
  border: 1px solid #e1e4e7;
  border-radius: 5px;
  padding: 25px 30px 21px;
  margin-bottom: 30px;

  .sponsored {
    font-size: 13px;
    color: #adb5bd;
    margin-bottom: 17.5px;
  }
  .container_ads {
    position: relative;
    display: flex;
    .photo {
      margin-right: 29.5px;
      img {
        border-radius: 3px;
        width: 310px;
        height: 179px;
        object-fit: cover;
      }
    }
    .cotents_box_ads {
      .title_ads {
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 15px;
        line-height: 1.56;
        color: #282c30;
      }
      .contents_ads {
        font-size: 16px;
        line-height: 1.56;
        color: #495057;
      }
    }
    // 타이틀
    .view_ads {
      color: rgba(128, 128, 128, 0.473);
      position: absolute;
      top: 35px;
      right: 0px;
      font-size: 13px;
      &:hover {
        cursor: pointer;
        color: black;
      }
    }
    .fold_ads {
      color: rgba(128, 128, 128, 0.473);
      position: absolute;
      top: 120px;
      right: 0px;
      font-size: 13px;
      &:hover {
        cursor: pointer;
        color: black;
      }
    }
    // 컨텐츠
    .view_sub_ads {
      color: rgba(128, 128, 128, 0.473);
      position: absolute;
      top: 105px;
      right: 0px;
      font-size: 13px;
      &:hover {
        cursor: pointer;
        color: black;
      }
    }
  }
}
</style>