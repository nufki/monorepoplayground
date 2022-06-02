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
  @Input() comment: CommentEntity | undefined;
  @Input() postId: string | undefined;
  @Input() focus: boolean | undefined; // Required to manage the focus
  @Output() editCancel = new EventEmitter<string>();
  @Output() inputFocus = new EventEmitter<boolean>();
  @ViewChild('commentArea') $commentArea?: ElementRef<HTMLTextAreaElement>;

  editingCommentText = '';
  showKeyboard = false;

  constructor(private readonly store: Store) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes: ', changes);

    if (changes['comment'] && changes['comment'].currentValue) {
      this.editingCommentText = changes['comment'].currentValue.text;
    }

    if (changes['focus'] && changes['focus'].currentValue) {
      this.focus = changes['focus'].currentValue;
      if (this.focus) {
        setTimeout(() => {
          this.$commentArea?.nativeElement.focus();
        }, 500);
      }
    }
  }

  ngOnInit(): void {
    console.log('EditCommentComponent - ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('EditCommentComponent - ngOnDestroy');
  }

  onEditComment() {
    console.log(
      'EditCommentComponent - Edited comment text: ' + this.editingCommentText,
      this.comment
    );

    if (this.postId && this.comment)
      this.store.dispatch(
        editComment({
          postId: this.postId,
          commentId: this.comment.id,
          text: this.editingCommentText,
        })
      );
    this.editingCommentText = '';
  }

  onEditCommentCancel() {
    this.editCancel.emit(this.comment?.id);
    this.editingCommentText = '';
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
