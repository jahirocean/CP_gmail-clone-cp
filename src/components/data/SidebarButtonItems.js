import StarIcon from "@material-ui/icons/Star";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import SendIcon from "@material-ui/icons/Send";
import DraftsIcon from "@material-ui/icons/Drafts";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InboxIcon from "@material-ui/icons/Inbox";

export const SidebarButtonItems = [
  { icon: <InboxIcon />, title: "Inbox" },
  {
    icon: <StarIcon />,
    title: "Starred",
  },
  {
    icon: <WatchLaterIcon />,
    title: "Snoozed",
  },
  {
    icon: <SendIcon />,
    title: "Sent",
  },
  {
    icon: <DraftsIcon />,
    title: "Drafts",
  },
  {
    icon: <ExpandMoreIcon />,
    title: "More",
  },
];
