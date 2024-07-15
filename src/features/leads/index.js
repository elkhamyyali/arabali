import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { getLeadsContent } from "./leadSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";

import columns from "../../components/tables/columns/columns";
import data from "../../components/tables/data/data";
import withSorting from "../../components/tables/withSorting";
import DataTable from "../../components/tables/DataTable";
import NewDataTable from "../../components/botstable/components/NewDataTable";
import {
  newColumns,
  newInitialData,
} from "../../components/botstable/data/newData";
import DataTableSessions from "../../components/secondsessions/DataTableSessions";
import { initialData } from "../../components/secondsessions/data";
import DataTableItems from "../../components/items/DataTableItems";
import { TheData } from "../../components/items/data";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Add New Lead",
        bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewLeadModal()}
      >
        {" "}
        Add New{" "}
      </button>{" "}
    </div>
  );
};

function Leads() {
  const { leads } = useSelector((state) => state.lead);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeadsContent());
  }, []);

  const getDummyStatus = (index) => {
    if (index % 5 === 0) return <div className="badge"> Not Interested </div>;
    else if (index % 5 === 1)
      return <div className="badge badge-primary"> In Progress </div>;
    else if (index % 5 === 2)
      return <div className="badge badge-secondary"> Sold </div>;
    else if (index % 5 === 3)
      return <div className="badge badge-accent"> Need Followup </div>;
    else return <div className="badge badge-ghost"> Open </div>;
  };

  const deleteCurrentLead = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this lead?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
          index,
        },
      })
    );
  };
  const SortedNewDataTable = withSorting(NewDataTable);
  const SortedTable = withSorting(DataTable);
  return (
    <>
      <TitleCard
        title="Current Leads"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}{" "}
        <SortedTable columns={columns} data={data} />{" "}
      </TitleCard>{" "}
      <TitleCard
        title="Bots Table"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}{" "}
        <SortedNewDataTable columns={newColumns} data={newInitialData} />{" "}
      </TitleCard>{" "}
      <TitleCard
        title="Bots Table"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}{" "}
        <DataTableSessions data={initialData} />{" "}
      </TitleCard>{" "}
      <TitleCard
        title="Bots Table"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}{" "}
        <DataTableItems data={TheData} />{" "}
      </TitleCard>{" "}
    </>
  );
}

export default Leads;
