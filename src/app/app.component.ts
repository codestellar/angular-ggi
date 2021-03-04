import { DatePipe } from "@angular/common";
import { Component, VERSION } from "@angular/core";
import { DataService } from "./data.service";
import { CountryData, SummaryData } from "./models";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;

  title = "covid19-tracker";
  summaryData: SummaryData;
  indiaData: CountryData;
  selectedCountryData: CountryData;
  highlyConfirmedData: Array<CountryData>;
  highlyDeathData: Array<CountryData>;
  highlyRecoveredData: Array<CountryData>;
  currentDate: string;

  constructor(private service: DataService, private datePipe: DatePipe) {}
  ngOnInit() {
    let date = new Date();
    this.currentDate = this.datePipe.transform(date, "dd-MMM-yyyy");
    this.getAllData();
  }

  getAllData() {
    this.service.getData().subscribe(response => {
      this.summaryData = response;
      console.log(response);
      this.getIndiaData();
      this.getSortedData();
    });
  }

  getIndiaData() {
    this.indiaData = this.summaryData.Countries.find(x => x.Slug == "india");
  }

  getSortedData() {
    let data = JSON.parse(JSON.stringify(this.summaryData.Countries));
    this.highlyConfirmedData = data
      .sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
      .slice(0, 10);
    this.highlyDeathData = data
      .sort((a, b) => b.TotalDeaths - a.TotalDeaths)
      .slice(0, 10);
    this.highlyRecoveredData = data
      .sort((a, b) => b.TotalRecovered - a.TotalRecovered)
      .slice(0, 10);
  }
}
