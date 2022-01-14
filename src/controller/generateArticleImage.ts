import type { Request, Response } from "express";
import fs from "fs/promises";
import fetch from "node-fetch";
import path from "path";
import puppeteer from "puppeteer";
import { client } from "../app";
import { articleUrl } from "../constants/api";
import { articleTemplate } from "../templates/articleTemplate";

export const generateImage = async (req: Request, res: Response) => {
  const { category, slug } = req.params;

  const url = await client.get(`${category}/${slug}`);
  if (url) {
    return res.redirect(url);
  }

  const articleRes = await fetch(`${articleUrl}/${category}/${slug}`);

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

  const browser = await puppeteer.launch({ defaultViewport: { width: 1200, height: 627 } });

  // Create a new page
  const page = await browser.newPage();

  // Set the content to our rendered HTML
  await page.setContent(html, { waitUntil: "networkidle0" });

  const screenshotBuffer = await page.screenshot({
    fullPage: false,
    type: "png",
  });
  await fs.writeFile(path.join(__dirname, "..", "..", "images", `${slug}.png`), screenshotBuffer, { flag: "w+" });

  await page.close();

  client.set(`${category}/${slug}`, `/images/${slug}.png`);
  res.redirect(`/images/${slug}.png`);
};
