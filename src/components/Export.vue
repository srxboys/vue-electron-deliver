<template>
  <div class="rx-export rx_no_select">
    <input
      class="e-l"
      ref="input"
      type="file"
      @change="onload"
      text="导入文件"
    />
    <div class="e-r">{{ text ? "路径：" + text : "" }}</div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  props: {
    text: String
  },
  methods: {
    onload (event) {
      const rAbs = false // 是否将文件读取为二进制字符串
      let workBook = null
      console.log('进来了 导入文件 event=', event)
      const files = event.target.files
      const file = files[0]
      // const fileName = file.name.splict('.')[0]
      // console.log('file=', file, ' fileName=', fileName)
      const reader = new FileReader()
      reader.onload = function (e) {
        console.log('onload e=', e)
        const data = e.target.result
        /* 解析数据 */
        if (rAbs) {
          workBook = XLSX.read(btoa(this.fixdata(data)), { type: 'base64' })
        } else {
          workBook = XLSX.read(data, { type: 'binary' })
        }

        // const headers = this.getHeaderRow(workBook)
        console.log('workBook=', workBook)
        const result = XLSX.utils.sheet_to_json(
          workBook.Sheets[workBook.SheetNames[0]]
        )
        console.log('result type=', typeof result)
        console.log('result=', result)
        const resultStr = JSON.stringify(result)
        console.log('resultStr type=', typeof resultStr)
        console.log('resultStr=', resultStr)

        const resultObj = JSON.parse(resultStr)
        console.log('resultObj type=', typeof resultObj)
        console.log('resultObj=', resultObj)

        // 不可取
        const text = XLSX.utils.sheet_to_txt(
          workBook.Sheets[workBook.SheetNames[0]]
        )
        console.log('text type=', typeof text)
        console.log('text=', text)
      }
      if (rAbs) {
        reader.readAsArrayBuffer(file)
      } else {
        reader.readAsBinaryString(file)
      }
    },
    fixdata (data) {
      // 文件流转BinaryString
      let o = ''
      let l = 0
      const w = 10240
      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        )
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      }
      return o
    },
    getHeaderRow (sheet) {
      const headers = []
      /* sheet['!ref']表示所有单元格的范围，例如从A1到F8则记录为 A1:F8 */
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let { C, R } = range /* 从第一行开始 */
      /* 按列进行数据遍历 */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* 查找第一行中的单元格 */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]

        let hdr = 'UNKNOWN ' + C // <-- 进行默认值设置
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)

        headers.push(hdr)
      }
      return headers
    }
  }
}
</script>

<style>
.rx-export {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.rx-export .e-l {
  background: gray;
  color: white;
  padding: 2px 5px;
  border-radius: 4px;
  border: 1px solid gray;
}
.rx-export .e-r {
  flex: 1;
  margin-left: 20px;
}
</style>
