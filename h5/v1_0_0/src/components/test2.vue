<template>
  <div
    class="play-area"
    id="playArea"
  >

    <img
      class="img"
      :src="selectedImg"
      :style="{ width: width +'px', height: height + 'px' }"
    />

    <div
      v-for="item in boxArr"
      :index="item"
      :key="item"
      :class="['piece', 'piece-'+(item) ,item == boxArractivelass ? 'active' : '' ]"
      :style="{backgroundImage:'url('+selectedImg+')', width: widthItem +'px', height: heightItem + 'px' }"
      @click="changePositon($event,item)"
      :ref="'piece' +item"
    >
      <div class="piece-inner"></div>
    </div>
  </div>
</template>

<script>
/// 华容道第一版
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      boxArractivelass: -1,
      // prevIndex: null,
      selectedImg: require("../assets/images/img11.jpg"),
      boxArr: new Array(9).fill(1).map((item, index) => {
        return index;
      }),
      pieces: document.querySelectorAll(".piece"),
      pool: this.generateMatrix(3, 33, 33),
      issuccess: false
    };
  },
  computed: {
    width() {
      return document.body.clientWidth;
    },
    height() {
      let width = document.body.clientWidth;
      return width / (750 / 1334);
    },
    widthItem() {
      let width = document.body.clientWidth;
      let widthItem = width / 3;
      return widthItem;
    },
    heightItem() {
      let width = document.body.clientWidth;
      let height = width / (750 / 1334);
      let heightItem = height / 3;
      return heightItem;
    }
    // format(index) {
    //   let width = document.body.clientWidth;
    //   let height = width / (750 / 1334);
    //   let widthItem = width / 3;
    //   let heightItem = height / 3;

    //   switch (index) {
    //     case 1:
    //       return `background-position: -${widthItem}px 0`;
    //     case 2:
    //       return `background-position: -${widthItem * 2}px 0`;
    //     case 3:
    //       return `background-position: 0 -${heightItem}px`;
    //     case 4:
    //       return `background-position: -${widthItem}px -${heightItem}px`;
    //     case 5:
    //       return `background-position: -${widthItem * 2}px -${heightItem}px`;
    //     case 6:
    //       return `background-position: 0 -${heightItem * 2}px`;
    //     case 7:
    //       return `background-position: -${widthItem}px -${heightItem * 2}px`;
    //     case 8:
    //       return `background-position: -${widthItem * 2}px -${heightItem *
    //         2}px`;
    //     case 9:
    //       return `background-position: -${width / 3}px 0`;
    //   }
    // }
  },
  methods: {
    startGame() {
      this.shuffle(document.querySelectorAll(".piece"), this.pool);
    },
    // 点击高亮并且切换对应位置 (想办法交换对应索引位置的x,y值即可)
    changePositon(e, item) {
      let reg = /active/g;
      this.boxArractivelass = item;
      let pieces = document.querySelectorAll(".piece");
      if (!this.wall) {
        this.wall = 1;
        this.prevEl = e.target;
        for (var i = 0, len = pieces.length; i < len; i++) {
          pieces[i].className = pieces[i].className.replace(" active", "");
        }
        !reg.test(this.className) && (this.className += " active");
      } else {
        this.wall = 0;
        var prevIndex = +this.prevEl.getAttribute("index"),
          curIndex = +e.target.getAttribute("index");

        // 置换数组
        this.swap(this.pool, prevIndex, curIndex);
        this.prevEl.style.transform =
          "translate(" +
          (this.pool[prevIndex].x / 33) * this.widthItem +
          "px," +
          (this.pool[prevIndex].y / 33) * this.heightItem +
          "px" +
          ")";
        e.target.style.transform =
          "translate(" +
          (this.pool[curIndex].x / 33) * this.widthItem +
          "px," +
          (this.pool[curIndex].y / 33) * this.heightItem +
          "px" +
          ")";
        this.boxArractivelass = -1;

        // 校验是否成功
        if (this.isTestSuccess(this.pool)) {
          this.issuccess = true;
        }
      }
    },
    // 滑动元素
    transformX(el, dx) {
      el.style.transform = "translateX(" + dx + ")";
    },
    // 生成n维矩阵
    generateMatrix(n, dx, dy) {
      var arr = [],
        index = 0;
      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
          arr.push({ x: j * dx, y: i * dy, index: index });
          index++;
        }
      }
      return arr;
    },

    shuffle(els, arr) {
      this.upsetArr(arr);
      for (var i = 0, len = els.length; i < len; i++) {
        var el = els[i];
        el.setAttribute("index", i); // 将打乱后的数组索引缓存到元素中
        el.style.transform =
          "translate(" +
          (arr[i].x / 33) * this.widthItem +
          "px," +
          (arr[i].y / 33) * this.heightItem +
          "px" +
          ")";
      }
    },
    upsetArr(arr) {
      return arr.sort(function() {
        return Math.random() > 0.5 ? -1 : 1;
      });
    },
    // 置换数组(对应索引的x,y值进行交换)
    swap(arr, indexA, indexB) {
      [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
    },

    // 校验是否成功方法
    isTestSuccess(arr) {
      return arr.every(function(item, i) {
        return item.index === i;
      });
    },

    format(index) {
      let width = document.body.clientWidth;
      let height = width / (750 / 1334);
      let widthItem = width / 3;
      let heightItem = height / 3;

      switch (index) {
        case 1:
          return `background-position: -${widthItem}px 0`;
        case 2:
          return `background-position: -${widthItem * 2}px 0`;
        case 3:
          return `background-position: 0 -${heightItem}px`;
        case 4:
          return `background-position: -${widthItem}px -${heightItem}px`;
        case 5:
          return `background-position: -${widthItem * 2}px -${heightItem}px`;
        case 6:
          return `background-position: 0 -${heightItem * 2}px`;
        case 7:
          return `background-position: -${widthItem}px -${heightItem * 2}px`;
        case 8:
          return `background-position: -${widthItem * 2}px -${heightItem *
            2}px`;
        case 9:
          return `background-position: -${width / 3}px 0`;
      }
    }
  },
  mounted() {
    this.startGame(0);
  }
};
</script>

<style scoped lang="scss">
.play-area {
  .img {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
  }

  .piece {
    position: absolute;
    left: 0;
    top: 0;
    width: 33vw;
    height: 33vh;
    border: 1px solid transparent;
    background-repeat: no-repeat;
    background-size: 100vw 100vh;
    transition: transform 0.6s ease-in-out;

    &.active::after {
      position: absolute;
      border: 1px solid red;
      content: "";
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }

  .piece-1 {
    background-position: -33vw 0;
  }
  .piece-2 {
    background-position: -66vw 0;
  }
  .piece-3 {
    background-position: 0 -33vh;
  }

  .piece-4 {
    background-position: -33vw -33vh;
  }
  .piece-5 {
    background-position: -66vw -33vh;
  }
  .piece-6 {
    background-position: 0 -66vh;
  }
  .piece-7 {
    background-position: -33vw -66vh;
  }
  .piece-8 {
    background-position: -66vw -66vh;
  }
}
</style>
