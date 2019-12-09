<template>
  <div id="app">
    <header @touchend="touchEnd" @touchstart="touch" @touchmove="move">这是头部</header>
    <main>
      <img id="img" src="./assets/logo.png" />
      <!-- <input type="file" value="选择文件"/> -->
      <!-- 这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br>这是内容<br> -->
      <Holle></Holle>

    </main>
    <footer>这是底部</footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    Holle: () => import('./components/HelloWorld')
  },
  data () {
    return {
      isMove: false,
      timer: null,
      src: ''
    }
  },
  methods: {
    stopBack () {
      if (!history.pushState) {
        console.error('不支持')
        return
      }
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL)
      })
    },
    getBase64 (url, cb) {
      const Img = document.querySelector('#img')
      Img.crossOrigin = 'Anonymous'
      let dataURL = ''
      Img.onload = function () {
        const canvas = document.createElement('canvas')
        const w = Img.width
        const h = Img.height
        canvas.width = w
        canvas.height = h
        canvas.getContext('2d').drawImage(Img, 0, 0, w, h)
        dataURL = canvas.toDataURL('image/jpeg')
        console.log(dataURL)
      }
      // Img.src = url
    },
    touch (e) {
      // console.log(e)
      this.timer = setTimeout(() => {
        this.isMove = true
      }, 400)
    },
    touchEnd () {
      clearTimeout(this.timer)
    },
    move (e) {
      const dom = e.target
      const touchs = e.changedTouches[0]
      const h = dom.clientHeight
      const w = dom.clientWidth
      if (this.isMove) {
        dom.style.cssText = `
        left:${touchs.pageX - w / 2}px;top:${touchs.pageY - h / 2}px;
        `
      }
      e.preventDefault()
      console.log(e)
    },
    test (arr, item) {
      // if (Array.prototype.indexOf) {
      //   return arr.indexOf(item)
      // } else {
      //   let i = 0
      //   while (i < arr.length) {
      //     if (arr[i] === item) {
      //       return i
      //     }
      //     i++
      //   }
      // }
      // return -1
    },
    test1 (arr) {
      // let i = 0
      // const len = arr.length
      // let s = 0
      // while (i < len) {
      //   s += arr[i]
      //   i++
      // }
      // return s
    },
    test2 (arr, item) {
      // var i = 0;
      // var len = arr.length
      // var s = arr.filter(v => {
      //   return v !== item
      // })
      // return s
    },
    async name () {
      await console.log(1) // 第一轮执行 和 和 正常函数一样
      console.log(2)
    },
    sps () { // test async promise setTimeout
      async function async1 () {
        console.log('2') // 2
        await async2()
        console.log('6') // 6
      }
      async function async2 () {
        console.log('3') // 3
      }
      // 执行开始
      console.log('1') // 1
      setTimeout(function () { // 宏任务队列
        console.log('end') // 8
      }, 0)
      async1() // async/await
      new Promise(function (resolve) { // 进入微任务队列
        console.log('4') // 4
        resolve()
      }).then(function () {
        console.log('7') // 7
      })
      console.log('5') // 5
    }
  },
  mounted () {
    this.stopBack()
    this.sps()
    this.getBase64(this.src)
    // this.name()
    // console.log(3)
    // this.sps()
    // var arr = [ 1, 2, 3, 4, 2, 2 ]
    // var log = this.test2(arr, 2)
    // function duplicates(arr) {
    //   var obj = {}
    //   var len = arr.length
    //   var newArr = []
    //   for(var i=0;i<len;i++){
    //     if(!obj[arr[i]]){
    //       obj[arr[i]] = 1
    //     }else{
    //       obj[arr[i]] +=1
    //     }
    //   }
    //   for(var x in obj){
    //   }
    //   console.log(newArr)
    // }
    // duplicates(arr)
    // console.log(log)
  }
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 60px;
  display: flex;
  margin: 0;
  flex-direction: column;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
#app header, #app footer{
  height: 50px;
  width: 100%;
  background: #0b7cec;
}
#app main{
  flex: 1;
  background: #ccc;
  overflow-y: auto;
}
</style>
