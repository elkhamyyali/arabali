// Leads.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";

import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";

import { getLeadsContent } from "../leads/leadSlice";
import { users } from "../../components/statetable/data";
import { columns } from "../../components/statetable/coulmns";
import withSorting from "../../components/statetable/withSorting";
import DataTable from "../../components/statetable/DataTable";
import CampaignTable from "../../components/campaigntable/CampaignTable";
import { initialData } from "../../components/campaigntable/data";
import DataTableSessions from "../../components/sessionstable/DataTableSessions";
import { initialSessions } from "../../components/sessionstable/data";

const SortedDataTable = withSorting(DataTable);
const CampaignDataTable = withSorting(CampaignTable);

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
        onClick={openAddNewLeadModal}
      >
        Add New{" "}
      </button>{" "}
    </div>
  );
};

const Transction = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getLeadsContent());
  }, []);

  return (
    <>
      <TitleCard
        title="Leads Table"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <SortedDataTable columns={columns} data={users} />{" "}
      </TitleCard>{" "}
      <TitleCard
        title="Leads Table"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <CampaignDataTable columns={columns} data={initialData} />{" "}
      </TitleCard>{" "}
      <TitleCard
        title="Leads Table"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <DataTableSessions data={initialSessions} />{" "}
      </TitleCard>{" "}
    </>
  );
};

export default Transction;
