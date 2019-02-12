 function initialise() {

            updateTotExpensesLabel();
            populateCategories();
            populatePeriod();
            populateSort();
        }


        function switchViews(id) {

            if (id == "btn-show-expense-form") {

                document.getElementById('main-info').style.display = "none";
                document.getElementById('form-add-exp').style.display = "block";
                document.getElementById('form-add-exp').style.display = "grid";
                document.getElementById('btn_UpdateExpense').style.display = "none";
                document.getElementById('btn_AddNewExpense').style.display = "block";
                document.getElementById('myList').style.display = "none";
                document.getElementById('sorting-Bar').style.display = "none";
                clearInputs();

            } else if (id == "btn-show-income-form") {

                document.getElementById('main-info').style.display = "none";
                document.getElementById('income-form').style.display = "block";
                document.getElementById('sorting-Bar').style.display = "none";

            }
        }

        var expenses = [];
        var sal = 0;
        var totalExpenses = 0;
        var key = 0;
        var perc = 0.0;
        var exp_color = "";
        var selectedExpID = "";
        var categories = { "Food": "food", "Books": "Books", "Travel": "Travel", "Shopping": "Shopping", "Insurance": "Insurance", "Fuel": "Fuel", "Subscriptions": "Subscriptions", "Kids": "Kids" };
        var period = { "Daily": "daily", "Weekly": "weekly", "Monthly": "monthly", "6-months": "6-months", "Yearly": "yearly" };
        var selectedCategory = "";
        var selectedPeriod = "";

        function generateKey() {
            key++;
            return "exp" + key;
        }

        class expense {

            constructor(key, category, total, period, notes, isAchived, dateTime) {
                this.key = key;
                this.category = category;
                this.total = total;
                this.period = period;
                this.notes = notes;
                this.isAchived = isAchived;
                this.dateTime = dateTime;
                this.achive = function setAchive(achive) {
                    this.isAchived = achive;
                }
            }


            add(expense) {
                expenses.push(expense);
            }


            //Update expense 
            update(key, category, total, period,notes) {
               
               for(var i = 0;i<expenses.length;i++){
                if (expenses[i].key == selectedExpID) {
                    expenses[i].category = category;
                    expenses[i].total = total;
                    expenses[i].period = period;
                    expenses[i].notes = notes;
                    console.log(expenses[i]);
                    return;
                }
               }
            }

            //Remove expense parameters name
            remove(key) {

                for (var i = 0; i < expenses.length; i++) {
                    if (expenses[i].key == key) {
                        expenses.splice(i, 1);
                        //update income
                        if (sal > 0) {
                            totalExpenses -= expenses[i].total;
                        }
                        break;
                    }
                }
            }
        }

        function getTotalExpenses() {

            var tot = 0.0;
            for (var i = 0; i < expenses.length; i++) {
                var n = parseInt(expenses[i].total);
                tot += n;
            }

            totalExpenses = financial(tot);
            return totalExpenses;
        }

        function isAddedIncome() {

            if (sal != 0) {

                return true;
            } else {

                return false;
            }
        }

        function financial(n) {

            return Number.parseFloat(n).toFixed(2);
        }

        function getIncome() {

            return financial(sal);
        }

        function getTotPercentage(val) {

            var p = ((val / sal) * 100).toFixed(0);
            if (p > 100) {

                p = 100;
            }
            return p;

        }

        function IsExistName(name) {

            for (var i = 0; i < expenses.length; i++) {

                if (expenses[i].name == name) {

                    return true;
                }
                return false;

            }

        }

        function getDate() {

            var date = new Date();
            var day = date.getDay();
            var hrs = date.getHours();
            var mins = date.getMinutes();
            var strDay = DayOfWeek(day, hrs);
            var _day = day <= 9 ? "0" + day : day;
            var time = AMPM(date);
            console.log(hrs);
            return strDay + " " + _day + " " + time;
        }

        function DayOfWeek(day, hrs) {

            if (hrs <= 23) {

                return "Today";
            } else {

                switch (day) {
                    case 1: return "Mon"
                        break;
                    case 2: return "Tues"
                        break;
                    case 3: return "Wed"
                        break;
                    case 4: return "Thu"
                        break;
                    case 5: return "Fri"
                        break;
                    case 6: return "Sat"
                        break;
                    case 7: return "Sun"
                        break;
                }
            }
        }

        function AMPM(date) {

            var hrs = date.getHours();
            var mins = date.getMinutes();
            var ampm = hrs >= 12 ? 'pm' : 'am';
            hrs = hrs % 12;
            hrs = hrs ? hrs : 12;
            mins = mins < 10 ? '0' + mins : mins;
            var time = hrs + ":" + mins + ":" + ampm;
            return time;
        }

        function populateCategories() {

            var selec = document.getElementById('selectCategory');
            //clear options
            for (var i = 0; i < selec.options.length; i++) {

                selec.removeChild(selec.options[i]);
            }

            var df = document.createDocumentFragment();
            //add the default option 
            var option = document.createElement('option');
            option.value = categ;
            option.appendChild(document.createTextNode("select category"));
            df.appendChild(option);

            //add all the categories
            for (var categ in categories) {

                var option = document.createElement('option');
                option.value = categ;
                option.id = categ;
                option.appendChild(document.createTextNode(categ));
                df.appendChild(option);
            }
            selec.appendChild(df);
        }

        function populatePeriod() {

            var container = document.getElementById('div-period');

            //clear

            for (var p in period) {

                var note = document.createElement('label');
                note.className = "period-label";
                note.id = p;
                note.value = p;
                note.innerHTML = p;

                note.addEventListener("click", function (event) {
                    var note_value = event.target.value;
                    selectedPeriod = note_value;
                    console.log(selectedPeriod);
                    var label = document.getElementById(event.target.id);
                    console.log(label.style.background);


                    label.style.background = "rgb(66, 165, 245)";
                    label.style.color = "#FFFFFF";

                    var lbls = document.getElementsByClassName('period-label');
                    for (var i = 0; i < lbls.length; i++) {

                        if (lbls[i].value != note_value) {

                            lbls[i].style.background = "#E0E0E0";
                            lbls[i].style.color = "#000000";
                        }
                    }

                })
                container.appendChild(note);
            }
        }

        function populateSort() {

            var _select = document.getElementById('sort');
            var df = document.createDocumentFragment();
            //add the default option 
            var option = document.createElement('option');
            option.value = "All";
            option.appendChild(document.createTextNode("All"));
            df.appendChild(option);

            //add all the categories
            for (var p in period) {

                var option = document.createElement('option');
                option.value = p;
                option.appendChild(document.createTextNode(p));
                df.appendChild(option);
            }
            _select.appendChild(df);

        }

        //Adds a new expense parms <category,total,period,notes> 
        var list_div = document.getElementById("myList");

        function addNewExpense(category, total, period, notes) {
            var key = generateKey();
            var date = getDate();
            var exp = new expense(key, category, total, period, notes, false, date);
            
            //add expense
            exp.add(exp);

            //display expense
            var note = document.createElement("div");
            note.className = "label";
            note.id = exp.key;
            var category_text = document.createElement("h6");
            var date_text = document.createElement("h6");
            var tot_text = document.createElement("h6");
            category_text.id = exp.key;
            date.id = exp.key;
            tot_text.id = exp.key;
            category_text.className = "name_text";
            date_text.className = "date_text";
            tot_text.className = "tot_text";
            category_text.innerHTML = exp.category;
            date_text.innerHTML = exp.dateTime;
            tot_text.innerHTML = "R" + financial(exp.total);
            note.appendChild(category_text);
            note.append(date_text);
            note.appendChild(tot_text);
            document.getElementById("myList").appendChild(note);

            note.addEventListener("click", function (event) {
                clearInputs();
                var id = event.target.id;
                selectedExpID = id;
                console.log("expense id " + id);
                viewExpense(id);
            })

        }

        //displays a selected expenses
        function viewExpense(id) {

            document.getElementById('main-info').style.display = "none";
            document.getElementById('form-add-exp').style.display = "block";
            document.getElementById('form-add-exp').style.display = "grid";
            document.getElementById('myList').style.display = "none";
            document.getElementById('btn_UpdateExpense').style.display = "block";
            document.getElementById('btn_AddNewExpense').style.display = "none";
            document.getElementById('sorting-Bar').style.display = "none";

            //display expense info
            var _expense = selectExpense(id);
            console.log(_expense);
            //get selected expense

            clearInputs();

            document.getElementById('txtExp_tot').value = _expense.total;
            document.getElementById('txt_notes').value = _expense.notes;
            document.getElementById('header').innerHTML = _expense.category;
            var opt = document.getElementById('selectCategory');
            opt.value = _expense.category;

            //show the category

            var lbls = document.getElementsByClassName('period-label');

            //Hightlight the period
            for (var i = 0; i < lbls.length; i++) {

                if (lbls[i].value == _expense.period) {

                    lbls[i].style.background = "rgb(66, 165, 245)";

                }
            }

        }

        function selectExpense(id) {

            for (var i = 0; i < expenses.length; i++) {

                if (expenses[i].key == id) {
                    console.log("expenssss id " + expenses[i].key);
                    return expenses[i];
                    break;
                }
            }
        }

        function clearInputs() {

            document.getElementById('txtExp_tot').value = "";
            document.getElementById('txt_notes').value = "";
            var lbls = document.getElementsByClassName('period-label');
            for (var i = 0; i < lbls.length; i++) {

                lbls[i].style.background = "#E0E0E0E";
                lbls[i].style.color = "#000000";
            }

            document.getElementById('div-period').innerHTML = "";
            document.getElementById('selectCategory').selectedIndex = "";
            selectedCategory = "";
            populatePeriod();
        }

        function showProgress() {

            if (isAddedIncome == true) {
                document.getElementById('progress-container').style.display = "none";
            } else {
                document.getElementById('progress-container').style.display = "block";
            }
        }

        function updateProgress(perc) {

            document.getElementById('div-progress').style.width = String(perc) + "%";

            console.log(perc);
        }

        function compareExpenseIncome() {
            if (totalExpenses > sal) {
                var diff = totalExpenses - sal;
                var diff = getTotalExpenses() - sal;
                document.getElementById('div-progress').style.width = "100%";
                document.getElementById('div-progress').style.background = "#F44336";
            } else {
                document.getElementById('div-progress').style.background = "#B3E5FC";
            }

        }

        function updateTotExpensesLabel() {

            document.getElementById('tot-expenses').style.color = "black";
            document.getElementById('tot-expenses').innerHTML = "R" + getTotalExpenses();

        }

        function updateIncomeLabels(per) {
           
            document.getElementById('income').innerHTML = "R" + getIncome();
            console.log("percent test " + per);
            document.getElementById('exp_percentage').innerHTML = per + "% of cash";
        }

        function selecCategory(selectOption) {
            selectedCategory = "";
            selectedCategory = selectOption.options[selectOption.selectedIndex].text;
        }

        function sortExpenses(sortOption) {

            var p = sortOption.options[sortOption.selectedIndex].text;
            var myList = document.getElementById("myList");
            //clear the list
            myList.innerHTML = "";
            var tot = 0;

            if (p == "All") {
                for (let i = 0; i < expenses.length; i++) {
                    var category = expenses[i].category;
                    var total = expenses[i].total;
                    var date = expenses[i].dateTime;
                    var key = expenses[i].key;
                    tot += parseInt(expenses[i].total);

                    var note = document.createElement("div");
                    note.className = "label";
                    note.id = key;
                    var category_text = document.createElement("h6");
                    var date_text = document.createElement("h6");
                    var tot_text = document.createElement("h6");
                    category_text.id = key;
                    date.id = key;
                    tot_text.id = key;
                    category_text.className = "name_text"
                    date_text.className = "date_text";
                    tot_text.className = "tot_text"
                    category_text.innerHTML = category;
                    date_text.innerHTML = date;
                    tot_text.innerHTML = "R" + financial(total);
                    note.appendChild(category_text);
                    note.append(date_text);
                    note.appendChild(tot_text);
                    myList.appendChild(note);

                    note.addEventListener("click", function (event) {
                        clearInputs();
                        var id = event.target.id;
                        selectedExpID = id;
                        console.log("expense id " + id);
                        viewExpense(id);
                    })
                }
            }

            for (let i = 0; i < expenses.length; i++) {

                if (expenses[i].period == p) {

                    var category = expenses[i].category;
                    var total = expenses[i].total;
                    var date = expenses[i].dateTime;
                    var key = expenses[i].key;
                    tot += parseInt(expenses[i].total);

                    var note = document.createElement("div");
                    note.className = "label";
                    note.id = key;
                    var category_text = document.createElement("h6");
                    var date_text = document.createElement("h6");
                    var tot_text = document.createElement("h6");
                    category_text.id = key;
                    date.id = key;
                    tot_text.id = key;
                    category_text.className = "name_text"
                    date_text.className = "date_text";
                    tot_text.className = "tot_text"
                    category_text.innerHTML = category;
                    date_text.innerHTML = date;
                    tot_text.innerHTML = "R" + financial(total);
                    note.appendChild(category_text);
                    note.append(date_text);
                    note.appendChild(tot_text);
                    myList.appendChild(note);

                    note.addEventListener("click", function (event) {
                        clearInputs();
                        var id = event.target.id;
                        selectedExpID = id;
                        console.log("expense id " + id);
                        viewExpense(id);
                    })

                }

                var perc = getTotPercentage(tot);
                updateProgress(perc);
                updateIncomeLabels(perc);
                //update label
                document.getElementById('tot-expenses').innerHTML = "R" + financial(tot);

            }

        }

        var buttonAddExp = document.getElementById('btn_AddNewExpense');
        buttonAddExp.addEventListener("click", (event) => {
            event.preventDefault();

            var tot = parseInt(document.getElementById('txtExp_tot').value);
            console.log(selectedCategory);
            var period = selectedPeriod;
            var notes = document.getElementById('txt_notes').value;
            var optns = document.getElementById('selectCategory');

            if (tot == "" || tot<0) {

                document.getElementById('error_text').innerHTML = "Enter the total";

            } else if (selectedCategory == "" || optns.selectedIndex == 0) {
                document.getElementById('error_text').innerHTML = "Select category";
            } else if (selectedPeriod == "") {

                document.getElementById('error_text').innerHTML = "Select period";

            } else {

                addNewExpense(selectedCategory, tot, period, notes);
                document.getElementById('error_text').style.display = "none";
                document.getElementById('form-add-exp').style.display = "none";
                document.getElementById('main-info').style.display = "block";
                document.getElementById('myList').style.display = "block";
                document.getElementById('sorting-Bar').style.display = "block";
                //update total
                updateTotExpensesLabel();

                console.log(getTotalExpenses());
                console.log("percentage: " + getTotPercentage());
                if (isAddedIncome() == true) {
                    var tot = getTotalExpenses();
                    var perc = getTotPercentage(tot);
                    updateProgress(perc);
                    updateIncomeLabels(perc);
                    showProgress();
                    updateTotExpensesLabel();
                    compareExpenseIncome();
                }
            }
        })

        var buttonUpdateExp = document.getElementById('btn_UpdateExpense');
        buttonUpdateExp.addEventListener("click", (event) => {
            event.preventDefault();
           
            var selectOption = document.getElementById('selectCategory');
            var total = parseInt(document.getElementById('txtExp_tot').value);
            var category = selectOption.options[selectOption.selectedIndex].text;
            var notes = document.getElementById("txt_notes").value;
            var period = selectedPeriod;

            if(total!="" && category !=""&&total>0){
            updateExpense(total, category, period, notes);
            }
        })

        function updateExpense(total, category, period, notes) {
                   //key, category, total, period,notes

            //update expense
            var exp = new expense();
            exp.update(selectedExpID,category,total,period,notes);

            //update the expense list
            var key = selectedExpID;
            //replace expense with an updated one
            var list = document.getElementById('myList');
            var note = document.createElement("div");
            note.className = "label";
            note.style.background = "#B3E5FC";
            note.id = key;
            var category_text = document.createElement("h6");
            var date_text = document.createElement("h6");
            var tot_text = document.createElement("h6");
            category_text.id = key;
            date_text.id = key;
            tot_text.id = key;
            category_text.className = "name_text"
            date_text.className = "date_text";
            tot_text.className = "tot_text"
            category_text.innerHTML = category;
            date_text.innerHTML = getDate();
            tot_text.innerHTML = "R" + financial(total);
            note.appendChild(category_text);
            note.append(date_text);
            note.appendChild(tot_text);

            //replace the old expense with an updated one
            var old_exp = document.getElementById(selectedExpID);
            list.replaceChild(note, old_exp);

            note.addEventListener("click", function (event) {
                var id = event.target.id;
                selectedExpID = id;
                console.log("expense id " + id);
                viewExpense(id);
            })

            rollback();

            //update total
            updateTotExpensesLabel();

            console.log(getTotalExpenses());
            console.log("percentage: " + getTotPercentage());
            if (isAddedIncome() == true) {
                var tot = getTotalExpenses();
                var perc = getTotPercentage(tot);
                updateProgress(perc);
                updateIncomeLabels(perc);
                updateProgress();
                showProgress();
                updateTotExpensesLabel();
                compareExpenseIncome();
            }
        }

        var btnCancel = document.getElementById('btn-Cancel-expense');
        btnCancel.addEventListener("click", (event) => {

            event.preventDefault();
            rollback();

        })

        var form = document.getElementById('income-form');
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            saveIncome();
        })


        function saveIncome() {
            var income = parseInt(document.getElementById('txt_income').value);
            document.getElementById('error_text_1').style.display = "none";
            if (income > 0) {
                sal = income;
                document.getElementById('income-form').style.display = "none";
                document.getElementById('main-info').style.display = "block";
                var tot = getTotalExpenses();
                var perc = getTotPercentage(tot);
                updateProgress(perc);
                updateIncomeLabels(perc);
                console.log("Perc test " + perc + "tot " + tot);
                updateProgress(perc);

                updateTotExpensesLabel();
                compareExpenseIncome();
                showProgress();
                console.log("percccc" + perc);
                document.getElementById('income-div').style.display = "block";
                document.getElementById('sorting-Bar').style.display = "block";

            } else {
                document.getElementById('error_text_1').style.display = "block";
                document.getElementById('error_text_1').style.color = "red";
                document.getElementById('error_text_1').innerHTML = "Incorrect cash";

            }
        }

        
        var cnt = 1;
        function displayExpenses() {

            for (var i = 0; i < expenses.length; i++) {
                var note = document.createElement("div");
                note.className = "label";
                note.id = expenses[i].key;
                note.style.background = expenses[i].color;
                var name_text = document.createElement("h6");
                var date_text = document.createElement("h6");
                var tot_text = document.createElement("h6");
                name_text.className = "name_text"
                date_text.className = "date_text";
                tot_text.className = "tot_text"
                var btn_del = document.createElement("button");
                btn_del.id = expenses[i].key;
                name_text.innerHTML = expenses[i].category;
                date_text.innerHTML = expenses[i].dateTime;
                tot_text.innerHTML = "R" + financial(expenses[i].total);
                note.appendChild(name_text);
                note.append(date_text);
                note.appendChild(tot_text);
                document.getElementById("myList").appendChild(note);
            }
        }

        displayExpenses();



        function rollback() {

            document.getElementById('error_text').style.display = "none";
            document.getElementById('form-add-exp').style.display = "none";
            document.getElementById('main-info').style.display = "block";
            document.getElementById('myList').style.display = "block";
            document.getElementById('myList').style.display = "grid";
            document.getElementById('header').innerHTML = "Mini Budget";
            document.getElementById('sorting-Bar').style.display = "block";

        }