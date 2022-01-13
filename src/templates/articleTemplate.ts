import type { ArticleTemplateType } from "../types/articleTemplateType";

export const articleTemplate = (templateData: ArticleTemplateType) => {
  const { title, lead, author, coverImageId, commentCount, likeCount } =
    templateData;

  return `

    <div class="article-template">
      <div class="article-template__header">
	<div class="article-template__header-image">
	  <img src="https://picsum.photos/id/${coverImageId}/500/300" alt="">
	</div>
	<div class="article-template__header-info">
	  <div class="article-template__header-info-title">${title}</div>
	  <div class="article-template__header-info-lead">${lead}</div>
	  <div class="article-template__header-info-author">${author}</div>
	</div>
      </div>
      <div class="article-template__footer">
	<div class="article-template__footer-comment">
	  <div class="article-template__footer-comment-count">${commentCount}</div>
	  <div class="article-template__footer-comment-text">Comments</div>
	</div>
	<div class="article-template__footer-like">
	  <div class="article-template__footer-like-count">${likeCount}</div>
	  <div class="article-template__footer-like-text">Likes</div>
	</div>
      </div>
    </div>
 

`;
};
