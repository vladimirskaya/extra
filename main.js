'use strict';
let allUsers = JSON.parse(localStorage.getItem('db'));
if (allUsers  === null || allUsers .length === 0 ){
	allUsers = [];
}
	
const logIn = document.getElementById('log_in'),
	logUp = document.getElementById('log_up'),
	userList = document.getElementById('users-list');
	
	
	const render = () => {
		userList.textContent = '';
		
		allUsers.forEach((person) =>{
			let newBlock = document.createElement('div');
			newBlock.classList = 'block';
			newBlock.style.marginBottom = '15px';
			userList.append(newBlock);
			let newPerson = document.createElement('li');
			newPerson.classList = 'user-data';	
			newPerson.style.display = 'inline-block';			
			newPerson.textContent = `Имя: ${person.name} Фамилия: ${person.surname} Зарегистрирован:${person.userDate} \n`;
			//console.log(newPerson);
			newBlock.append(newPerson);	
			let newButton = document.createElement('button');
			newButton.classList = 'delete';
			newButton.style.marginLeft = 'auto';
			newButton.textContent = 'Удалить';
			newBlock.append(newButton);
		});	
	
		
		logUp.addEventListener('click', ()=>{
			let flag = true;
			let newNameSurname = [];
			let nameSurname = prompt('Введите имя и фамилию через пробел:');
			if (!!nameSurname){
				editNameSurname(nameSurname);
				if (newNameSurname.length !== 2) {
					alert('Данные введены некорректно. Регистрация будет прервана.');
					return;
				}
				console.log('newNameSurname',newNameSurname )
				
				function editNameSurname(inputName){
					let amount = 0;
					for (let symbol of inputName) {
						if (symbol === ' ') amount += 1;    //считаются пробелы
					}
					if (amount > 1) {
						flag = false;
						alert('Данные введены некорректно. Регистрация будет прервана.');
					}else{
						inputName.split(' ').forEach(item =>{
							console.log('item',item )
							item = item[0].toUpperCase() + item.slice(1).toLowerCase();
							console.log('item',item )
							newNameSurname.push(item);
						});
					}	
				}
			
				if (flag){
					//возвращает строку с датой заданного вида
					function getCorrectDate(today){
						const arrTime = [today.getDate(), today.getMonth(),
							today.getFullYear(), today.getHours(),
							today.getMinutes(), today.getSeconds()];
						const correctMonth = (month) =>{
							const monthNames = ['января', 'февраля','марта', 'апреля','мая', 'июня','июля', 'августа',
							'сентября', 'октября','ноября', 'декабря']
							for (let i = 0; i < monthNames.length;  i++) {
								if (month = i){
									return monthNames[i+1];
								} 
							}
						}
						const editValue = (n) =>{
							if (+n < 10) return '0' + n;
							else return n;
						}
					let date = `${arrTime[0]} ${correctMonth(arrTime[1])} ${arrTime[2]} г., ${editValue(arrTime[3])}:${editValue(arrTime[4])}:${editValue(5)}`
					return date;
					}
					
					
					const userLogin = prompt('Введите логин:'),
						userPass = prompt('Введите пароль:'),
						userDate = getCorrectDate(new Date());
						
						if (!!userLogin && !!userPass){
							let person = {
								name: newNameSurname[0],
								surname: newNameSurname[1],
								userLogin,
								userPass,
								userDate
							};
							allUsers.push(person);	
							render();
						}else{
							alert('Данные введены некорректно. Регистрация прервана.');	
						}
				}
			}
				
		})	
		
		
	//запрашивает данные с пользователя, возвращает объект с этими данными
	function inputUserData(){
		
	}
		
	
		function delUserData(){
			let btns = document.querySelectorAll('.delete');
			if (!btns) return;
			btns.forEach((btn, index) =>{
				btn.addEventListener('click', () =>{
					let nodeParent = btn.closest('div');			
						nodeParent.remove();
						allUsers.splice(index,1);
						render();
				})
			});	
		}
		delUserData();
		
		logIn.addEventListener('click', () =>{
			const name = document.getElementById('name');
			let amount = 0;
			
			if (!allUsers) {
				alert('В системе нет данных.');
				return;
			}
			const login = prompt('Введите логин:');
				for (let user of allUsers){
					if (user.userLogin === login){
						const pass = prompt('Введите пароль: ');
							if (user.userPass === pass) {
								name.textContent = user.name;
								break;
							} else alert('Пароль введен неверно!');
						}else {
							amount += 1;
							if (amount === allUsers.length) {
								alert('Такого пользователя не существует. Зарегистрируйтесь в системе.');
							}
						}
					}
						
			
			
		})
	}
	render();
	
	window.addEventListener('unload', () =>{
		localStorage.setItem('db', JSON.stringify(allUsers));
	})		
	




	


