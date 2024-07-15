export const columns = [
  { uid: "selectAll", name: "", sortable: false }, // Checkbox column
  { uid: "id", name: "Session ID" },
  { uid: "campaignName", name: "Campaign Name" },
  {
    uid: "sessionState",
    name: "Session State",
    filterOptions: ["Pending", "Start", "Started", "Stop", "Finished"],
  },
  { uid: "currentProgress", name: "Current Progress" },
  {
    uid: "sessionType",
    name: "Session Type",
    filterOptions: ["Burn", "Premium"],
  },
  { uid: "sessionLastsFor", name: "Session Lasts For" },
  { uid: "activeBots", name: "Active Bots" },
];
