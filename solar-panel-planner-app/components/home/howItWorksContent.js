import { FaWpforms } from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { PiSolarRoofBold } from "react-icons/pi";

export const howItWorksContent = [
  {
    icon: FaWpforms,
    title: "Submit request form",
    description:
      "Let us know the address of your installation, how to contact you and pick a convenient time slot for our visit.",
    image: "/images/submit-form.png",
  },
  {
    icon: MdOutlineNotificationsActive,
    title: "Get appointment notification",
    description:
      "Based on your requested time slot and the availability of our inspectors, we will notify you of the exact time of visit to your location via an email, sent the day before the visit.",
    image: "/images/notification.png",
  },
  {
    icon: PiSolarRoofBold,
    title: "Our experts visit your premises",
    description:
      "On the day of evaluation, our experts will perform a thorough inspection of the installation at your premises. The whole inspection process should take about an hour for most installations.",
    image: "/images/solar-panel.png",
  },
];
