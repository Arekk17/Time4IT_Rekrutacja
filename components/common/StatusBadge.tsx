interface StatusBadgeProps {
  status: "new" | "processing" | "shipped" | "delivered" | "cancelled" | string;
}

const getBadgeClasses = (status: string) => {
  switch (status) {
    case "new":
    case "processing":
    case "shipped":
      return "bg-status-new-bg border border-status-new-border text-status-new-text";
    case "delivered":
      return "bg-status-delivered-bg border border-status-delivered-border text-status-delivered-text";
    case "cancelled":
      return "bg-status-cancelled-bg border border-status-cancelled-border text-status-cancelled-text";
    default:
      return "bg-status-new-bg border border-status-new-border text-status-new-text";
  }
};

const getDotClass = (status: string) => {
  switch (status) {
    case "new":
    case "processing":
    case "shipped":
      return "bg-status-new-dot";
    case "delivered":
      return "bg-status-delivered-dot";
    case "cancelled":
      return "bg-status-cancelled-dot";
    default:
      return "bg-status-new-dot";
  }
};

const getLabel = (status: string) => {
  switch (status) {
    case "new":
      return "Nowe";
    case "processing":
      return "W trakcie";
    case "shipped":
      return "Wysłane";
    case "delivered":
      return "Dostarczone";
    case "cancelled":
      return "Anulowane";
    default:
      return "Nowe";
  }
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <div
      className={`flex flex-row items-center h-[22px] rounded-2xl px-2 py-[2px] pl-[6px] gap-1 ${getBadgeClasses(
        status
      )}`}
    >
      <div className="w-2 h-2 relative">
        <div
          className={`absolute w-[6px] h-[6px] left-[1px] top-[1px] rounded-full ${getDotClass(
            status
          )}`}
        ></div>
      </div>
      <span className="font-medium text-xs leading-[18px] text-center">
        {getLabel(status)}
      </span>
    </div>
  );
}
