import { format } from "date-fns";
import { taskStatus } from "../constants";
import { Tooltip } from "@chakra-ui/react";

export const showDynamicStatusBadge = (status) => {
  switch (status) {
    case taskStatus.TODO:
      return "purple";
    case taskStatus.INPROGRESS:
      return "orange";
    case taskStatus.COMPLETE:
      return "green";
    default:
      return "purple";
  }
};

export const formatDate = (date) => {
  const newDate = new Date(date);
  const formattedDate = format(newDate, "dd/MM/yyyy hh:mm aa");

  return formattedDate;
};

export const formatLongText = (longText, limit) => {
  if (longText.length > limit) {
    return <Tooltip label={longText}>{`${longText.substring(0, limit - 10)}...`}</Tooltip>;
  }

  return longText;
};
