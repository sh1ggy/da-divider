using Divider.Models;
using Divider.ApiModels;
using Microsoft.AspNetCore.Mvc;

namespace Divider.Service;

public interface IContactService
{
  public IEnumerable<Contact> GetContacts();
  public Contact CreateContact(CreateContactRequest createContactRequest);
  public Contact? DeleteContact(int contactId);
}
