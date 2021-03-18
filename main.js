'use strict';
let allUsers = JSON.parse(localStorage.getItem('db'));
if (allUsers === null || allUsers.length === 0) {
	allUsers = [];
}
console.log('allUser = ', allUsers);
const logIn = document.getElementById('log_in'),
	logUp = document.getElementById('log_up'),
	userList = document.getElementById('users-list');
let x = 0;


const render = () => {
	console.log(' zaxod = ', x++);
	userList.textContent = '';

	allUsers.forEach((person) => {
		let newBlock = document.createElement('div');
		newBlock.classList = 'block';
		newBlock.style.marginBottom = '15px';
		userList.append(newBlock);
		let newPerson = document.createElement('li');
		newPerson.classList = 'user-data';
		newPerson.style.display = 'inline-block';
		newPerson.textContent = `Имя: ${person.name} Фамилия: ${person.surname} Зарегистрирован:${person.userDate} \n`;
		newBlock.append(newPerson);
		let newButton = document.createElement('button');
		newButton.classList = 'delete';
		newButton.style.marginLeft = 'auto';
		newButton.textContent = 'Удалить';
		newBlock.append(newButton);
	});




	logUp.addEventListener('click', () => {
		let newNameSurname = [];
		let userLogin = '',
			userPass = '',
			nameSurname = prompt('Введите имя и фамилию через пробел:');

		if (!!nameSurname) {

			function editNameSurname(inputName) {
				let amount = 0,
					newNameSurname = [];
				for (let symbol of inputName) {
					if (symbol === ' ') amount += 1; //считаются пробелы
				}
				if (amount === 1) {
					inputName = inputName.split(' ');
					// console.log(inputName);
					if (inputName.length === 2 && inputName[1] !== '') {
						inputName.forEach(item => {
							item = item[0].toUpperCase() + item.slice(1).toLowerCase();
							newNameSurname.push(item);
						});
					} else console.log('Элементов не два');
				} else console.log('Пробелы !== 1');
				console.log('Возвращаем массив после того, как отредактили то, что ввели:', newNameSurname);
				return newNameSurname;
			}


			newNameSurname = editNameSurname(nameSurname);
			// редачим его
			if (newNameSurname.length === 0) { // ежели вернулся пустой массив, то прерываем
				alert('Данные введены некорректно. Регистрация будет прервана.'); // регистрацию.
			}


			if (newNameSurname.length !== 0) {

				function getCorrectDate(today) {
					const arrTime = [today.getDate(), today.getMonth(),
						today.getFullYear(), today.getHours(),
						today.getMinutes(), today.getSeconds()
					];
					const correctMonth = (month) => {
						const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа',
							'сентября', 'октября', 'ноября', 'декабря'
						]
						for (let i = 0; i < monthNames.length; i++) {
							if (month = i) {
								return monthNames[i + 1];
							}
						}
					}
					const editValue = (n) => {
						if (+n < 10) return '0' + n;
						else return n;
					}
					let date = `${arrTime[0]} ${correctMonth(arrTime[1])} ${arrTime[2]} г., ${editValue(arrTime[3])}:${editValue(arrTime[4])}:${editValue(5)}`
					return date;
				}

				userLogin = prompt('Введите логин:');
				if (!!userLogin) {
					userPass = prompt('Введите пароль:');
					if (!!userPass) {
						let	userDate = getCorrectDate(new Date());
						let person = {
							name: newNameSurname[0],
							surname: newNameSurname[1],
							userLogin,
							userPass,
							userDate
						};
						console.log('добавили персону:', person);
						allUsers.push(person);
						console.log('allUsers ',allUsers);
					}
				}
				if (!userLogin || !userPass) {
					alert('Данные введены некорректно. Регистрация прервана.');
				}
			}
		} else {
			alert('Данные не были введены.');
		}
		console.log('выход из обработчика, массив: ', newNameSurname);
		render();
	})

	logIn.addEventListener('click', () => {
		const name = document.getElementById('name');
		let amount = 0;

		console.log('allUsers = ', allUsers, '!!allUsers = ', !!allUsers);
		if (allUsers.length === 0) {
			alert('В системе нет данных.');
		} else {
			const login = prompt('Введите логин:');
			for (let user of allUsers) {
				if (user.userLogin === login) {
					const pass = prompt('Введите пароль: ');
					if (user.userPass === pass) {
						name.textContent = user.name;
						break;
					} else alert('Пароль введен неверно!');
				} else {
					amount += 1;
					if (amount === allUsers.length) {
						alert('Такого пользователя не существует. Зарегистрируйтесь в системе.');
					}
				}
			}
		}

	})

	const delUserData = () => {
		let btns = document.querySelectorAll('.delete');
		if (btns.length !== 0) {
			btns.forEach((btn, index) => {
				btn.addEventListener('click', () => {
					let nodeParent = btn.closest('div');
					nodeParent.remove();
					allUsers.splice(index, 1);
					console.log('allUsers after del:', allUsers);
					//localStorage.setItem('db', JSON.stringify(allUsers));
					render();
				})
			});	
		}
	}
	delUserData();
}
render();

window.addEventListener('unload', () => {
	localStorage.setItem('db', JSON.stringify(allUsers));
})