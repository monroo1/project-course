import { Article, ArticleView } from "entities/Article";
import { ArticlesPageSchema } from "../types/articlesPageSchema";
import { articlesPageActions, articlesPageReducer } from "./articlesPageSlice";
import { fetchArticlesList } from "../services/fetchArticlesList/fetchArticlesList";

const article = {
	id: "1",
	title: "Javascript news",
	subtitle: "Что нового в JS за 2023 год?",
	img: "https://upload.wikimedia.org/wikipedia/commons"
        + "/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png",
	views: 972,
	createdAt: "14.07.2023",
	user: {
		id: "1",
		username: "user",
		avatar: "AvatarIcon",
	},
	type: "IT",
	blocks: [
		{
			id: "1",
			type: "TEXT",
			title: "Заголовок этого блока",
			paragraphs: [
				"Программа, которую по традиции называют"
                + " «Hello, world!», очень проста. Она выводит куда-либо фразу"
                + " «Hello, world!», или другую подобную, средствами некоего языка.",
				"JavaScript — это язык, программы"
                + " на котором можно выполнять"
                + " в разных средах. В нашем случае речь идёт"
                + " о браузерах и о серверной платформе Node.js.",
				"Существуют и другие способы запуска JS-кода в браузере."
                + " Так, если говорить об обычном использовании программ"
                + " на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц.",
			],
		},
		{
			id: "4",
			type: "CODE",
			code: "<!DOCTYPE html>\n<html>\n  <body>"
                + "\n    <p id=\"hello\"></p>\n\n    <script>\n"
                + "      document.getElementById(\"hello\").innerHTML"
                + " = \"Hello, world!\";\n    </script>\n  </body>\n</html>",
		},
		{
			id: "5",
			type: "TEXT",
			title: "Заголовок этого блока",
			paragraphs: [
				"Программа, которую по традиции называют"
                + " «Hello, world!», очень проста. Она выводит куда-либо фразу"
                + " «Hello, world!», или другую подобную, средствами некоего языка.",
				"Существуют и другие способы запуска JS-кода в браузере."
                + " Так, если говорить об обычном использовании программ"
                + " на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц.",
			],
		},
		{
			id: "2",
			type: "IMAGE",
			src: "https://hsto.org/getpro/habr/post_images"
                + "/465/185/884/465185884cda3070549c035a37a7a3e8.png",
			title: "Рисунок 1 - скриншот сайта",
		},
		{
			id: "3",
			type: "CODE",
			code: "const jsonServer = require(\"json-server\")"
                + ";\n\nconst server = jsonServer.create();"
                + "\n\nconst router = jsonServer.router"
                + "(path.resolve(__dirname, \"db.json\"));",
		},
	],
} as unknown as Article;

describe("articlesPageSlice.test", () => {
	test("test set view", () => {
		const state: DeepPartial<ArticlesPageSchema> = {
			isLoading: false,
			error: "error",
			view: ArticleView.BIG,
		};
		expect(articlesPageReducer(
			state as ArticlesPageSchema,
			articlesPageActions.setView(ArticleView.SMALL),
		)).toEqual({
			isLoading: false,
			error: "error",
			view: ArticleView.SMALL,
		});
	});
	test("test fetch articles list service pending", () => {
		const state: DeepPartial<ArticlesPageSchema> = {
			isLoading: false,
			error: "undefined",
		};
		expect(articlesPageReducer(
			state as ArticlesPageSchema,
			fetchArticlesList.pending,
		)).toEqual({
			isLoading: true,
			error: undefined,
		});
	});
	test("test fetch comments by article id service fulfilled", () => {
		const state: DeepPartial<ArticlesPageSchema> = {
			isLoading: true,
			error: undefined,
		};
		expect(articlesPageReducer(
			state as ArticlesPageSchema,
			fetchArticlesList.fulfilled([article, { ...article, id: "2" }, { ...article, id: "3" }], ""),
		)).toEqual({
			isLoading: false,
			error: undefined,
			entities: {
				1: article,
				2: { ...article, id: "2" },
				3: { ...article, id: "3" },
			},
			ids: [
				"1",
				"2",
				"3",
			],
		});
	});
});