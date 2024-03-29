import { useTranslation } from "react-i18next";
export interface MenuItem {
  name: string;
  path: string;
  displayInMenu: boolean;
}

export const useMenuItems = () => {
  const { t } = useTranslation();

  const FIELD_ITEMS: MenuItem[] = [
    {
      name: t("page.fields"),
      path: "/fields",
      displayInMenu: true,
    },
    { name: t("page.createField"), path: "/field/create", displayInMenu: true },
    { name: t("page.field"), path: "/field", displayInMenu: false },
  ];

  const USER_ITEMS: MenuItem[] = [
    { name: t("page.allUsers"), path: "/users", displayInMenu: true },
    { name: t("page.user"), path: "/user", displayInMenu: false },
  ];

  const GAME_ITEMS: MenuItem[] = [
    { name: t("page.allGames"), path: "/games", displayInMenu: true },
    { name: t("page.createGame"), path: "/game/create", displayInMenu: true },
    { name: t("page.game"), path: "/game", displayInMenu: false },
    { name: t("page.calendar"), path: "/calendar", displayInMenu: false },
  ];

  const SETTINGS_ITEMS: MenuItem[] = [
    { name: t("page.accesses"), path: "/access", displayInMenu: true },
  ];

  const MENU_ITEMS_ARR = [
    ...FIELD_ITEMS,
    ...USER_ITEMS,
    ...GAME_ITEMS,
    ...SETTINGS_ITEMS,
  ];

  const MENU_ITEMS = {
    FIELD: FIELD_ITEMS,
    GAME: GAME_ITEMS,
    USER: USER_ITEMS,
    SETTINGS: SETTINGS_ITEMS,
  };

  return {
    MENU_ITEMS_ARR,
    MENU_ITEMS,
  };
};
