declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '@/utils/request'

interface Window {
  AliyunUpload: any;
}
