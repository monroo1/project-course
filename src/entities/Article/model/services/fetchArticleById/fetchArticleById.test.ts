import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { fetchArticleById } from "./fetchArticleById";
import { Article } from "../../types/article";
import { ArticleBlockType, ArticleType } from "../../consts/articleConsts";

const data: Article = {
    id: "1",
    title: "Javascript news",
    subtitle: "Что нового в JS за 2023 год?",
    img:
        "https://upload.wikimedia.org/wikipedia/commons" +
        "/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png",
    views: 972,
    createdAt: "14.07.2023",
    user: {
        id: "1",
        username: "user",
        avatar: "avatar",
    },
    type: [ArticleType.IT],
    blocks: [
        {
            id: "1",
            type: ArticleBlockType.TEXT,
            title: "Заголовок этого блока",
            paragraphs: [
                "Программа, которую по традиции называют" +
                    " «Hello, world!», очень проста. Она выводит куда-либо фразу" +
                    " «Hello, world!», или другую подобную, средствами некоего языка.",
                "JavaScript — это язык, программы" +
                    " на котором можно выполнять" +
                    " в разных средах. В нашем случае речь идёт" +
                    " о браузерах и о серверной платформе Node.js.",
                "Существуют и другие способы запуска JS-кода в браузере." +
                    " Так, если говорить об обычном использовании программ" +
                    " на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц.",
            ],
        },
        {
            id: "4",
            type: ArticleBlockType.CODE,
            code:
                "<!DOCTYPE html>\n<html>\n  <body>" +
                '\n    <p id="hello"></p>\n\n    <script>\n' +
                '      document.getElementById("hello").innerHTML' +
                ' = "Hello, world!";\n    </script>\n  </body>\n</html>',
        },
        {
            id: "5",
            type: ArticleBlockType.TEXT,
            title: "Заголовок этого блока",
            paragraphs: [
                "Программа, которую по традиции называют" +
                    " «Hello, world!», очень проста. Она выводит куда-либо фразу" +
                    " «Hello, world!», или другую подобную, средствами некоего языка.",
                "Существуют и другие способы запуска JS-кода в браузере." +
                    " Так, если говорить об обычном использовании программ" +
                    " на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц.",
            ],
        },
        {
            id: "2",
            type: ArticleBlockType.IMAGE,
            src:
                "https://hsto.org/getpro/habr/post_images" +
                "/465/185/884/465185884cda3070549c035a37a7a3e8.png",
            title: "Рисунок 1 - скриншот сайта",
        },
        {
            id: "3",
            type: ArticleBlockType.CODE,
            code:
                'const jsonServer = require("json-server")' +
                ";\n\nconst server = jsonServer.create();" +
                "\n\nconst router = jsonServer.router" +
                '(path.resolve(__dirname, "db.json"));',
        },
    ],
};

describe("fetchArticleById.test", () => {
    test("success fetch", async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk("1");

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("fulfilled");
        expect(result.payload).toEqual(data);
    });

    test("error fetch", async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk("1");

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("rejected");
    });
});
