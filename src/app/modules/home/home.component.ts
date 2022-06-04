import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

import { AREAS } from "./areas";
import { Observable } from "rxjs";
import { Area } from "./area.module";

@Component({
  selector: "app-home",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  title = "Home";
  areas = AREAS;
  repos$: Observable<number>;

  constructor(
    private metaTagService: Meta,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({
      name: "home",
      content: "andrewbateman.org",
    });
  }

  trackByFn(index: number, area: Area): number {
    return area.id;
  }
}
