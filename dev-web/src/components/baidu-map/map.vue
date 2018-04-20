<template>
  <div class="">
    <div class="baidu-map" ref="map"></div>
    <slot></slot>
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
    center: {
      type: [Object, String],
      default () {
        return {lng: 116.404, lat: 39.915}
      }
    },
    marker: {
      type: [Object, String],
      default () {
        return {lng: 116.404, lat: 39.915}
      }
    },
    search: ''
  },
  watch: {
    center (val, oldVal) {
      if (!looseEqual(val, oldVal)) {
        this.setCenter(val)
      }
    },
    marker (val, oldVal) {
      if (!looseEqual(val, oldVal)) {
        this.setMarker(val)
      }
    },
    currentValue (val, oldVal) {
      if (!looseEqual(val, oldVal)) {
        this.$emit('input', val)
      }
    },
    search (val, oldVal) {
      this.setPlace(val)
    }
  },
  data: () => ({
    ak: ak,
    currentValue: null
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
      const {getCenterPoint, zoom} = this
      map.centerAndZoom(getCenterPoint(), zoom || 15)

      this.setMarker(this.marker)
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
    setCenter () {
      const {map, getCenterPoint} = this
      map.setCenter(getCenterPoint())
    },
    setMarker (p) {
      const {map, BMap} = this
      map.clearOverlays() // 清除地图上所有覆盖物
      const marker = new BMap.Marker(new BMap.Point(parseFloat(p.lng), parseFloat(p.lat))) // 创建标注
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
      const {setMarker, map, BMap} = this
      map.clearOverlays() // 清除所有覆盖物

      // 智能搜索
      var local = new BMap.LocalSearch(map, {
        onSearchComplete: () => {
          var point = local.getResults().getPoi(0).point // 第一个搜索结果
          map.centerAndZoom(point, 18)
          setMarker(point)
          this.currentValue = {
            lng: point.lng,
            lat: point.lat
          }
        }
      })
      local.search(val)
    }
  },
  created () {
    const {getMapScript, initMap} = this
    getMapScript()
    .then(initMap)
    console.log(this.center)
  }
}
</script>
<style lang="scss">
.baidu-map {
  width: 580px;
  height: 300px;
  border: 1px solid #eeeeee;
  background: #f8f8f8;
}
</style>
