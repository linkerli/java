 <template>
  <div class="game-cont">

    <div :class='{"real-img-wrapper": true, "show": isSuccess}'>
      <img :src="realImg" />
    </div>

    <div :class='{"game-menu1": true, "hide": isSuccess}'>
      <div class="row-wrapper">
        <div
          v-for="(number) in levelArray.slice(0, 3)"
          :key="number.id"
          :class="{'game-item': true, 'empty': number == 9}"
          @click="changeNumber(number)"
        >
          <span>{{number}}</span>
          <img :src="imgs[number-1]" />
        </div>
      </div>
      <div class="row-wrapper">
        <div
          v-for="(number) in levelArray.slice(3, 6)"
          :key="number.id"
          :class="{'game-item': true, 'empty': number == 9}"
          @click="changeNumber(number)"
        >
          <span>{{number}}</span>
          <img :src="imgs[number-1]" />
        </div>
      </div>
      <div class="row-wrapper">
        <div
          v-for="(number) in levelArray.slice(6, 9)"
          :key="number.id"
          :class="{'game-item': true, 'empty': number == 9}"
          @click="changeNumber(number)"
        >
          <span>{{number}}</span>
          <img :src="imgs[number-1]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/// 华容道第二版
export default {
  name: "Page11",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      levelArray: [],
      imgs: [
        require("../assets/images/huarong_01.png"),
        require("../assets/images/huarong_02.png"),
        require("../assets/images/huarong_03.png"),
        require("../assets/images/huarong_04.png"),
        require("../assets/images/huarong_05.png"),
        require("../assets/images/huarong_06.png"),
        require("../assets/images/huarong_07.png"),
        require("../assets/images/huarong_08.png"),
        require("../assets/images/huarong_09.png")
      ],
      isGameStart: false,
      realImg: require("../assets/images/img11.jpg"),
      isSuccess: false
    };
  },
  mounted: function() {
    // 初始化页面
    let level = 3;
    for (let i = 1; i < level * level; i++) {
      this.levelArray.push(i);
    }
    this.levelArray.push(level * level);
    this.gameStart();
  },
  methods: {
    // 游戏开始
    gameStart: function() {
      this.createPage();
      this.isGameStart = true;
    },

    // 创建游戏页面
    createPage: function() {
      let gameArr = [];
      let level = 3;
      for (let i = 1; i < level * level; i++) {
        gameArr.push(i);
      }
      // 随机重排
      gameArr = this.shuffle(gameArr);
      this.levelArray = gameArr;
      gameArr.push(level * level);
    },
    // 点击交换数字
    changeNumber: function(value) {
      // 根据传入的number，来计算index
      let ele = 0;

      for (let i = 0; i < this.levelArray.length; i++) {
        if (this.levelArray[i] == value) {
          ele = i;
        }
      }

      let level = 3;
      // let activeIndex = ele; // 下标数字
      let activeNumber = this.levelArray[ele]; // 下标内容数字

      // 点击不为空0的方块时执行
      if (activeNumber != 0) {
        // 获取上下左右的数字
        let emptyNum = parseInt(level * level);
        let topNum = this.levelArray[ele - level];
        let leftNum = this.levelArray[ele - 1];
        let rightNum = this.levelArray[ele + 1];
        /// 判断是不是最右侧
        if ((ele + 1) % level == 0) {
          rightNum = undefined;
        }

        if (ele % level == 0) {
          leftNum = undefined;
        }

        let bottomNum = this.levelArray[ele + level];

        console.log(">>>>>> this.levelArray", this.levelArray);
        if (topNum == emptyNum) {
          this.$set(this.levelArray, ele, emptyNum);
          this.$set(this.levelArray, ele - level, activeNumber);
        }
        if (leftNum == emptyNum) {
          this.$set(this.levelArray, ele, emptyNum);
          this.$set(this.levelArray, ele - 1, activeNumber);
        }
        if (rightNum == emptyNum) {
          this.$set(this.levelArray, ele, emptyNum);
          this.$set(this.levelArray, ele + 1, activeNumber);
        }
        if (bottomNum == emptyNum) {
          this.$set(this.levelArray, ele, emptyNum);
          this.$set(this.levelArray, ele + level, activeNumber);
        }
        console.log(">>>>>> this.levelArray", this.levelArray);
        this.checkGameover();
      }
    },
    // 检查游戏是否完成
    checkGameover: function() {
      let isGameover = this.levelArray.every((ele, index) => {
        return ele === index + 1;
      });
      if (isGameover == true) {
        this.isSuccess = true;
        this.$emit("nextSwiperSlide");
      }
    },
    shuffle: function(arr) {
      var len = arr.length;
      for (var i = 0; i < len - 1; i++) {
        var idx = Math.floor(Math.random() * (len - i));
        var temp = arr[idx];
        arr[idx] = arr[len - i - 1];
        arr[len - i - 1] = temp;
      }
      return arr;
    }
  }
};
</script>

<style scoped lang="scss">
.game-cont {
  width: 100vw;
  height: 100vh;
  position: relative;

  .real-img-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transition: opacity 1s linear;
    &.show {
      opacity: 1;
    }
    img {
      width: 100%;
      height: auto;
    }
  }

  .game-menu1 {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    opacity: 1;
    transition: opacity 1s linear;
    &.hide {
      opacity: 0;
      pointer-events: none;
    }

    .row-wrapper {
      display: flex;
      flex-direction: row;
      .game-item {
        border: 1px solid white;
        span {
          display: none;
        }
        img {
          display: block;
          width: 100%;
          height: auto;
        }
      }
    }

    // .row-wrapper {
    //   position: relative;
    //   float: left;
    //   width: 33.333333%;
    //   text-align: center;
    //   border: 1px solid white;
    //   -o-box-sizing: border-box;
    //   box-sizing: border-box;
    //   img {
    //     display: block;
    //     width: 100%;
    //     height: auto;
    //   }

    //   &.empty img {
    //     opacity: 0;
    //   }
    // }
  }
}
</style>
