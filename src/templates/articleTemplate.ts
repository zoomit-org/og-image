import { mediaUrl } from "../constants/api";
import type { ArticleTemplateType } from "../types/articleTemplateType";

export const articleTemplate = (templateData: ArticleTemplateType) => {
  const { title, lead, author, coverImageId, commentCount, likeCount } = templateData;

  return `
  <!DOCTYPE html>
    <head>
      <style>
        .container {
	  width: 1200px;
	  height: 627px;
	}
     </style>
    </head>
    <body>
      <div class="container">
        <div>
	  <h1>${title}</h1>
	  <p>${lead}</p>
	  <img src="${mediaUrl}/${coverImageId}" width="100" height="100" />
	</div>
      </div>
    </body>
  </html>
`;
};
