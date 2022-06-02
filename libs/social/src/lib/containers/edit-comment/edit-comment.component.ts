import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { editComment } from '../../+state/post.actions';
import { CommentEntity } from './../../+state/post.models';

@Component({
  selector: 'united-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss'],
}) /* ,AfterViewInit */
export class EditCommentComponent implements OnInit, OnDestroy, OnChanges {
  //post$: Observable<PostEntity | undefined> = this.store.select(selectPost);
  @Input() comment: CommentEntity | undefined;
  @Input() postId: string | undefined;
  @Input() focus: boolean | undefined;
  @Output() editCancel = new EventEmitter<string>();
  @Output() inputFocus = new EventEmitter<boolean>();
  @ViewChild('commentArea') $commentArea?: ElementRef<HTMLTextAreaElement>;
  editingComment = '';
  showKeyboard = false;

  constructor(private readonly store: Store) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes: ', changes);

    if (changes['comment']) {
      if (changes['comment'].currentValue) {
        this.editingComment = changes['comment'].currentValue.text;
        if (this.focus) {
          setTimeout(() => {
            this.$commentArea?.nativeElement.focus();
          }, 1000);
        }
      }
    }
    if (changes['focus']) {
      if (changes['focus'].currentValue) {
        this.focus = changes['focus'].currentValue;
        if (this.focus) {
          setTimeout(() => {
            this.$commentArea?.nativeElement.focus();
          }, 1000);
        }
      }
    }
  }

  ngOnInit(): void {
    console.log('EditCommentComponent - ngOnInit');
  }

  /***************************************************************************
   * Set initial Focus
   ***************************************************************************/
  // ngAfterViewInit(): void {
  //   console.log('ngAfterViewInit');
  //   if (this.editingComment) {
  //     setTimeout(() => {
  //       this.$commentArea?.nativeElement.focus();
  //     }, 500);
  //   }
  // }

  ngOnDestroy(): void {
    console.log('EditCommentComponent - ngOnDestroy');
  }

  onEditComment() {
    console.log(
      'EditCommentComponent - Edited comment text: ' + this.editingComment,
      this.comment
    );

    if (this.postId && this.comment)
      this.store.dispatch(
        editComment({
          postId: this.postId,
          commentId: this.comment.id,
          text: this.editingComment,
        })
      );
    this.editingComment = '';
  }

  onEditCommentCancel() {
    this.editCancel.emit(this.comment?.id);
    this.editingComment = '';
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
