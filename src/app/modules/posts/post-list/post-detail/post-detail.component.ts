import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Post } from "../../post.model";
import { Observable } from "rxjs";
import { IUnsplashResponse } from "../../models/unsplash";
import { ImageService } from "../../post-services/image.service";

@Component({
  selector: "app-post-detail",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.scss"],
})
export class PostDetailComponent {
  post: Post;
  imageData$: Observable<IUnsplashResponse> = new Observable();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private imageService: ImageService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.post = this.router.getCurrentNavigation().extras.state.post;
    });
    this.getPhoto(this.post.image);
  }

  onNavigateBackToPosts(): void {
    this.router.navigate(["/blog"]);
  }

  getPhoto(subject: string): void {
    this.imageData$ = this.imageService.photoQuery(subject);
  }
}
