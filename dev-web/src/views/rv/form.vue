<template>
 <div class="form padder form-w-c">
  <div class="form-group">
    <input-text
    title="标题"
    placeholder="填写车辆标题"
    :max-length="20"
    :min-length="2"
    :required="true"
    v-model="formData.title"
    ></input-text>
  </div>

  <div class="form-group">
    <input-text
    title="车牌号："
    placeholder=""
    :max-length="10"
    :min-length="2"
    :required="true"
    v-model="formData.plate_number"
    ></input-text>
  </div>
  <div class="form-group">
    <input-text
    title="品牌："
    placeholder=""
    :min-length="2"
    :required="true"
    v-model="formData.brand_name"
    ></input-text>
  </div>
  <div class="form-group">
    <input-text
    title="型号："
    placeholder="方便区分的名称或车型名称"
    :min-length="2"
    :required="true"
    v-model="formData.model"
    ></input-text>
  </div>
  <div class="form-group">
    <input-text
    title="视频："
    placeholder="视频"
    :required="false"
    v-model="formData.video"
    ></input-text>
  </div>

  <div class="form-group">
    <label><span class="required-icon">*</span> 车辆行驶证件扫描：</label>
    <file-upload class="text-muted" v-model="formData.img_driver_license">
      <span class="text-colored">点击上传</span>车辆行驶证扫描件
    </file-upload>
    <div class="text-muted">
      1.2M以内，JPG/PNG格式的图片<br>2.原件照片、扫描或者复印件加盖企业公章后扫描件<br>证件内容需清晰可见，用于车辆审核。<br>
    </div>
  </div>

  <div class="form-group">
    <label><span class="required-icon">*</span>  图文详情：</label>
    <editor id="editor1" v-model="formData.detail" :editorToolbar="customToolbar" useCustomImageHandler @imageAdded="handleImageAdded"></editor>
  </div>

  <div class="form-group">
    <label><span class="required-icon">*</span> 租车须知：</label>
    <editor id="editor2" v-model="formData.notice" :editorToolbar="customToolbar" useCustomImageHandler @imageAdded="handleImageAdded"></editor>
  </div>

  <div class="form-group">
    <label><span class="required-icon">*</span>  费用说明：</label>
    <editor id="editor3" v-model="formData.expenses_explain" :editorToolbar="customToolbar" useCustomImageHandler @imageAdded="handleImageAdded"></editor>
  </div>

  <div class="row" v-if="!formData.id">
    <div class="col-xs-6">
      <div class="form-group">
        <label><span class="required-icon">*</span>平日价格：(周一至周五)</label>
        <input class="form-input w-sm text-right" type="text" name="" v-model="formData.work_day_price">
        <span class="text-muted m-l-xs">元/天</span>
      </div>
    </div>
    <div class="col-xs-6">
      <div class="form-group">
        <label><span class="required-icon">*</span>周末价格：(周六至周日)</label>
        <input class="form-input w-sm text-right" type="text" name="" v-model="formData.week_day_price">
        <span class="text-muted m-l-xs">元/天</span>
      </div>
    </div>
  </div>

  <div class="form-group">
    <label> 取车地点：</label>
    <form-select :list="storelist" :title="pick_title" v-model="formData.pickup_rv" class="w-md"></form-select>
  </div>


  <div class="form-group">
    <label> 还车地点：</label>
    <div class="check-box-group">
      <label v-for="store in storelist">
        <input type="checkbox" v-model="formData.return_rv" :value="store"> {{store.name}}
      </label>
    </div>
  </div>

  <div class="form-group">
    <label> 车辆图片：</label>
    <div class="text-muted">车辆主图大小不能超过3MB；<br>700*700以上JPG、PNG格式的图片上传以后车辆详情页自动提供放大镜的功能
    </div>
    <div class="">
      <album-upload v-model="formData.images" :cover="formData.img_cover" @coverset="setCover"></album-upload>
    </div>
  </div>

  <div class="text-lg padder-v">
    车辆基础信息
  </div>
  
  <div class="form-group">
    <label><span class="required-icon">*</span> 行驶证注册日期：</label>
    <date-picker class="m-r w-md" v-model="formData.coty" placeholder="与行驶证一致"></date-picker>
  </div>
  <div class="form-group">
    <label><span class="required-icon">*</span> 房车类型：</label>
    <radio-button v-model="formData.type" :data="options.type"></radio-button>
  </div>
  <div class="form-group">
    <label><span class="required-icon">*</span> 变速器：</label>
    <radio-button v-model="formData.transmission_case" :data="options.transmission_case"></radio-button>
  </div>

  <div class="form-group">
    <label><span class="required-icon">*</span> 燃油类型：</label>
    <radio-button v-model="formData.actuation" :data="options.actuation"></radio-button>
  </div>

  <div class="form-group">
    <label><span class="required-icon">*</span> 燃油消耗率：</label>
    <input class="form-input w-sm text-right" type="text" name="" v-model="formData.fuel_consumption">
    <span class="text-muted m-l-xs">升／100公里</span>
  </div>

  <div class="form-group">
    <label> 准驾执照(可多选)：</label>
    <check-button-group
    v-model="formData.driver_license_class"
    :data="options.driver_license_class"
    class="check-button-group check-button-group-xs"
    >
    </check-button-group>
  </div>
  <div class="form-group">
    <label>水箱容量：</label>
    <input class="form-input w-sm text-right" type="text" name="" v-model="formData.water_tank">
    <span class="text-muted m-l-xs">升</span>
  </div>
  <div class="form-group">
    <label>油箱容量：</label>
    <input class="form-input w-sm text-right" type="text" name="" v-model="formData.fuel_tankage">
    <span class="text-muted m-l-xs">升</span>
  </div>
  <div class="form-group">
    <label>电池容量：</label>
    <input class="form-input w-sm text-right" type="text" name="" v-model="formData.battery">
    <span class="text-muted m-l-xs">mAH</span>
  </div>
 
 <div class="text-lg padder-v">
    车辆尺寸
  </div>
  <div class="row">
    <div class="col-xs-6">
      <div class="form-group">
        <input class="form-input w-sm text-right" type="text" name="" v-model="formData.height">
        <span class="text-muted m-l-xs">m／车辆高度</span>
      </div>
    </div>
    <div class="col-xs-6">
      <div class="form-group">
        <input class="form-input w-sm text-right" type="text" name="" v-model="formData.inside_height">
        <span class="text-muted m-l-xs">m／车内高度</span>
      </div>
    </div>
    <div class="col-xs-6">
      <div class="form-group">
        <input class="form-input w-sm text-right" type="text" name="" v-model="formData.width">
        <span class="text-muted m-l-xs">m／车辆宽度</span>
      </div>
    </div>
    <div class="col-xs-6">
      <div class="form-group">
        <input class="form-input w-sm text-right" type="text" name="" v-model="formData.length">
        <span class="text-muted m-l-xs">m／车辆长度</span>
      </div>
    </div>
  </div>

