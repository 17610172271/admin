export const switchTitle = (str, type = 1) => {
  return parseInt(str) === 1 ? (type === 1 ? '有' : '是') : (type === 1 ? '无' : '否')
}