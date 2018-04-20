<template>
  <div class="">
    <div class="baidu-map" ref="map"></div>
    <input type="text" name="" ref="search">
  </div>
</template>
<script>
const ak = 'okFNZHPQ0BfF9Qhq3K1WmrRv'
import {looseEqual} from '@/tools/util'

export default {
  name: 'BaiduMap',
  props: {
    zoom: {
      type: Number,
      default: 15
    },
    // center: {
    //   type: [Object, String],
    //   default () {
    //     return {lng: 116.404, lat: 39.915}
    //   }
    // },
    search: {
      type: String
    },
    value: {
      type: Object,
      default () {
        return {lng: 116.404, lat: 39.915}
      }
    }
  },
  watch: {
    value (val, oldVal) {
      console.log('value changed', looseEqual(val, oldVal))
      if (!looseEqual(val, oldVal)) {
        this.center = val
        this.setCenter(val)
        this.setMarker(val)
      }
    },
    currentValue (val, oldVal) {
      console.log('currentValue changed:', looseEqual(val, oldVal))
      if (!looseEqual(val, oldVal)) {
        this.$emit('input', val)
      }
    },
    search (val) {
      console.log(val)
    }
  },
  data: () => ({
    ak: ak,
    center: this.value,
    currentValue: this.value
  }),
  methods: {
    init (BMap) {
      let $el = this.$refs.map
      const map = new BMap.Map($el)
      this.map = map

      // 添加工具条
      const NavigationControl = new BMap.NavigationControl({
        anchor: global.BMAP_ANCHOR_TOP_RIGHT,
        type: global.BMAP_NAVIGATION_CONTROL_SMALL
      })
      map.addControl(NavigationControl)
      map.enableScrollWheelZoom() // 开启鼠标滚动缩放

      // 初始化中心位置
      const {setMarker, getCenterPoint, zoom} = this
      map.centerAndZoom(getCenterPoint(), zoom || 15)

      setMarker(getCenterPoint()) // 创建地图标注
      this.$emit('ready', {BMap, map})
    },
    initMap (BMap) {
      this.BMap = BMap
      this.init(BMap)
    },
    getCenterPoint () {
      const {center, BMap} = this
      switch (typeof center) {
        case 'string':
          return center
        case 'object':
          return new BMap.Point(parseFloat(center.lng), parseFloat(center.lat))
        default: return new BMap.Point(116.404, 39.915)
      }
    },
    getMapScript () {
      if (!global.BMap) {
        const ak = this.ak || this._BMap().ak
        global.BMap = {}
        global.BMap._preloader = new Promise((resolve, reject) => {
          global._initBaiduMap = function () {
            resolve(global.BMap)
            global.document.body.removeChild($script)
            global.BMap._preloader = null
            global._initBaiduMap = null
          }
          const $script = document.createElement('script')
          global.document.body.appendChild($script)
          $script.src = `//api.map.baidu.com/api?v=2.0&ak=${ak}&callback=_initBaiduMap`
        })
        return global.BMap._preloader
      } else if (!global.BMap._preloader) {
        return Promise.resolve(global.BMap)
      } else {
        return global.BMap._preloader
      }
    },
    setCenter (p) {
      const {map, getCenterPoint} = this
      map.setCenter(getCenterPoint())
    },
    setMarker (p) {
      const {map, BMap, getCenterPoint} = this

      map.clearOverlays() // 清除地图上所有覆盖物
      const marker = new BMap.Marker(getCenterPoint()) // 创建标注
      map.addOverlay(marker) // 将标注添加到地图中
      marker.enableDragging() // 可拖拽
      marker.addEventListener('dragend', () => {
        var p = marker.getPosition()
        this.currentValue = {
          lng: p.lng,
          lat: p.lat
        }
      })
    },
    setPlace (val) {
      const {map, BMap} = this
      map.clearOverlays() // 清除所有覆盖物

      // 智能搜索
      var local = new BMap.LocalSearch(map, {
        onSearchComplete: () => {
          var pp = local.getResults().getPoi(0).point // 第一个搜索结果
          map.centerAndZoom(pp, 18)
          map.addOverlay(new BMap.Marker(pp))
        }
      })
      local.search(val)
    }
  },
  created () {
    const {getMapScript, initMap} = this
    getMapScript()
    .then(initMap)
  }
}
</script>
<style lang="scss">
.baidu-map {
  width: 500px;
  height: 300px;
  border: 1px solid #eeeeee;
  background: #f8f8f8;
}
</style>