<div class="text-lg padder-v">
  起居配置
</div>

<div class="row">
  <div class="col-xs-6">
    <div class="form-group">
      <label>床位：</label>
      <input class="form-input w-sm text-right" type="text" name="" v-model="formData.single_bed_4adult">
      <span class="text-muted m-l-xs">张／单人床</span>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="form-group">
      <label>&nbsp;</label>
      <input class="form-input w-sm text-right" type="text" name="" v-model="formData.double_bed_4adult">
      <span class="text-muted m-l-xs">张／双人床</span>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="form-group">
      <label>座椅：</label>
      <input class="form-input w-sm text-right" type="text" name="" v-model="formData.seat">
      <span class="text-muted m-l-xs">个</span>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="form-group">
      <label>桌子：</label>
      <input class="form-input w-sm text-right" type="text" name="" v-model="formData.desk">
      <span class="text-muted m-l-xs">张</span>
    </div>
  </div>
</div>

<div class="text-lg padder-v">
  车辆其他配置
</div>

<div class="row">
  <div class="col-xs-6">
    <div class="form-group">
      <label>厕所：</label>
      <switch-button v-model="formData.wash_room"></switch-button>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="form-group">
      <label>淋浴：</label>
      <switch-button v-model="formData.water_heater"></switch-button>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="form-group">
      <label>炉灶：</label>
      <switch-button v-model="formData.cooking_range"></switch-button>
    </div>
  </div>
  <div class="col-xs-6 refrigerator">
    <div class="form-group">
      <label>冰箱：</label>
      <input class="form-input w-sm text-right" type="text" name="" v-model="formData.firdge">
      <span class="text-muted m-l-xs">升</span>
    </div>
  </div>
  <div class="col-xs-6 water">
    <div class="form-group">
      <label>水槽：</label>
      <switch-button v-model="formData.poll"></switch-button>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="form-group">
      <label>微波炉：</label>
      <switch-button v-model="formData.microwave_oven"></switch-button>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="form-group">
      <label>遮阳篷</label>
      <switch-button v-model="formData.sunshade"></switch-button>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="form-group">
      <label>纱窗</label>
      <switch-button v-model="formData.screen_window"></switch-button>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="form-group">
      <label>自行车架</label>
      <switch-button v-model="formData.bicycle_frame"></switch-button>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="form-group">
      <label>电视</label>
      <switch-button v-model="formData.dvd"></switch-button>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="form-group">
      <label>卫星天线</label>
      <switch-button v-model="formData.satellite_antenna"></switch-button>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="form-group">
      <label>发电机</label>
      <switch-button v-model="formData.alternator"></switch-button>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="form-group">
      <label>行车空调</label>
      <switch-button v-model="formData.train_air_conditioner"></switch-button>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="form-group">
      <label>驻车空调</label>
      <switch-button v-model="formData.parking_air_conditioner"></switch-button>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="form-group">
      <label>燃油加热器</label>
      <switch-button v-model="formData.fuel_accelerator"></switch-button>
    </div>
  </div>
  
