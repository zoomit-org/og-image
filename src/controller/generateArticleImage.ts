import puppeteer from "puppeteer";
import fetch from "node-fetch";
import type { Request, Response } from "express";
import { articleTemplate } from "../templates/articleTemplate";
import { articleUrl } from "../constans/api";

export const generateImage = async (req: Request, res: Response) => {
  console.log(articleUrl);
  const articleRes = await fetch(
    `${articleUrl}/slug/377159-parliament-chief-warn-central-bank-economy-ministry`
  );
  const data = await articleRes.json();

  const templateData = {
    title: data.articlePage.article.mainInfo.title,
    lead: data.articlePage.article.mainInfo.lead,
    author: data.articlePage.article.authors[0].name,
    coverImageId: data.articlePage.article.mainInfo.coverImageLink.id,
    commentCount: data.articlePage.article.discussionInfo.commentCount,
    likeCount: data.articlePage.article.discussionInfo.likeCount,
  };

  const html = articleTemplate(templateData);

  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Set the content to our rendered HTML
  await page.setContent(html, { waitUntil: "networkidle0" });

  const screenshotBuffer = await page.screenshot({
    fullPage: false,
    type: "png",
    path: "screenshot.png",
  });

  await page.close();
  res.send("ok");
};
