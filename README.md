# Upload Preview

Creates a url that can be provided to `<image src="..." />` from `<input type="file">`.

## Install

```bash
yarn add @ezraobiwale/upload-preview
```

## Usage

### Preview a file input

```html
<img id="file-preview" src="#" alt>

<input id="file" type="file">
```

```js
import preview from '@ezraobiwale/upload-preview'

preview('#file', '#file-preview')

// or do something else with the result

preview('#file', ({ url, raw }, index, error) => {
   // do something with url or raw
})
```

### Reading file manually

```js
import { readFile } from '@ezraobiwale/upload-preview'

const file = File // a file object gotten from wherever

const { url, raw } = await readFile(file)
// do something with url or raw
```