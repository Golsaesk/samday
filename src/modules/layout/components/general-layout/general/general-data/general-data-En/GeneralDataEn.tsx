import BaleIcon from "@/modules/general/components/icons/bale";
import AparatIcon from "@/modules/general/components/icons/aparat";
import VirastiIcon from "@/modules/general/components/icons/virasti";
import { Layout, } from '@/modules/layout/libraries/layout-types';

const GeneralLayoutDataEn: Layout = {
  menu: {
    data: [
      {
        title: "home",
        value: "Home",
        link: "/en",
        hasSubmenu: false,
      },
      {
        title: 'news',
        value: "News",
        link: "/en/news",
        hasSubmenu: true,
      },
      {
        title: "law",
        value: "Approvals",
        link: "/en/law",
        hasSubmenu: true,
      },
      {
        title: 'reports',
        value: "Reports",
        link: "/en/reports",
        hasSubmenu: true,
      },
      {
        title: 'National database',
        value: "National database",
        link: "/en/national-database",
        hasSubmenu: true,
      },
      {
        title: "about executive council of information technology",
        value: "Executive Council of Information Technology",
        link: "/en/about/executive-council-of-information-technology",
        hasSubmenu: false,
      },
      {
        title: "about eGovernment interactivity taskforce",
        value: "E-Government Interactivity Taskforce",
        link: "/en/about/egovernment-interactivity-taskforce",
        hasSubmenu: false,
      },
      {
        title: "contact",
        value: "Contact Us",
        link: "/en/contact",
        hasSubmenu: false,
      },
    ],
  },
  info: {
    data: [
      {
        title: "Address",
        value: "Tehran, Shariati St., above Qasr intersection, Ministry of Information and Technology Campus, 8th floor, Central Building, Information Technology Executive Council Secretariat",
        link: '',
      },
      {
        title: "E-mail",
        value: "info@samdai.gov.ir",
        link: "mailto:info@samdai.gov.ir",
      },
      {
        title: "Phone",
        value: "+98 21 88117005",
        link: "tel:02188117005",
      },
    ],
  },
  socialMedia: {
    data: [
      {
        link: "#",
        icon: <AparatIcon />,
      },
      {
        link: "https://virasty.com/samdai_GOV",
        icon: <VirastiIcon />,
      },
      {
        link: "#",
        icon: <BaleIcon />,
      },
    ],
  },
};

export default GeneralLayoutDataEn;