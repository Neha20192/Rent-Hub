import { Component, inject, OnInit } from '@angular/core';
import { Property } from '../../../Model/property.model';
import { PropertyComment } from '../../../Model/comment.model'; // Updated import name
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PropertyService } from '../../../services/property';
import { FormsModule } from '@angular/forms';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { Auth } from '../../../services/auth/auth';
import { map } from 'rxjs';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [ FormsModule, CommonModule, RouterLink],
  templateUrl: './property-details.html',
  styleUrl: './property-details.scss',
})
export class PropertyDetails implements OnInit {
  private authService = inject(Auth);
  property: Property | undefined;

  newAuthorName: string = '';
  newCommentText: string = '';

  activeReplyId: number | null = null;
  replyAuthorName: string = '';
  replyText: string = '';

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.property = this.propertyService
      .getProperties()
      .find((property) => property.id === id);

    if (this.property && !this.property.comments) {
      this.property.comments = [];
    }
  }

  addComment(): void {
    if (!this.newAuthorName.trim() || !this.newCommentText.trim() || !this.property) {
      return;
    }

    const newComment: PropertyComment = {
      id: Date.now(),
      propertyId: this.property.id,
      authorName: this.newAuthorName.trim(),
      text: this.newCommentText.trim(),
      createdAt: new Date(),
      replies: []
    };

    this.property.comments?.unshift(newComment);

    this.newAuthorName = '';
    this.newCommentText = '';
  }

  toggleReply(commentId: number): void {
    this.activeReplyId = this.activeReplyId === commentId ? null : commentId;
    this.replyAuthorName = '';
    this.replyText = '';
  }

  addReply(parentComment: PropertyComment): void {
    if (!this.replyAuthorName.trim() || !this.replyText.trim()) {
      return;
    }

    if (!parentComment.replies) {
      parentComment.replies = [];
    }

    const newReply: PropertyComment = {
      id: Date.now(),
      propertyId: parentComment.propertyId,
      authorName: this.replyAuthorName.trim(),
      text: this.replyText.trim(),
      createdAt: new Date()
    };

    parentComment.replies.push(newReply);
    this.activeReplyId = null;
  }

  isAdmin$ = this.authService.currentUser$.pipe(
      map(user => user?.role === 'admin')
    );
}