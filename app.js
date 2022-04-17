window.addEventListener('load', () => {
	// Inputs
	let inp_bill_amount = document.getElementById('input-bill-amount');
	let inp_tip_custom_amount = document.getElementById('input-tip-custom');
	let inp_number_people = document.getElementById('input-number-people');

	// Buttons
	let btns_tip = document.getElementById('div-tip-amounts').getElementsByTagName('button');
	let btn_reset = document.getElementById('button-reset');
	let btn_selected; // Holds which tip button was clicked

	// Displayed Values
	let txt_tip_per_person = document.getElementById('text-tip-per-person');
	let txt_amount_per_person = document.getElementById('text-amount-per-person');

	// Error Messages
	let err_number_people = document.getElementById('error-msg-number-people');

	// Calculation Variables
	let bill = 0, tip = 0, people = 0, tip_person = 0, total_person = 0;

	// Convert whole percent to decimal
	function getTipFraction(tip_amount) {
		return parseInt(tip_amount) / 100;
	}

	// Formatting dollar valur for display
	function formatDollars(dollar_amount) {
		return '&dollar;' + parseFloat(dollar_amount).toFixed(2);
	}
	
	// Click events for tip percentage buttons
	for (let i = 0; i < btns_tip.length; ++i) {
		btns_tip[i].addEventListener('click', (e) => {
			tip = getTipFraction(e.target.value);
			e.target.classList.add('button-selected');
			if (btn_selected) btn_selected.classList.remove('button-selected');
			btn_selected = e.target;
			calculate();
		});
	}

	// Validate the number of people entered.
	// If it's 0, then we need to show a message to user.
	function validateNumberOfPeople(e) {
		if (parseInt(inp_number_people.value) === 0) {
			err_number_people.style.display = 'block';
		} else {
			err_number_people.style.display = 'none';
			calculate();
		}
	}

	// Main calculation
	function calculate() {
		bill = parseFloat(inp_bill_amount.value) || 0;
		tip = getTipFraction(inp_tip_custom_amount.value) || tip || 0;
		// Default to 1 or face the wrath of divide by zero
		people = parseInt(inp_number_people.value) || 1;

		if (bill > 0) {
			btn_reset.disabled = false;

			let tip_dollars = bill * tip;
			txt_tip_per_person.innerHTML = formatDollars(tip_dollars / people);

			let total_dollars = bill + tip_dollars;
			txt_amount_per_person.innerHTML = formatDollars(total_dollars / people);
		} else {
			btn_reset.disabled = true;
		}
	}

	// Reset values back to default
	function reset() {
		bill = 0, tip = 0, people = 0, tip_person = 0, total_person = 0;

		inp_bill_amount.value = '';
		inp_tip_custom_amount.value = '';
		inp_number_people.value = '';

		txt_tip_per_person.innerHTML = '&dollar;0.00';
		txt_amount_per_person.innerHTML = '&dollar;0.00';

		btn_reset.disabled = true;
	}

	inp_bill_amount.addEventListener('input', calculate);
	inp_tip_custom_amount.addEventListener('input', calculate);
	inp_number_people.addEventListener('input', validateNumberOfPeople);
	btn_reset.addEventListener('click', reset);
});