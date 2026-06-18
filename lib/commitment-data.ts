export type CommunicationStandard = {
  id: string;
  title: string;
  description: string;
};

export const communicationStandards: CommunicationStandard[] = [
  {
    id: "response-time",
    title: "Response Time",
    description: "All inquiries answered within 24 hours",
  },
  {
    id: "meeting-frequency",
    title: "Meeting Frequency",
    description: "Quarterly reviews, annual planning, ad-hoc as needed",
  },
  {
    id: "reporting",
    title: "Reporting",
    description: "Monthly statements, quarterly performance reports",
  },
  {
    id: "technology",
    title: "Technology Access",
    description: "Secure client portal, mobile app, video conferencing",
  },
];
