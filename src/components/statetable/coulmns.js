// columns.js
export const columns = [
  { name: "ID", uid: "id" },
  { name: "Username", uid: "username" },
  {
    name: "Account State",
    uid: "accountState",
    filterOptions: [
      "New",
      "Checked",
      "To Check",
      "Old",
      "BackUse",
      "In Session",
      "Used Recheck",
      "Recheck",
      "Wrong Auth",
      "Suspended",
    ],
  },
  { name: "Is Active", uid: "isActive", filterOptions: ["Yes", "No"] },
  {
    name: "Account Type",
    uid: "accountType",
    filterOptions: ["Tweeter", "Reactor", "Browser"],
  },
];
