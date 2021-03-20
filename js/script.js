const filterByType = (type, ...values) => values.filter(value => typeof value === type),
//функциональное описание стрелочной функции с обязательным параметром type и другими возможными значенями, которые будут
// записаны в массив values.
// Эта стрелочная функция filterByType вызывает другую стрелочную функцию с передачей параметра value в качестве аргумента

//здесь следом функционально задается еще одна стрелочная функция (без передачи параметров)
	hideAllResponseBlocks = () => {
		// задается константа, в которую записывается HTML-коллекция, приведенная к массиву
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// по этому массиву происходит прогон по элементарно: передается элемент массива в стрелочную функцию, которая
		//скрывает из ДОМа этот элемент
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

// также функциональное описание стрелочной функции 
// сюда передается в качестве параметров 3 аргумента 
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//вызывается функция hideAllResponseBlocks(), которая получает НTM-коллекцию дивов "Результат" в виде массива
		// скрывает их
		hideAllResponseBlocks();

		//затем элемент, полученный по аргументу blockSelector, становится видимым
		document.querySelector(blockSelector).style.display = 'block';

		// если аргумент spanSelector не пуст или вообще существует, то тогда 
		// текстовому значение этого элемента присваиваем второй полученный аргумент
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	//функциональное описание стрелочной функции, которая получает один аргумент msgText. Его 
	//передает вызываемой функции showResponseBlock, описанной выше 
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	// то же самое
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	// также фунц.описание стрелочной функции
	//вызывает showResponseBlock, 
	// куда передает класс '.dialog__response-block_no-results' ( это див, выводящий результат, точнее, то, что резульата нет)
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	//функц. описание фукнции, которая принимает два аргумента type, values
	//запускает на try код
	tryFilterByType = (type, values) => {
		try {
			//контсанте присваивается значение выполняемого кода. В нем вызывается функция filterByType
			// с передачей ей type, values. Возвращаемый результат склеивается в одну строку через запятую.
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//константе alertMsg присваивается какое-то значение, зависит от длины строки (тернарное выражение)
			const alertMsg = (valuesArray.length) ?
			// если массив не пуст, то возвращается нижеследующее выражение
				`Данные с типом ${type}: ${valuesArray}` :
			// если массив не пуст, то возвращается нижеследующее выражение
				`Отсутствуют данные типа ${type}`;

			//вызов функции с передачей параметра 	alertMsg
			showResults(alertMsg);

			//если происходит славливание ошибки, то
			// эта ошибка передается в функцию showError ,которая выводит это в поле "Результаты" по цепочке функций
		} catch (e) {
			showError(`Ошибка: ${e}`);
		}
	};

// получаем кнопку "Фильтровать"
const filterButton = document.querySelector('#filter-btn');

// на эту кнопку вешаем обработчика события по клику
filterButton.addEventListener('click', e => {
	// задаем константу, в которой получаем по идентификатору элемент, в котором указано, какой тип данных рассматривать
	const typeInput = document.querySelector('#type');
	// задаем константу, в которой получаем по идентификатору элемент, в который вписываются данные, которые и надо рассмотреть
	const dataInput = document.querySelector('#data');

	// если данных не было введено
	if (dataInput.value === '') {
		//  то выводим соотвествуюшее сообщение
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//вызываем функцию без передачи каких-либо параметров
		showNoResults();

		// если что-то введено в строку, то
	} else {
		//  Элемент не будет иметь пользовательской ошибки: т.е. не важно, что там введено,
		// приложения не будет остановлено по причине ошибки
		dataInput.setCustomValidity('');
		//включается игнорирование стандарного оклика со сторны клика
		e.preventDefault();
		//просиходит вызов функции, при этом передаем значение Типа из инпута и данных их тоже интута
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

