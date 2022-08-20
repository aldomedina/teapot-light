export default function createCSV(arr) {
  var csv = ''
  arr.forEach(function (row) {
    csv += row.join(',')
    csv += '\n'
  })

  var hiddenElement = document.createElement('a')
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
  hiddenElement.target = '_blank'
  hiddenElement.download = 'properties.csv'
  hiddenElement.click()
}