</div>

<div class="text-lg padder-v">
  车辆保险信息
</div>
<div class="form-group">
  <label><span class="required-icon">*</span>起赔额度：</label>
  <input class="form-input w-sm" type="text" name="" v-model="formData.compensation">
  <span class="text-muted m-l-xs">元</span>
</div>
<div class="form-group">
  <label><span class="required-icon">*</span>投保公司：</label>
  <input class="form-input w-md" type="text" name="" v-model="formData.warranty_company" placeholder="如:中国平安保险">
</div>

<div class="form-group">
  <label><span class="required-icon">*</span>保单起止日期：</label>
  <date-picker class="m-r" v-model="formData.warranty_start_time"></date-picker>
  <span class="padder">至</span>
  <date-picker v-model="formData.warranty_end_time"></date-picker>
</div>

<div class="form-group">
  <label><span class="required-icon">*</span> 保单复印件：</label>
  <file-upload class="text-muted" v-model="formData.img_warranty">
    <span class="text-colored">点击上传</span>保单复印件
  </file-upload>
  <div class="text-muted">
    1.2M以内，JPG/PNG格式的图片<br>2.原件照片、扫描或者复印件加盖企业公章后扫描件<br>证件内容需清晰可见，用于车辆审核。<br>
  </div>
</div>

