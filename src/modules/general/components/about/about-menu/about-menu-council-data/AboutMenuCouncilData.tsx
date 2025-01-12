'use client';

import DutyIcon from '@modules/general/components/icons/duty';
import MemberIcon from '@modules/general/components/icons/member';
import MeetingIcon from '@modules/general/components/icons/meeting';
import ObjectiveIcon from '@modules/general/components/icons/objective';
import SecretaryIcon from '@modules/general/components/icons/secretary';
import { AboutUsType, } from '@/modules/general/libraries/general-types';
import EnforcementIcon from '@modules/general/components/icons/enforcement';
import SecretaryMembersIcon from '@modules/general/components/icons/secretary-members';

const AboutMenuCouncilData: AboutUsType[] = [
  {
    title: "about-executive-council.objective",
    link: '#objective',
    icon: <ObjectiveIcon />,
  },
  {
    title: "about-executive-council.duty",
    link: '#duty',
    icon: <DutyIcon />,
  },
  {
    title: "about-executive-council.member",
    link: '#member',
    icon: <MemberIcon />,
  },
  {
    title: "about-executive-council.enforcement",
    link: '#enforcement',
    icon: <EnforcementIcon />,
  },
  {
    title: "about-executive-council.secretary",
    link: '#secretary',
    icon: <SecretaryIcon />,
  },
  {
    title: "about-executive-council.meeting",
    link: '#meeting',
    icon: <MeetingIcon />,
  },
  {
    title: "about-executive-council.secretaryMembers",
    link: '#secretaryMembers',
    icon: <SecretaryMembersIcon />,
  },
];

export default AboutMenuCouncilData;