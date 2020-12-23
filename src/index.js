export const readFile = (file) => {
  return new Promise(resolve => {
    const reader = new FileReader()
    const URL = window.URL || window.webkitURL

    reader.onload = function () {
      resolve({
        raw: this.result,
        url: URL ? URL.createObjectURL(file) : null,
      })
    }

    reader.readAsDataURL(file)
  })
}

export default (inputSelector, targetSelectorOrCallback) => {
  if (!targetSelectorOrCallback) {
    return
  }

  let func = targetSelectorOrCallback

  if (typeof func !== 'function') {
    func = ({ url }) => {
      document.querySelector(targetSelectorOrCallback).src = url
    }
  }

  if (!window.FileReader) {
    return func({}, -1, new Error('Browser does not support media preview'))
  }

  document.querySelectorAll(inputSelector).forEach((input) => {
    if (input.type.toLowerCase() !== 'file') {
      return
    }

    input.addEventListener('change', function () {
      Array.from(this.files).forEach(async (file, index) => {
        const result = await readFile(file)
        func(result, index)
      })
    })
  })
}
