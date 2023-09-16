export const users = [
  {
    id: 112233,
    email: "user1@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+54 9 11 2233-4455",
  },
  {
    id: 112234,
    email: "user2@example.com",
    firstName: "Jane",
    lastName: "Smith",
    phone: "+54 9 11 3344-5566",
  },
  {
    id: 112235,
    email: "user3@example.com",
    firstName: "Robert",
    lastName: "Johnson",
    phone: "+54 9 11 4455-6677",
  },
  {
    id: 112236,
    email: "user4@example.com",
    firstName: "Emily",
    lastName: "Wilson",
    phone: "+54 9 11 5566-7788",
  },
  {
    id: 112237,
    email: "user5@example.com",
    firstName: "David",
    lastName: "Brown",
    phone: "+54 9 11 6677-8899",
  },
  {
    id: 112238,
    email: "user6@example.com",
    firstName: "Sophia",
    lastName: "Lee",
    phone: "+54 9 11 7788-9900",
  },
  {
    id: 112239,
    email: "user7@example.com",
    firstName: "Michael",
    lastName: "Martinez",
    phone: "+54 9 11 8899-0011",
  },
  {
    id: 112240,
    email: "user8@example.com",
    firstName: "Olivia",
    lastName: "Garcia",
    phone: "+54 9 11 9900-1122",
  },
  {
    id: 112241,
    email: "user9@example.com",
    firstName: "William",
    lastName: "Hernandez",
    phone: "+54 9 11 0011-2233",
  },
  {
    id: 112242,
    email: "user10@example.com",
    firstName: "Ava",
    lastName: "Lopez",
    phone: "+54 9 11 1122-3344",
  },
  {
    id: 112243,
    email: "user11@example.com",
    firstName: "James",
    lastName: "Taylor",
    phone: "+54 9 11 2233-4455",
  },
];

export default function (req, res) {
  res.status(200).json(users);
}
