const style = {
  avatar: '?x-oss-process=style/avatar',
  small: '?x-oss-process=style/small',
  middle: '?x-oss-process=style/middle',
  large: '?x-oss-process=style/large'
}
export default (url, size) => {
  return style[size] ? url + style[size] : url + style.large
}
