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
})
export class EditCommentComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit
{
  //post$: Observable<PostEntity | undefined> = this.store.select(selectPost);
  @Input() comment: CommentEntity | undefined;
  @Input() postId: string | undefined;
  @Output() editCancel = new EventEmitter<string>();
  editingComment = '';
  @ViewChild('commentArea') $commentArea?: ElementRef<HTMLTextAreaElement>;

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

  /***************************************************************************
   * Set initial height of the text area
   ***************************************************************************/
  ngAfterViewInit(): void {
    if (this.editingComment) {
      setTimeout(() => {
        this.$commentArea?.nativeElement.focus();
      }, 500);
    }
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
