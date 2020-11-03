class Calendar {
    constructor(calendarDiv) {

        Date.prototype.normalSukaGetDay = function () {
            var day = this.getDay();
            return day == 0 ? 6 : day - 1;
        };

        this.CalendarNODE = calendarDiv;
        this.CalendarNODE.style.position = "relative";
        
        this.currentYear = new Date().getFullYear();
        this.currentMounth = new Date().getMonth() + 1;
        this.datesInCurrentMounth = this.getDaysInMounth(
            this.currentYear,
            this.currentMounth
        );
        this.DateStartAt = this.getDateStartAt(
            this.currentYear,
            this.currentMounth
        );
        this.table = document.createElement("table");
        this.table.style.userSelect = "none";

        this.infoDiv = document.createElement("div")
        this.infoDiv.style.display = "flex";
        this.infoDiv.style.justifyContent = "space-between";
        this.CalendarNODE.appendChild(this.infoDiv);

        this.mounth = document.createElement("h2");
        this.infoDiv.appendChild(this.mounth);
        
        this.year = document.createElement("h2");
        this.year.textContent = this.currentYear;
        this.year.style.padding = 0;
        this.infoDiv.appendChild(this.year);

    }
    getDaysInMounth(year, mounth) {
        return new Date(year, mounth, 0).getDate();
    }
    getDateStartAt(y, m) {
        return new Date(y, m, 1).normalSukaGetDay();
    }
    getWeekDay(date) {
        let days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

        return days[date];
    }
    getMonth(number){
        let mounths = ["","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return mounths[number];
    }
    generetaCalendar() {
        const table = this.table;
        var day = 1;
        this.year.textContent = this.currentYear;
        for (let i = 0; i <= 6; i++) {
            if (day > this.datesInCurrentMounth) continue;
            const tr = document.createElement("tr");
            table.appendChild(tr);

            for (let k = 0; k <= 6; k++) {
                const td = document.createElement("th");
                td.style.textAlign = "center";
                tr.appendChild(td);
                if (i == 0) {
                    td.textContent = this.getWeekDay(k);
                    continue;
                }
                if ((i == 1 && k < this.DateStartAt) || day > this.datesInCurrentMounth)
                    continue;
                td.textContent = day;
                day++;
            }
        }
       

        const mounthText = this.getMonth(this.currentMounth);
        
        this.mounth.textContent = mounthText;

        this.CalendarNODE.appendChild(table);

        if (!this.foterCreated) this.createFooter();
    }
    createFooter(){
        const div = this.footerDiv = document.createElement("div");
        div.style.display = "flex";
        div.style.justifyContent = "space-between";

        div.appendChild(this.BackNextBttn());
        div.appendChild(this.SelectYearNode());

        this.CalendarNODE.appendChild(div);

        this.foterCreated = true;
    }
    BackNextBttn() {
        var hover = (event) => {
            if (event.type == "mouseover") {
                event.target.style.background = "rgb(206,206,206)";
            }
            if (event.type == "mouseout") {
                event.target.style.background = "#f1f1f1";
            }
        };
        const div = document.createElement("div");
        div.style.paddingTop = "15px";
        div.style.userSelect = "none";

        const back = document.createElement("a");
        const next = document.createElement("a");

        back.textContent = "<";
        next.textContent = ">";

        div.appendChild(back);
        div.appendChild(next);

        back.style.fontSize = next.style.fontSize = "16px"
        back.style.padding = next.style.padding = "10px";
        back.style.border = next.style.border = "none";
        back.style.boxShadow = next.style.boxShadow = "none";
        back.style.cursor = next.style.cursor = "pointer";
        back.style.background = next.style.background = "#f1f1f1";
        back.style.margin = next.style.margin = "5px";

        back.onmouseover = back.onmouseout = next.onmouseover = next.onmouseout = hover;
        back.addEventListener("click", () => this.back());
        next.addEventListener("click", () => this.next());

        
        return div;
    }
    SelectYearNode (){
        const div = document.createElement("div");

        const select = document.createElement("select");
        select.style.userSelect = "none";

        for (let i = 2010; i <= this.currentYear + 10; i++){
            const year = i;

            const option = document.createElement("option");
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
        if (this.currentMounth == 12) {
            this.currentYear = +this.currentYear + 1;
            this.currentMounth = 1;
        } else {
            this.currentMounth += 1;
        }
        this.preGenerate();
    }
    back() {
        if (this.currentMounth == 1) {
            this.currentYear = +this.currentYear - 1;
            this.currentMounth = 12;
        } else {
            this.currentMounth -= 1;
        }
        this.preGenerate();
    }
    preGenerate(){
        this.datesInCurrentMounth = this.getDaysInMounth(
            this.currentYear,
            this.currentMounth
        );
        this.DateStartAt = this.getDateStartAt(
            this.currentYear,
            this.currentMounth
        );
        this.table.innerHTML = "";
        this.generetaCalendar();
        this.CalendarNODE.appendChild(this.footerDiv);
    }
}
