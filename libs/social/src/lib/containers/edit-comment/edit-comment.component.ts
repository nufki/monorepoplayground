import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { editComment } from '../../+state/post.actions';
import { CommentEntity } from './../../+state/post.models';

@Component({
  selector: 'united-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss'],
})
export class EditCommentComponent implements OnInit, OnDestroy, OnChanges {
  //post$: Observable<PostEntity | undefined> = this.store.select(selectPost);
  @Input() comment: CommentEntity | undefined;
  @Input() postId: string | undefined;
  @Output() editCancel = new EventEmitter<string>();
  editingComment = '';

  constructor(private readonly store: Store) {}

  ngOnChanges(changes: SimpleChanges) {
    // console.log('changes: ', changes);
    if (changes['comment'].currentValue) {
      this.editingComment = changes['comment'].currentValue.text;
    }
  }

  ngOnInit(): void {
    console.log('EditCommentComponent - ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('EditCommentComponent - ngOnDestroy');
  }

  onEditComment() {
    console.log('Edited comment text: ' + this.editingComment, this.comment);

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
}
