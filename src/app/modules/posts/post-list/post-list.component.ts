import { BehaviorSubject, Observable } from "rxjs";
import { Component, HostListener, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Router, NavigationExtras } from "@angular/router";

import { Post } from "../post";
import { PostService } from "../post-services/post.service";
import { StorageService } from "../post-services/storage.service";

@Component({
  selector: "app-post-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"],
})
export class PostListComponent implements OnInit {
  title = "Read my posts";
  posts$: Observable<BehaviorSubject<Post[]>>;

  constructor(
    private postService: PostService,
    private storageService: StorageService,
    private titleService: Title,
    private metaTagService: Meta,
    private router: Router
  ) {}

  @HostListener("document:visibilitychange", ["$event"]) handleVisibilityChange(event: any): void {
    // this.posts$ = this.postService.getPosts();
  }

  // get posts Observable and store if not stored already
  async ngOnInit():Promise<void> {
    this.posts$ = this.postService.getPosts();
    if (this.storageService.get("storedPosts") == null) {
      this.posts$.subscribe(val => {
        this.storageService.set("storedPosts", val);
      });
    }

    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({
      name: "blog",
      content: "andrewbateman.org",
    });
  }

  onGoToPostDetail(post: Post): void {
    const navigationExtras: NavigationExtras = {
      state: {
        post,
      },
    };
    this.router.navigate(["blog/detail"], navigationExtras);
  }

}
