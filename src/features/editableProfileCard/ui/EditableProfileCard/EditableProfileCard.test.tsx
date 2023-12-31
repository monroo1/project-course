import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";
import { Profile } from "@/entities/Profile";
import { Currency } from "@/entities/Currency";
import { Country } from "@/entities/Country";
import { profileReducer } from "../../model/slice/profileSlice";
import { EditableProfileCard } from "./EditableProfileCard";
// import { $api } from "@/shared/api/api";

const profile: Profile = {
    id: "1",
    first: "admin",
    lastname: "admin",
    age: 21,
    currency: Currency.RUB,
    country: Country.Russia,
    city: "Krasnodar",
    username: "monroo",
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: {
                id: "1",
            },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

describe("features/EditableProfileCard", () => {
    test("Режим рид онли должен переключаться ", async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await act(async () =>
            userEvent.click(
                screen.getByTestId("EditableProfileCardHeader.EditButton"),
            ),
        );
        expect(
            screen.getByTestId("EditableProfileCardHeader.CancelButton"),
        ).toBeInTheDocument();
    });
    test("При отмене, должны обнуляться значения ", async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await act(async () =>
            userEvent.click(
                screen.getByTestId("EditableProfileCardHeader.EditButton"),
            ),
        );

        await act(async () => {
            await userEvent.clear(screen.getByTestId("ProfileCard.firstname"));
            await userEvent.clear(screen.getByTestId("ProfileCard.lastname"));
        });

        await act(async () => {
            await userEvent.type(
                screen.getByTestId("ProfileCard.firstname"),
                "user",
            );
            await userEvent.type(
                screen.getByTestId("ProfileCard.lastname"),
                "user",
            );
        });

        expect(screen.getByTestId("ProfileCard.firstname")).toHaveValue("user");
        expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("user");

        await act(async () =>
            userEvent.click(
                screen.getByTestId("EditableProfileCardHeader.CancelButton"),
            ),
        );

        expect(screen.getByTestId("ProfileCard.firstname")).toHaveValue(
            "admin",
        );
        expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("admin");
    });
    test("Должна появиться ошибка ", async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await act(async () =>
            userEvent.click(
                screen.getByTestId("EditableProfileCardHeader.EditButton"),
            ),
        );

        await act(async () =>
            userEvent.clear(screen.getByTestId("ProfileCard.firstname")),
        );

        await act(async () =>
            userEvent.click(
                screen.getByTestId("EditableProfileCardHeader.SaveButton"),
            ),
        );

        expect(
            screen.getByTestId("EditableProfileCard.Error.Paragraph"),
        ).toBeInTheDocument();
    });
    // test("Без ошибок уходит запрос", async () => {
    //     const mockPutReq = jest.spyOn($api, "put");
    //     componentRender(<EditableProfileCard id="1" />, options);

    //     await act(async () =>
    //         userEvent.click(
    //             screen.getByTestId("EditableProfileCardHeader.EditButton"),
    //         ),
    //     );

    //     await act(async () =>
    //         userEvent.type(screen.getByTestId("ProfileCard.firstname"), "user"),
    //     );

    //     await act(async () =>
    //         userEvent.click(
    //             screen.getByTestId("EditableProfileCardHeader.SaveButton"),
    //         ),
    //     );

    //     expect(mockPutReq).toHaveBeenCalled();
    // });
});
