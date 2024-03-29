// import { format } from "date-fns";

import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "../../components";
import { useTableLocationParams } from "../../components/Table/useTableLocationParams";
import { GamesContext } from "../../contexts";
import { TableGame, useGamesListBox } from "./useGamesListBox";
import { formatDate } from "../../constants";

export const GamesListBox = () => {
  const { pageNum, rowsPerPage } = useTableLocationParams();
  const { t } = useTranslation();
  const { headCells } = useGamesListBox();

  const { games } = useContext(GamesContext);
  const data = games.map((el) => ({
    ...el,
    userName: `${el?.user?.firstName || ""} ${el?.user?.lastName || ""}`,
    startDate: el?.startDate
      ? formatDate(el.startDate)
      : "-",
  })) as TableGame[];

  return (
    <div>
      <Table
        title={t("table.games")}
        data={data}
        headCells={headCells}
        routeBasename="games"
        pageNum={pageNum}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};
