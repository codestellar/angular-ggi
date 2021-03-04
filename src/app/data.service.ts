import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class DataService {
  private url: string = "data.json";
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.url).pipe(response => response);
  }
}