</div>
</template>
<script>
  import InputText from '../../components/input-text'
  import { Editor, DatePicker, FileUpload, AlbumUpload, CheckButton, CheckButtonGroup, SwitchButton, RadioButton, CheckBox } from '@/components'
  import FormSelect from '@/components/form-select/rv_edit'
  // import api from '@/api'
  import { isJson } from '@/tools/util'
  import ossResize from '@/filters/oss-resize.js'
  const object2String = obj => {
    return JSON.stringify(obj)
  }

  export default {
    components: {
      InputText,
      FileUpload,
      AlbumUpload,
      CheckButton,
      CheckButtonGroup,
      SwitchButton,
      RadioButton,
      FormSelect,
      CheckBox,
      DatePicker,
      Editor
    },
    props: {
      value: {},
      storelist: undefined
    },
    filters: {
      object2String
    },
    data: () => ({
      pick_title: '选择取车城市',
      content: '',
      formData: {
        weight: '',
        id: '',
        title: '',
        brand_name: '',
        model: '',
        type: '',
        plate_number: '',
        img_driver_license: '',
        notice: '',
        expenses_explain: '',
        detail: '',
        work_day_price: 0,
        week_day_price: 0,
        images: '',
        pickup_rv: [],
        return_rv: [],
        img_cover: '',
        height: '',
        length: '',
        width: '',
        inside_height: '',
        coty: '',
        transmission_case: 1,
        actuation: 0,
        fuel_consumption: '',
        adult_passengers: 7,
        front_seatbelts: 2,
        back_seatbelts: 2,
        child_seats: 0,
        driver_experience_limit: 18, // string
        driver_license_class: '', // string
        double_bed_4adult: 0,
        single_bed_4adult: 0,
        sittingroom_air_conditioner: 0,
        cab_air_conditioner: 0,
        cooking_range: 0,
        cab_heating: 0,
        firdge: 0,
        sittingroom_heating: 0,
        wash_room: 0,
        oven: 0,
        water_heater: 0,
        microwave_oven: 0,
        poll: 0,
        desk: 0,
        water_tank: 0,
        fuel_tankage: 0,
        gas_holder: 0,
        gas_holder_weight: 0,
        cruise_control: 0,
        bicycle_frame: 0,
        power_brake: 0,
        alternator: 0,
        sunshade: 0,
        electricle_source: 0,
        screen_window: 0,
        suit4_disabled_people: 0,
        pets_allowed: 0,
        radio: 0,
        cd: 0,
        dvd: 0,
        mp3: '',
        ipod: 0,
        usb: 0,
        compensation: 2000.00,
        warranty_start_time: '',
        warranty_end_time: '',
        warranty_company: '',
        img_warranty: '',
        status: 1,
        seat: 0,
        satellite_antenna: 0,
        train_air_conditioner: 0,
        parking_air_conditioner: 0,
        fuel_accelerator: 0,
        battery: 0
      },
      options: {
        coty: [
        { name: '0-3年', value: '0-3年' },
        { name: '3-4年', value: '3-4年' },
        { name: '5-6年', value: '5-6年' },
        { name: '7-8年', value: '7-8年' },
        { name: '10年以上', value: '10年以上' }
        ],
        transmission_case: [
        { name: '自动挡', value: 1 },
        { name: '手动挡', value: 2 },
        { name: '手/自动挡', value: 3 }
        ],
        type: [
        {name: '自行A型', value: 1},
        {name: '自行B型', value: 2},
        {name: '自行C型', value: 3},
        {name: '拖挂A型', value: 4},
        {name: '拖挂B型', value: 5},
        {name: '拖挂C型', value: 6},
        {name: '拖挂D型', value: 7}
        ],
        actuation: [
        { name: '汽油', value: 1 },
        { name: '柴油', value: 2 }
        ],
        driver_license_class: [
        { name: 'C2', value: 1 },
        { name: 'C1', value: 2 },
        { name: 'B2', value: 3 },
        { name: 'B1', value: 4 },
        { name: 'A3', value: 5 },
        { name: 'A2', value: 6 },
        { name: 'A1', value: 7 }
        ],
        mp3: [
        { name: 'mp3', value: 'mp3' },
        { name: 'mp4', value: 'mp4' }
        ]
      },
      customToolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }],
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{ 'align': [] }],
      ['image']
      ]
    }),
    computed: {
      currentValue () {
      // this.formData.img_cover = this.formData.images && isJson(this.formData.images) ? JSON.parse(this.formData.images)[0] : '' // 转换封面图片
        return JSON.stringify(this.formData)
      }
    },
    methods: {
    // 初始化 formData 的值
      init (val) {
        if (val && isJson(val)) {
          var tempVal = JSON.parse(val)
          for (var k in this.formData) {
            if (tempVal[k]) this.formData[k] = tempVal[k]
          }
        }
      },
      handleImageAdded (file, Editor, cursorLocation) {
        this.axios.upload(file).then(response => {
          if (response.data.code === 200) {
            let url = ossResize(response.data.data.filename, 'middle')
            Editor.insertEmbed(cursorLocation, 'image', url)
          }
        })
        .catch(err => {
          return Promise.reject(err)
        })
      },
      setCover (link) {
        this.formData.img_cover = link
      }
    },
    created () {
      this.init(this.value)
    },
    watch: {
      value (val) {
        if (this.currentValue !== val) this.init(val)
      },
      currentValue (val) {
        this.$emit('input', this.currentValue)
      }
    }
  }
</script>
<style scoped>
  .water {
    clear: both;
  }
</style>
