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
      const reader = new FileReader()
      const URL = window.URL || window.webkitURL

      Array.from(this.files).forEach((file, index) => {
        reader.onload = function () {
          func(
            {
              raw: this.result,
              url: URL ? URL.createObjectURL(file) : null,
            },
            index
          )
        }

        reader.readAsDataURL(file)
      })
    })
  })
}
