using Divider.Models;
using Microsoft.AspNetCore.Mvc;

namespace Divider.Repository;

public interface IContactRepository
{
  public IEnumerable<Contact> GetContacts();
  public void CreateContact(Contact contact);
}