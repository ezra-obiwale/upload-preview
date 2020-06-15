export default (inputSelector, targetSelectorOrCallback) => {
  if (!targetSelectorOrCallback) {
    return
  }

  let callback = targetSelectorOrCallback

  if (typeof callback !== 'function') {
    callback = ({ url }) => {
      document.querySelector(targetSelectorOrCallback).src = url
    }
  }

  if (!window.FileReader) {
    return callback({}, -1, new Error('Browser does not support media preview'))
  }

  document.querySelectorAll(inputSelector).forEach((input) => {
    if (input.type.toLowerCase() !== 'file') {
      return
    }

    input.addEventListener('change', function () {
      const reader = new FileReader()
      const URL = window.URL || window.webkitURL

      this.files.forEach((file, index) => {
        reader.onload = function () {
          callback(
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
