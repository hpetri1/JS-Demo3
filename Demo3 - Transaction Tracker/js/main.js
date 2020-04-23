// Enter JavaScript for the exercise here...
window.addEventListener("load", function(){
 
    //TIMER
    var timeoutID;
    //to reset the timer when user is active
    function setup() {
        this.addEventListener("mousemove", resetTimer, false);
        this.addEventListener("mousedown", resetTimer, false);
        this.addEventListener("keypress", resetTimer, false);
        this.addEventListener("DOMMouseScroll", resetTimer, false);
        this.addEventListener("mousewheel", resetTimer, false);
        this.addEventListener("touchmove", resetTimer, false);
        this.addEventListener("MSPointerMove", resetTimer, false);
     
        startTimer();
    }
    setup();
     
    function startTimer() {
        // wait 2 minutes before calling goInactive
        timeoutID = window.setTimeout(goInactive, 120000);
    }
     
    function resetTimer(e) {
        window.clearTimeout(timeoutID);    
        goActive();
    }
     
    function goInactive() {
        alert("You have been inactive for 2 minutes, the page will be reloaded!");
        location.reload(true);
    }
     
    function goActive() {
        startTimer();
    }//End TIMER


    var transactionForm = document.querySelector('.frm-transactions');
    transactionForm.setAttribute('name', 'myForm');

    var description = document.forms["myForm"]["description"];
    var transactiontype = document.forms["myForm"]["type"];
    var currency = document.forms["myForm"]["currency"];

    var errorDisplay = document.querySelector('.error');
    var debits = document.querySelector('.debits');
    var credits = document.querySelector('.credits');
    var listOfTransactions = document.querySelector('tbody');

    transactionForm.addEventListener('submit', function(evt){

        evt.preventDefault();

        if(description.value == ""){
            errorDisplay.innerHTML = "Please enter a description.";
            return false;
        }

        if(transactiontype.value == ""){
            errorDisplay.innerHTML = "Please select a type.";
            return false;
        }

        if(currency.value == "" || currency < 0){
            errorDisplay.innerHTML = "Please enter a positive amount.";
            return false;
        }
       
        else{
            errorDisplay.innerHTML = ""; 

            // create required elements
            var listRow = document.createElement('tr');
            var descriptionData = document.createElement('td');
            var typeData = document.createElement('td');
            var amountData = document.createElement('td');
            var deleteData = document.createElement('td');
            var deleteIcon = document.createElement('i');

            // set appropriate attributes and add values
            if (transactiontype.value == "debit"){
                typeData.setAttribute('class', 'debit');
                deleteIcon.setAttribute('class', 'delete fa fa-trash-o debit');
                typeData.innerHTML = transactiontype.value;
                listRow.style.backgroundColor = '#efdae1';

                var totalDebits = Number(debits.innerHTML.replace("$", "")) + Number(currency.value);
                debits.innerHTML = "$" + totalDebits.toFixed(2);
            }
            if (transactiontype.value == "credit"){
                typeData.setAttribute('class', 'credit');
                deleteIcon.setAttribute('class', 'delete fa fa-trash-o credit');
                typeData.innerHTML = transactiontype.value;
                listRow.style.backgroundColor = '#e7f4d9';

                var totalCredits = Number(credits.innerHTML.replace("$", "")) + Number(currency.value);
                credits.innerHTML = "$" + totalCredits.toFixed(2);
            }

            amountData.setAttribute('class', 'amount');
            deleteData.setAttribute('class', 'tools');
            //deleteIcon.setAttribute('class', 'delete fa fa-trash-o');
            descriptionData.innerHTML = description.value;
            amountData.innerHTML = "$" + Number(currency.value).toFixed(2);

            // build document fragment
            listRow.appendChild(descriptionData);
            listRow.appendChild(typeData);
            listRow.appendChild(amountData);
            listRow.appendChild(deleteData);
            deleteData.appendChild(deleteIcon);

            // add the document fragment to the document for rendering
            listOfTransactions.appendChild(listRow);

            // clear the form
	        evt.target.reset();
        }       
    })

    listOfTransactions.addEventListener('click', function(evt){
        //check for click on a trash icon
        var targetTrash = evt.target.parentNode;
        var transactionEntry = targetTrash.parentNode;

        //will remove the transaction only if the trash icon has been clicked, without if statement it would remove the transaction if also clicking some other place
        if(evt.target.classList.contains('delete')){

            var result = confirm("Are you sure you want to delete this transaction?")

            if(result)
            {
                transactionEntry.remove();
                
                //Calculate new Total debit after removal
                if(evt.target.classList.contains('debit')){                
                    var amount = targetTrash.previousSibling.innerHTML;
                    var totalDebits = Number(debits.innerHTML.replace("$", "")) - Number(amount.replace("$", ""));
                    debits.innerHTML = "$" + totalDebits.toFixed(2);
                }

                //Calculate new Total credit after removal
                if(evt.target.classList.contains('credit')){               
                    var amount = targetTrash.previousSibling.innerHTML;
                    var totalCredits = Number(credits.innerHTML.replace("$", "")) - Number(amount.replace("$", ""));
                    credits.innerHTML = "$" + totalCredits.toFixed(2);               
                }
            }

        }
    })
})