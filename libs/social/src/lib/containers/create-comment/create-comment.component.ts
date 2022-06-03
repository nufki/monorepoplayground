import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createComment } from '../../+state/post.actions';
import { PostEntity } from '../../+state/post.models';
import { selectPost } from '../../+state/post.selectors';

@Component({
  selector: 'united-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent implements OnChanges {
  post$: Observable<PostEntity | undefined> = this.store.select(selectPost);
  @Output() inputFocus = new EventEmitter<boolean>();
  @Input() initalFocus = false;
  @Input() numComments = 0;

  @ViewChild('commentArea') $commentArea?: ElementRef<HTMLTextAreaElement>;

  commentText = '';
  showKeyboard = false;

  constructor(private readonly store: Store) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['numComments']) {
      if (this.numComments === 0) {
        setTimeout(() => {
          this.$commentArea?.nativeElement.focus();
        }, 500);
      }
    }
  }

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
