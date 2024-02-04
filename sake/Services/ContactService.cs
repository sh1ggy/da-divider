using Divider.ApiModels;
using Divider.Models;
using Divider.Repository;

namespace Divider.Service;

public class ContactService : IContactService
{
	private IContactRepository _repository;
	public ContactService(IContactRepository repository)
	{
		_repository = repository;
	}

	public Contact CreateContact(CreateContactRequest createContactRequest)
	{
		Contact contact = new Contact
		{
			Name = createContactRequest.Name,
			Email = createContactRequest.Email,
			Mobile = createContactRequest.Mobile
		};
		_repository.CreateContact(contact);
		return contact;
	}

	public IEnumerable<Contact> GetContacts()
	{
		return _repository.GetContacts();
	}

	public void DeleteContact(int contactId)
	{
		_repository.DeleteContact(contactId);
	}

	public Contact? EditContact(EditContactRequest editContactRequest, int contactId)
	{
		if (editContactRequest.Contact.Id != contactId) return null;
		return _repository.EditContact(editContactRequest.Contact);
	}
}