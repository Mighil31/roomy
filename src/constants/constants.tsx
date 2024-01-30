export const constants = {
  navBar_color: "#2e3b55",
  bg_color: "#f8f9fa",
  item_color: "#ebfbee",
  highlight_color: "#424e66",
  button_color: "#424e66",
  sizesList: [{ "type": "1 BHK", "value": "1bhk" },
  { "type": "2 BHK", "value": "2bhk" },
  { "type": "3 BHK", "value": "3bhk" },
  { "type": "Other", "value": "Other" }
  ],
  houseList: ["Flat", "Apartment", "House", "PG"],
  errorMessages: {
    400: ["Look like you're lost", "The page you are looking for is not found"],
    500: ["Server Error", "Server Error, please try again later"]
  } as { [key: number]: Array<string> }
};
