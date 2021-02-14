<template>
  <div>
    <Nav />
    <div id="details">
      <div class="user_email">{{ details.user.email }}</div>
      <div class="container_details">
        <div class="title_details">{{ details.title }}</div>
        <div class="contents_details">{{ details.contents }}</div>
        <div class="createdAt_details">
          <span>
            {{ details.user.name }}
          </span>
          <span> | </span>
          <span>
            {{ details.created_at.substring(0, 10) }}
          </span>
        </div>
      </div>
      <div class="container_reply">
        <div class="reply_title">
          답변 <span class="count">{{ details.reply.length }}</span>
        </div>
        <div v-for="item in details.reply" :key="item.id" id="detail">
          <div class="box_reply">
            <div class="user_name">{{ item.user.name }}</div>
            <div class="division_reply"></div>
            <div class="contens_details">{{ item.contents }}</div>
            <div class="created_at_details_reply">
              {{ item.created_at.substring(0, 10) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "./Nav";

export default {
  name: "Details",
  components: {
    Nav,
  },
  data() {
    return {
      options: {
        params: {
          id: this.feedId,
        },
      },
      details: {},
    };
  },
  // 주소에 삽입된 params의 결과값을 반환하기 위해 compute사용
  computed: {
    feedId: function () {
      return this.$route.params.id;
    },
  },
  created: function () {
    this.options.params.id = this.feedId;

    this.$axios
      .get("https://problem.comento.kr/api/view", this.options)
      .then((response) => {
        console.log("뭘받아옴?", response.data.data);
        this.details = response.data.data;
        console.log("잘 받았어?!ㅂ", this.details);
      });
  },
};
</script>

<style lang="scss" scoped>
#details {
  // border: 1px solid #e1e4e7;
  // border-radius: 5px;
  padding: 50px 150px;
  // margin-bottom: 30px;

  .container_details {
    border: 1px solid #00c854;
    border-radius: 5px;
    padding: 0 30px;
    padding-bottom: 22px;
    margin-bottom: 30px;
  }
  .user_email {
    // margin-top: 25px;
    color: #495057;
    padding-left: 30px;
    margin-bottom: 15px;
  }
  .title_details {
    font-weight: bold;
    font-size: 18px;
    margin-top: 25px;
    margin-bottom: 15px;
    color: #282c30;
    line-height: 1.56;
  }
  .contents_details {
    font-size: 16px;
    color: #495057;
    line-height: 1.56;
  }
  .createdAt_details {
    margin-top: 21px;
    color: #adb5bd;
    font-size: 13px;
    span {
      margin-right: 10px;
    }
  }

  .container_reply {
    .reply_title {
      line-height: 1.56;
      color: #495057;
      margin-bottom: 10px;

      span {
        color: #00c854;
      }
    }

    .box_reply {
      border: 1px solid #e1e4e7;
      border-radius: 5px;
      padding: 0 30px;
      padding-bottom: 22px;
      margin-bottom: 30px;

      .user_name {
        color: #7e848a;
        margin-top: 28px;
        line-height: 1.56;
      }

      .division_reply {
        border: 1px solid #e1e4e7;
        margin-top: 10px;
        margin-bottom: 15px;
      }

      .contens_details {
        line-height: 1.56;
        color: #495057;
        margin-bottom: 21px;
      }
      .created_at_details_reply {
        color: #adb5bd;
        font-size: 13px;
      }
    }
  }
}
</style>