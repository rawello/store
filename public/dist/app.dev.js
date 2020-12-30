"use strict";

var toCurrency = function toCurrency(price) {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
  }).format(price);
};

document.querySelectorAll('.price').forEach(function (node) {
  node.textContent = toCurrency(node.textContent);
});
var $card = document.querySelector('#card');

if ($card) {
  $card.addEventListener('click', function (event) {
    if (event.target.classList.contains('js-remove')) {
      var id = event.target.dataset.id;
      fetch('/card/remove/' + id, {
        method: 'delete'
      }).then(function (res) {
        return res.json();
      }).then(function (card) {
        if (card.courses.length) {
          var html = card.courses.map(function (c) {
            return "\n              <tr>\n                <td>".concat(c.title, "</td>\n                <td>").concat(c.count, "</td>\n                <td>").concat(c.price, "</td>\n                <td>\n                  <button class=\"btn btm-small js-remove\" data-id=\"").concat(c._id, "\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n                </td>\n              </tr>\n              ");
          }).join('');
          $card.querySelector('tbody').innerHTML = html;
          $card.querySelector('.price').textContent = toCurrency(card.price);
        } else {
          $card.innerHTML = '<p>Корзина пуста</p>';
        }
      });
    }
  });
}