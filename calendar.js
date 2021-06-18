Date.prototype.GetDayFrom1 = function () {
    var day = this.getDay();
    return day == 0 ? 6 : day - 1;
};

class Calendar {
    constructor(calendarDiv) {

        this.CalendarNODE = calendarDiv;
        
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth() + 1;
        this.datesInCurrentMonth = this.getDaysInMonth(
            this.currentYear,
            this.currentMonth
        );
        this.DateStartAt = this.getDateStartAt(
            this.currentYear,
            this.currentMonth
        );
        this.table = document.createElement("table");
        this.table.classList.add("calendar-table")

        this.infoDiv = document.createElement("div")
        this.infoDiv.classList.add("calendar-page-info")
        this.CalendarNODE.appendChild(this.infoDiv);

        this.month = document.createElement("h2");
        this.month.classList.add("calendar-current-month")
        this.infoDiv.appendChild(this.month);
        
        this.year = document.createElement("h2");
        this.year.textContent = this.currentYear;
        this.year.classList.add("calendar-current-year")
        this.infoDiv.appendChild(this.year);

    }
    getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }
    getDateStartAt(y, m) {
        return new Date(y, m, 1).GetDayFrom1();
    }
    getWeekDay(date) {
        let days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

        return days[date];
    }
    getMonth(number){
        let months = ["","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return months[number];
    }
    generetaCalendar() {
        const table = this.table;
        var day = 1;
        this.year.textContent = this.currentYear;
        for (let i = 0; i <= 6; i++) {
            if (day > this.datesInCurrentMonth) continue;
            const tr = document.createElement("tr");
            tr.classList.add("calendar-line");
            if(i == 0) tr.classList.add("calendar-days-line");
            table.appendChild(tr);

            for (let k = 0; k <= 6; k++) {
                const td = document.createElement("th");
                td.classList.add("calendar-item");
                tr.appendChild(td);
                if (i == 0) {
                    td.textContent = this.getWeekDay(k);
                    td.classList.add("calendar-day");
                    continue;
                }
                if ((i == 1 && k < this.DateStartAt) || day > this.datesInCurrentMonth){
                    td.classList.add("calendar-empty-item");
                    continue;
                }
                td.textContent = day;
                day++;
            }
        }
       

        const monthText = this.getMonth(this.currentMonth);
        
        this.month.textContent = monthText;

        this.CalendarNODE.appendChild(table);

        if (!this.foterCreated) this.createFooter();
    }
    createFooter(){
        const div = this.footerDiv = document.createElement("div");
        div.classList.add("calendar-footer");

        div.appendChild(this.BackNextBttn());
        div.appendChild(this.SelectYearNode());

        this.CalendarNODE.appendChild(div);

        this.foterCreated = true;
    }
    BackNextBttn() {
        const buttons = document.createElement("div");
        buttons.classList.add("calendar-buttons");

        const back = document.createElement("a");
        const next = document.createElement("a");

        back.textContent = "<";
        next.textContent = ">";

        buttons.appendChild(back);
        buttons.appendChild(next);

        back.classList.add("calendar-button");
        next.classList.add("calendar-button");

        back.classList.add("calendar-button-back");
        next.classList.add("calendar-button-back");

        back.addEventListener("click", () => this.back());
        next.addEventListener("click", () => this.next());

        
        return buttons;
    }
    SelectYearNode (){
        const div = document.createElement("div");
        div.classList.add("calendar-year-select-wrapper");

        const select = document.createElement("select");
        select.classList.add("calendar-year-select");

        for (let i = 2010; i <= this.currentYear + 10; i++){
            const year = i;

            const option = document.createElement("option");
            option.classList.add("calendar-select-year-item");
            option.value = year;
            option.textContent = year;

            if(i == 0) option.selected = true;

            select.appendChild(option);
        }
        select.selectedIndex = 10;

        select.addEventListener("change",(e)=>{
            this.currentYear = "20" + (select.selectedIndex + 10);
            this.preGenerate();
        })

        div.appendChild(select);

        return div;
    }
    next() {
        if (this.currentMonth == 12) {
            this.currentYear = +this.currentYear + 1;
            this.currentMonth = 1;
        } else {
            this.currentMonth += 1;
        }
        this.preGenerate();
    }
    back() {
        if (this.currentMonth == 1) {
            this.currentYear = +this.currentYear - 1;
            this.currentMonth = 12;
        } else {
            this.currentMonth -= 1;
        }
        this.preGenerate();
    }
    preGenerate(){
        this.datesInCurrentMonth = this.getDaysInMonth(
            this.currentYear,
            this.currentMonth
        );
        this.DateStartAt = this.getDateStartAt(
            this.currentYear,
            this.currentMonth
        );
        this.table.innerHTML = "";
        this.generetaCalendar();
        this.CalendarNODE.appendChild(this.footerDiv);
    }
}
