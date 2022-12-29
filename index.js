const { Command } = require("commander");
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
} = require("./db/contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "add":
      try {
        console.log("invoke add", name, email, phone);
        await addContact(name, email, phone);
      } catch (error) {
        console.log(error);
      }
      break;

    case "remove":
      try {
        console.log("invoke remove", id);
        await removeContact(id);
      } catch (error) {
        console.log(error);
      }
      break;

    case "list":
      try {
        console.log("invoke list");
        const list = await listContacts();
        console.table(list);
      } catch (error) {
        console.log(error);
      }
      break;
    case "get":
      try {
        console.log("invoke get by id");
        const getContact = await getContactById(id);
        console.log(getContact);
      } catch (error) {
        console.log(error);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
