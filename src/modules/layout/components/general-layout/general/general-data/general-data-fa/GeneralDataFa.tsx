import BaleIcon from "@/modules/general/components/icons/bale";
import AparatIcon from "@/modules/general/components/icons/aparat";
import VirastiIcon from "@/modules/general/components/icons/virasti";
import { Layout, } from '@/modules/layout/libraries/layout-types';

const GeneralLayoutDataFa: Layout = {
  menu: {
    data: [
      {
        title: "home",
        value: "صفحه اصلی",
        link: "/",
        hasSubmenu: false,
      },
      {
        title: 'news',
        value: "اخبار",
        link: "/news",
        hasSubmenu: true,
      },
      {
        title: "law",
        value: "مصوبات",
        link: "/law",
        hasSubmenu: true,
      },
      {
        title: 'report',
        value: "گزارش و تحلیل",
        link: "/reports",
        hasSubmenu: true,
      },
      {
        title: 'national database',
        value: "پایگاه اطلاعات پایه",
        link: "/national-database",
        hasSubmenu: true,
      },
      {
        title: "about executive council of information technology",
        value: "معرفی شورای اجرایی فناوری اطلاعات",
        link: "/about/executive-council-of-information-technology",
        hasSubmenu: false,
      },
      {
        title: "about eGovernment interactivity taskforce",
        value: "معرفی کارگروه تعامل پذیری دولت الکترونیک",
        link: "/about/egovernment-interactivity-taskforce",
        hasSubmenu: false,
      },
      {
        title: "contact",
        value: "تماس با ما",
        link: "/contact",
        hasSubmenu: false,
      },
    ],
  },
  info: {
    data: [
      {
        title: "آدرس",
        value: "تهران، خیابان شریعتی، بالاتر از چهارراه قصر، پردیس وزارت و فناوری اطلاعات، طبقه هشتم، ساختمان مرکزی، دبیرخانه شورای اجرایی فناوری اطلاعات",
        link: '',
      },
      {
        title: "ایمیل",
        value: "info@samdai.gov.ir",
        link: "mailto:info@samdai.gov.ir",
      },
      {
        title: "تلفن",
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

export default GeneralLayoutDataFa;