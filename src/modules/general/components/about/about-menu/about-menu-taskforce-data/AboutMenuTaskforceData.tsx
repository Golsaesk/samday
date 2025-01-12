'use client';

import DutyIcon from '@modules/general/components/icons/duty';
import MemberIcon from '@modules/general/components/icons/member';
import DocumentIcon from '@modules/general/components/icons/document';
import { AboutUsType, } from '@/modules/general/libraries/general-types';
import NotificationIcon from '@modules/general/components/icons/notification';
import PerformanceGuaranteeIcon from '../../../icons/performance-guarantee';
import InformationExchangeIcon from '../../../icons/information-exchange';
import BasicInformationIcon from '../../../icons/Basic-ibformation';

const AboutMenuTaskforceData: AboutUsType[] = [
  {
    title: "about_eGovernment_interactivity_taskforce.member",
    link: '#member',
    icon: <MemberIcon />,
  },
  {
    title: "about_eGovernment_interactivity_taskforce.duty",
    link: '#duty',
    icon: <DutyIcon />,
  },
  {
    title: "about_eGovernment_interactivity_taskforce.document",
    link: '#document',
    icon: <DocumentIcon />,
  },
  {
    title: "about_eGovernment_interactivity_taskforce.notification",
    link: '#notification',
    icon: <NotificationIcon />,
  },
  {
    title: "about_eGovernment_interactivity_taskforce.performance",
    link: '#performance',
    icon: <PerformanceGuaranteeIcon />,
  },
  {
    title: "about_eGovernment_interactivity_taskforce.nie",
    link: '#nie',
    icon: <InformationExchangeIcon />,
  },
  {
    title: "about_eGovernment_interactivity_taskforce.databases",
    link: '#databases',
    icon: <BasicInformationIcon />,
  },
];

export default AboutMenuTaskforceData;