interface StatusBadgeProps {
  status: "new" | "processing" | "shipped" | "delivered" | "cancelled" | string;
}

const getBadgeClasses = (status: string) => {
  switch (status) {
    case "new":
    case "processing":
    case "shipped":
      return "bg-[#F9F5FF] border border-[#E9D7FE] text-[#6941C6]";
    case "delivered":
      return "bg-[#ECFDF3] border border-[#ABEFC6] text-[#067647]";
    case "cancelled":
      return "bg-[#FEF3F2] border border-[#FECDCA] text-[#B42318]";
    default:
      return "bg-[#F9F5FF] border border-[#E9D7FE] text-[#6941C6]";
  }
};

const getDotClass = (status: string) => {
  switch (status) {
    case "new":
    case "processing":
    case "shipped":
      return "bg-[#9E77ED]";
    case "delivered":
      return "bg-[#17B26A]";
    case "cancelled":
      return "bg-[#F04438]";
    default:
      return "bg-[#9E77ED]";
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
