import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, switchMap } from 'rxjs';
import { createComment } from '../../+state/post.actions';
import { CommentEntity, PostEntity } from '../../+state/post.models';
import { selectComments, selectPost } from '../../+state/post.selectors';

@Component({
  selector: 'united-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent implements OnChanges {
  post$: Observable<PostEntity | undefined> = this.store.select(selectPost);

  commentText = '';
  @ViewChild('commentArea') $commentArea?: ElementRef<HTMLTextAreaElement>;
  @Output() inputFocus = new EventEmitter<boolean>();
  showKeyboard = false;
  @Input() initalFocus = false;
  @Input() comments: CommentEntity[] | undefined;

  constructor(private readonly store: Store) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes: ', changes);
    if (changes['comments'].currentValue) {
      this.comments = changes['comments'].currentValue;
      console.log('comments (from on changes): ', this.comments);
      if (this.initalFocus) {
        setTimeout(() => {
          this.$commentArea?.nativeElement.focus();
        }, 500);
      }
    }
  }

  /***************************************************************************
   * Set initial Focus
   ***************************************************************************/
  // ngAfterViewInit(): void {
  //   console.log('initalFocus: ', this.initalFocus);
  //   console.log('comments: ', this.comments);

  //   if (this.initalFocus) {
  //     setTimeout(() => {
  //       this.$commentArea?.nativeElement.focus();
  //     }, 500);
  //   }
  // }

  onCreateComment(post: PostEntity) {
    this.store.dispatch(
      createComment({ postId: post.id, text: this.commentText })
    );
    this.commentText = '';
  }

  onFocusEvent(event: any) {
    console.log('onFocusEvent');
    this.inputFocus.emit(true);
    this.showKeyboard = true;
  }

  onFocusOutEvent(event: any) {
    // Delay the focus out to allow the comment creation (since the flag: showKeyboard will clear the post button)
    setTimeout(() => {
      this.showKeyboard = false;
      this.inputFocus.emit(false);
    }, 100);
    console.log('onFocusOutEvent');
  }
}
