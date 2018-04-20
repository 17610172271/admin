import format from './format'

export default time => {
  return format(parseInt(time) * 1000)
}
