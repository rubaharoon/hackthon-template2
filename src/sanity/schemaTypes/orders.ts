const orderSchema = {
  name: "order",
  type: "document",
  title: "Order",
  fields: [
    // Checkout Details
    {
      name: "firstName",
      type: "string",
      title: "First Name",
    },
    {
      name: "lastName",
      type: "string",
      title: "Last Name",
    },
    {
      name: "email",
      type: "string",
      title: "Email",
    },
    {
      name: "phone",
      type: "string",
      title: "Phone",
    },
    {
      name: "address",
      type: "string",
      title: "Address",
    },
    {
      name: "apartment",
      type: "string",
      title: "Apartment",
    },
    {
      name: "city",
      type: "string",
      title: "City",
    },
    {
      name: "country",
      type: "string",
      title: "Country",
    },
    {
      name: "postalCode",
      type: "string",
      title: "Postal Code",
    },
    {
      name: "saveInfo",
      type: "boolean",
      title: "Save Info for Next Time",
    },

    // Cart Items
    {
      name: "cartItems",
      type: "array",
      title: "Cart Items",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "id",
              type: "string",
              title: "Product ID",
            },
            {
              name: "name",
              type: "string",
              title: "Product Name",
            },
            {
              name: "price",
              type: "number",
              title: "Price",
            },
            {
              name: "quantity",
              type: "number",
              title: "Quantity",
            },
          ],
        },
      ],
    },

    // Order Totals
    {
      name: "subtotal",
      type: "number",
      title: "Subtotal",
    },
    {
      name: "total",
      type: "number",
      title: "Total",
    },

    // Shipping Details
    {
      name: "shippingRate",
      type: "object",
      title: "Shipping Rate",
      fields: [
        {
          name: "rateId",
          type: "string",
          title: "Rate ID",
        },
        {
          name: "serviceType",
          type: "string",
          title: "Service Type",
        },
        {
          name: "cost",
          type: "number",
          title: "Cost",
        },
        {
          name: "estimatedDelivery",
          type: "string",
          title: "Estimated Delivery",
        },
      ],
    },

    // Shipping Label
    {
      name: "shippingLabel",
      type: "object",
      title: "Shipping Label",
      fields: [
        {
          name: "labelId",
          type: "string",
          title: "Label ID",
        },
        {
          name: "trackingNumber",
          type: "string",
          title: "Tracking Number",
        },
        {
          name: "labelUrl",
          type: "string",
          title: "Label URL",
        },
        {
          name: "labelPrice",
          type: "number",
          title: "Label Price",
        },
        {
          name: "tax",
          type: "number",
          title: "Tax",
        },
        {
          name: "service_type",
          type: "string",
          title: "Service Type",
        },
        {
          name: "info_date",
          type: "string",
          title: "Info Date",
        },
        {
          name: "shop_fit_owner",
          type: "string",
          title: "Shop/Fit Owner",
        },
        {
          name: "translate",
          type: "boolean",
          title: "Translate",
        },
        {
          name: "validate_to_stress",
          type: "string",
          title: "Validate to Stress",
        },
      ],
    },

    // Tracking Status
    {
      name: "trackingStatus",
      type: "object",
      title: "Tracking Status",
      fields: [
        {
          name: "status",
          type: "string",
          title: "Status",
        },
        {
          name: "lastUpdated",
          type: "datetime",
          title: "Last Updated",
        },
        {
          name: "location",
          type: "string",
          title: "Current Location",
        },
        {
          name: "estimatedDelivery",
          type: "datetime",
          title: "Estimated Delivery",
        },
      ],
    },

    // Payment Details
    {
      name: "paymentDetails",
      type: "object",
      title: "Payment Details",
      fields: [
        {
          name: "paymentId",
          type: "string",
          title: "Payment ID",
        },
        {
          name: "paymentStatus",
          type: "string",
          title: "Payment Status",
        },
        {
          name: "paymentMethod",
          type: "string",
          title: "Payment Method",
        },
        {
          name: "amountPaid",
          type: "number",
          title: "Amount Paid",
        },
      ],
    },
  ],
};

export default orderSchema;