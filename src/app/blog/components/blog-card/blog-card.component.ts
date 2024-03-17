import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BlogItem } from "../../models/blog.models";

@Component({
  selector: "app-blog-card",
  templateUrl: "./blog-card.component.html",
  styleUrls: ["./blog-card.component.scss"],
})
export class BlogCardComponent implements OnInit {
  @Input() data: BlogItem;
  @Output() openBlog: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}
}
