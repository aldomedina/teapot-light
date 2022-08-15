export default function deletDomChildren(e) {
  //e.firstElementChild can be used.
  var child = e.lastElementChild
  while (child) {
    e.removeChild(child)
    child = e.lastElementChild
  }
}
