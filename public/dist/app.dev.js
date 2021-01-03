"use strict";

var toCurrency = function toCurrency(price) {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
  }).format(price);
};

var toDate = function toDate(date) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date(date));
};

document.querySelectorAll('.price').forEach(function (node) {
  node.textContent = toCurrency(node.textContent);
});
document.querySelectorAll('.date').forEach(function (node) {
  node.textContent = toDate(node.textContent);
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
            return "\n              <tr>\n                <td>".concat(c.title, "</td>\n                <td>").concat(c.count, "</td>\n                <td>").concat(c.price, "</td>\n                <td>\n                  <button class=\"btn btm-small js-remove\" data-id=\"").concat(c.id, "\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n                </td>\n              </tr>\n              ");
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