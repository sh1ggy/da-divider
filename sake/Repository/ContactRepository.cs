using Divider.Models;
using Microsoft.EntityFrameworkCore;

namespace Divider.Repository;

public class ContactRepository : IContactRepository
{
  protected readonly IUnitOfWork _unitOfWork;

  public ContactRepository(IUnitOfWork unitOfWork, DividersContext context)
  {
    _unitOfWork = unitOfWork;
    _unitOfWork.Context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking; //default to no tracking.
  }

  public void CreateContact(Contact contact)
  {
    _unitOfWork.Context.Contacts.Add(contact);
    _unitOfWork.Context.SaveChanges();
  }

  public IEnumerable<Contact> GetContacts()
  {
    List<Contact> contacts = _unitOfWork.Context.Contacts.ToList();
    return contacts;
  }

  public void DeleteContact(int contactId)
  {
    var res = _unitOfWork.Context.Contacts
      .FirstOrDefault(c => c.Id == contactId);
    if (res != null)
    {
      _unitOfWork.Context.Contacts.Remove(res);
      _unitOfWork.Context.SaveChanges();
    }
  }

  public Contact? EditContact(Contact contact)
  {
    var res = _unitOfWork.Context.Contacts.FirstOrDefault(c => c.Id == contact.Id);
    if (res != null)
    {
      res = contact;
      _unitOfWork.Context.Contacts.Update(res);
      _unitOfWork.Context.SaveChanges();
      return res;
    }
    return null;
  }
}