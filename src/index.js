// чек бокс ----------------------------------------------
function toggleCheckbox() {
	let checkbox = document.querySelectorAll('.filter-check_checkbox');

	checkbox.forEach(function (element) {
		element.addEventListener('change', function () {
			if (this.checked) {
				this.nextElementSibling.classList.add('checked');
			} else {
				this.nextElementSibling.classList.remove('checked');
			}
		});
	});
}
// end чек бокс ----------------------------------------------

// корзина ----------------------------------------------
function toggleCart() {

	const btnCart = document.getElementById('cart');
	const modalCart = document.querySelector('.cart');
	const closeBtn = document.querySelector('.cart-close');

	btnCart.addEventListener('click', () => {
		modalCart.style.display = 'flex';
		document.body.style.overflow = 'hidden';
	});
	closeBtn.addEventListener('click', () => {
		modalCart.style.display = 'none';
		document.body.style.overflow = '';
	});
}
// end корзина ----------------------------------------------

// работа с товаром ----------------------------------------------

function addCart() {

	const cards = document.querySelectorAll('.goods .card'); //все карточки товара внутри .goods
	const cartWrapper = document.querySelector('.cart-wrapper');
	const cartEmpty = document.getElementById('cart-empty');
	const countGoods = document.querySelector('.counter');

	cards.forEach((card) => { // добавление/удаление карточки товара в корзину
		const btn = card.querySelector('button');

		btn.addEventListener('click', () => {
			const cardClone = card.cloneNode(true); // добавление карточки товара в корзину
			cartWrapper.appendChild(cardClone);
			showData();

			const removeBtn = cardClone.querySelector('.btn');
			removeBtn.textContent = 'Удалить из корзины';
			removeBtn.addEventListener('click', () => {
				cardClone.remove(); // удаление карточки товара в корзину
				showData();
			})
		});
	});

	function showData() { // расчет количества и общей стоимости товаров в корзине
		const cardsCart = cartWrapper.querySelectorAll('.card');
		const cardsPrice = cartWrapper.querySelectorAll('.card-price');
		const cardsTotal = document.querySelector('.cart-total span');
		let sum = 0;
		countGoods.textContent = cardsCart.length;

		cardsPrice.forEach((cardPrice) => {
			let price = parseFloat(cardPrice.textContent);
			sum += price;
		});

		cardsTotal.textContent = sum;

		if (cardsCart.length != 0) {
			cartEmpty.remove(); // удалает надпись "Корзина пуста"
		} else {
			cartWrapper.appendChild(cartEmpty);
		}
	}
}
// end работа с товаром ----------------------------------------------

// фильтр акции ----------------------------------------------
function actionPage() {
	const cards = document.querySelectorAll('.goods .card'), //все карточки товара внутри .goods
		discountCheckbox = document.getElementById('discount-checkbox'), // карточки товара со скидкой
		goods = document.querySelector('.goods'),
		min = document.getElementById('min'),
		max = document.getElementById('max'),
		search = document.querySelector('.search-wrapper_input'),
		searchBtn = document.querySelector('.search-btn');

	

	/* 	function filterDiscount() {
			{
				cards.forEach((card) => {
					
					if(discountCheckbox.checked){				
						if(!card.querySelector('.card-sale')){
							// card.parentNode.style.display = 'none';
							card.parentNode.remove();
						}
					}
					else{
						// card.parentNode.style.display = '';
						goods.appendChild(card.parentNode);
					}
				})
			}
		} */

	function filterPD() {
		cards.forEach((card) => {
			const cardPrice = card.querySelector('.card-price');
			const price = parseFloat(cardPrice.textContent);

			if ((min.value && price < min.value) || (max.value && price > max.value)) {
				card.parentNode.remove();
			} else {
				if (discountCheckbox.checked) {
					if (!card.querySelector('.card-sale')) {
						// card.parentNode.style.display = 'none';
						card.parentNode.remove();
					} else {
						goods.appendChild(card.parentNode);
					}
				} else {
					goods.appendChild(card.parentNode);
				}
			}
		});
	}

	/* function filterPrice() {
		cards.forEach((card) => {
			const cardPrice = card.querySelector('.card-price');
			const price = parseFloat(cardPrice.textContent);
			// console.log(price);

			if((min.value && price < min.value) || (max.value && price > max.value)){
				card.parentNode.remove();				
			}	else {
				goods.appendChild(card.parentNode);
			}
		});		
	} */

	discountCheckbox.addEventListener('click', filterPD);	
	min.addEventListener('change', filterPD);
	max.addEventListener('change', filterPD);
	
	searchBtn.addEventListener('click', () => {
		const searchText = new RegExp(search.value.trim(), 'i');
		cards.forEach((card) => {
			const title = card.querySelector('.card-title');
			if(!searchText.test(title.textContent)){
				card.parentNode.style.display = 'none';
			} else {
				card.parentNode.style.display = '';
			}

		});
		search.value = '';
	});

}
// end фильтр акции ----------------------------------------------

toggleCheckbox();
toggleCart();
addCart();
actionPage();