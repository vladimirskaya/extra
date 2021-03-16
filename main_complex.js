let getTime = function() {

	let today = new Date();
		arrTime = [today.getDay(), today.getDate(), today.getMonth(), today.getFullYear(), today.getHours(), today.getMinutes(), today.getSeconds()];
	
	let correctWeekDay = function(wDay){
			weekDays = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
			for (let i = 0; i < weekDays.length;  i++) {
				if (wDAy = i){
					return weekDays[i];
				}
			} 
		},
	
		correctMonth = function(month){
			
			monthNames = ['января', 'февраля','марта', 'апреля','мая', 'июня','июля', 'августа',
						'сентября', 'октября','ноября', 'декабря']
			for (let i = 0; i < monthNames.length;  i++) {
				// console.log(i);
				if (month = i){
					return monthNames[i+1];
				} 
			}
		},
		
		correctHours = function(hour){
			//console.log(hour);
			if (hour === 1 || hour === 21) {
				return 'час';
			} else if ((0 < hour && hour < 5) || (21 < hour && hour < 24)){
				return 'часа';
			} else {
				return 'часов';
			}
		},
		
		correctMinutes = function(m){
			if (m % 10 === 2 || m % 10 === 3 || m % 10 === 4){
				return 'минуты';
			} else if (m % 10 === 1 && m !== 11){
				return 'минута';
			} else {
				return "минут"
			}
		},
		
		correctSeconds = function(sec){
			if (sec % 10 === 2 || sec % 10 === 3 || sec % 10 === 4){
				return 'секунды';
			} else if (sec % 10 === 1 && sec !== 11){
				return 'секунда';
			} else {
				return "секунд"
			}
		},
		
		editValue = function(n){
			if ( +n < 10){
				return '0' + n;
			} else {
				return n;
			}
		}
		
	return timeOptions = [`'Сегодня ${correctWeekDay(arrTime[0])}, ${arrTime[1]} ${correctMonth(arrTime[2])} ${arrTime[3]} года, ${arrTime[4]} ${correctHours(arrTime[4])} ${arrTime[5]} ${correctMinutes(arrTime[5])} ${arrTime[6]} ${correctSeconds(arrTime[6])}'`,
				`'${editValue(arrTime[1])}.${editValue(arrTime[2] + 1)}.${editValue(arrTime[3])} - ${editValue(arrTime[4])}:${editValue(arrTime[5])}:${editValue(arrTime[6])}'`];
		
};

	// adding new divs
let addElements = function(arr){
	let container = document.getElementsByClassName('container')[0]
	// console.log(arr);
	for (let value of arr){
		
		div = document.createElement('div');
		div.innerHTML = value;
		div.className = 'what_time';
		div.style.color = 'red';
		div.style.fontWeight = 'bold';
		
		container.append(div); 
		
	}
};
	// delete the divs
let delElements = function(){
	let divs = document.querySelectorAll('.what_time')
	
	divs[0].remove();
	divs[1].remove();
	
}
addElements(getTime());
let renewDate = setInterval(()=>{
		delElements();
		addElements(getTime());		
	}, 1000);
				
