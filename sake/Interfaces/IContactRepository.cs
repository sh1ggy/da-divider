using Divider.Models;

namespace Divider.Repository;

public interface IContactRepository
{
  public IEnumerable<Contact> GetContacts();
  public void CreateContact(Contact contact);
  public void DeleteContact(int contactId);
}