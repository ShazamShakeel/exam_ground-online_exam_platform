import CampaignIcon from "@mui/icons-material/Campaign";
import Dashboard from "@mui/icons-material/Dashboard";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import EventIcon from "@mui/icons-material/Event";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ReceiptIcon from "@mui/icons-material/Receipt";

const StudentSidebarListItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <Dashboard />,
  },
  {
    title: "Courses",
    path: "/courses",
    icon: <LibraryBooksIcon />,
  },
  {
    title: "Exams",
    path: "/exams",
    icon: <DocumentScannerIcon />,
  },
  {
    title: "Date Sheets",
    path: "/datesheets",
    icon: <EventIcon />,
  },
  {
    title: "Results",
    path: "/results",
    icon: <ReceiptIcon />,
  },
  {
    title: "Announcements",
    path: "/announcements",
    icon: <CampaignIcon />,
  },
];

export default StudentSidebarListItems;
