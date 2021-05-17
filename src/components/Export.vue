<template>
  <div class="rx-export rx_no_select">
    <input class="e-l" ref='input' type="file" @change="onload" text="导入文件" />
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
    onload () {
      console.log('进来了 导入文件')
      console.log('input=', this.$refs.input)
      console.log('input.file=', this.$refs.input.file)
      const file = this.$refs.input.files
      // const fileName = file.name.splict('.')[0]
      // console.log('file=', file, ' fileName=', fileName)
      const reader = new FileReader()
      reader.onload = function (e) {
        console.log('onload e=', e)
        /* 解析数据 */
        const bstr = e.target.result
        const wb = XLSX.read(bstr, { type: 'binary' })
        console.log('wb=', wb)
        /* 获取文件的第一个工作表（WorkSheet） */
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        /* 数组转换 */
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
        /* 进行表格数据更新 */
        // this.tableData = data;
        console.log('\n' + data + '\n')
        /* 进行表格表头数据更新 */
        // this.cols = getHeaderRow(ws);
        const heads = this.getHeaderRow(ws)
        console.log('\n' + heads + '\n')
      }
      reader.readAsText(file)
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
