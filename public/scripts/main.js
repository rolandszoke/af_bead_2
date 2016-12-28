const $panels = $('.panel')
$panels.each(function () {
  const $panel = $(this)
  const db = $panel.find('.list-group-item').length
  $panel.find('.panel-heading span').before(`(${db})`) 
})

$headings = $('.panel-heading')
// $headings.next().hide()
$headings.on('click', function (e) {
  // console.log(this)
  const $ul = $(this).next()
  $ul.slideToggle()
})