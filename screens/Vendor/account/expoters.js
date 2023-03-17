export const exporters = (key) => {
    switch (key) {
      case "WAITING_FOR_ACCEPT":
        return "Wait for accept order";
      case "ACCEPTED":
        return "Waiting for payment";
      case "WAITING_FOR_PAYMENT":
        return "Waiting for payment";
      case "PROCESSING":
        return "Processing";
      case "DELIVERED":
        return "Delivered";
      case "REFUNDED":
        return "Refunded";
      case "CANCELLED":
        return "Cancelled";
      case "COMPLETED":
        return "Completed";
      case "PENDING":
        return "Pending";
      default:
        return "Unknown";
    }
  };
  export const allExporters=[
    {
      title:"Processing",
      key:"PROCESSING"
    },
    {
      title:"Pending",
      key:"PENDING"
    },
    {
      title:"Accepted",
      key:"ACCEPTED"
    },
    {
      title:"Cancelled",
      key:"CANCELLED"
    },
    {
      title:"Completed",
      key:"COMPLETED"
    },
  ]