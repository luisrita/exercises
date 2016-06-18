
// var pirate = ["botle", "of", "rum", 5],
// index = 0;

// while (pirate[index] !== "rum"){
//   console.log(pirate[index]);
//   index++;
// }

/*
var alice = {
	size: "small",
	"arch-enemy": "the red queen",
	"age": 7.5
};

console.log(alice.age);
console.log(alice["arch-enemy"]);
*/

// CALCULADORA

// Get all the keys from document
var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;

// Add onclick event to all the keys and perform operations
for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) {
		// Get the input and button values
		var input = document.querySelector('.screen');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;
		
		// Now, just append the key values (btnValue) to the input string and finally use javascript's eval function to get the result
		// If clear key is pressed, erase everything
		if(btnVal == 'C') {
			input.innerHTML = '';
			decimalAdded = false;
		}
		
		// If eval key is pressed, calculate and display the result
		else if(btnVal == '=') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];
			
			// Replace all instances of x and ÷ with * and / respectively. This can be done easily using regex and the 'g' tag which will replace all instances of the matched character/substring
			equation = equation.replace(/÷/g, '/');
			
			// Final thing left to do is checking the last character of the equation. If it's an operator or a decimal, remove it
			if(operators.indexOf(lastChar) > -1 || lastChar == '.')
				equation = equation.replace(/.$/, '');
			
			if(equation)
				input.innerHTML = eval(equation);
				
			decimalAdded = false;
		}
		
		// Basic functionality of the calculator is complete. But there are some problems like 
		// 1. No two operators should be added consecutively.
		// 2. The equation shouldn't start from an operator except minus
		// 3. not more than 1 decimal should be there in a number
		
		// We'll fix these issues using some simple checks
		
		// indexOf works only in IE9+
		else if(operators.indexOf(btnVal) > -1) {
			// Operator is clicked
			// Get the last character from the equation
			var lastChar = inputVal[inputVal.length - 1];
			
			// Only add operator if input is not empty and there is no operator at the last
			if(inputVal != '' && operators.indexOf(lastChar) == -1) 
				input.innerHTML += btnVal;
			
			// Allow minus if the string is empty
			else if(inputVal == '' && btnVal == '-') 
				input.innerHTML += btnVal;
			
			// Replace the last operator (if exists) with the newly pressed operator
			if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				// Here, '.' matches any character while $ denotes the end of string, so anything (will be an operator in this case) at the end of string will get replaced by new operator
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}
			
			decimalAdded =false;
		}
		
		// Now only the decimal problem is left. We can solve it easily using a flag 'decimalAdded' which we'll set once the decimal is added and prevent more decimals to be added once it's set. It will be reset when an operator, eval or clear key is pressed.
		else if(btnVal == '.') {
			if(!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		}
		
		// if any other key is pressed, just append it
		else {
			input.innerHTML += btnVal;
		}
		
		// prevent page jumps
		e.preventDefault();
	} 
}

/*
// Callbacks
obj = {};

function getInfo(callback) {
	obj.name = prompt("whats your name?");
	obj.age = prompt("how old are you?");

	if(typeof callback === "function") {
		return callback(obj.name, obj.age)
	}
}

function giveInfo(name, age) {
	console.log("You are " + name + " and you are " +age+ " years old");
}

getInfo(giveInfo);
*/

// jQuery.fn.tabs = function(control) {
// 	var element = $(this);
// 	control = $(control);

// 	element.delegate('li', 'click', function() {
// 			element.find('li').removeClass('active');
// 			$(this).addClass('active');

// 			var tabName = $(this).attr('data-tab');
// 			control.find('[data-tab]').removeClass('active');
// 			control.find('[data-tab="' + tabName + '"]').addClass('active');
// 	});

// 	element.find('li:first').addClass('active');

// 	return this;
// };

jQuery.fn.tabs = function(control) {
	var element = $(this);
	control = $(control);

	element.delegate('li', 'click', function() {
		// Sacar o nome da tab
		var tabName = $(this).attr('data-tab');

		// Disparar o custom event on tab click
		element.trigger('change.tabs', tabName);
	});

	// Função que muda a class active da li no Evento
	element.on('change.tabs', function(e, tabName) {
		element.find('li').removeClass('active');
		element.find('[data-tab="' + tabName + '"]').addClass('active');
	});

	// Função para alterar a visibilidade do conteudo das tabs
	element.on('change.tabs', function(e, tabName) {
		control.find('[data-tab]').removeClass('active');
		control.find('[data-tab="' + tabName + '"]').addClass('active');
	});

	// Activar o primeiro elemento
	var firstName = element.find('li:first').attr('data-tab');
	element.trigger('change.tabs', firstName);

	return this;
};

$("ul#tabs").tabs("#tabsContent");



$('#clickme').on('click', function(e) {
	e.preventDefault();
	$.getJSON('file:///Users/luisrita/Documents/Projects/Exercicios/luisrita/javascripts/jsontest.json', function(data){
		var items = [];

		$.each(data, function(key, val) {
			items.push('<li id="' + key + '">' + val + '</li>');
		});

		$('<ul/>', {
			'class': 'test-list',
			html: items.join('')
		}).appendTo('.json-content');
	});
});









