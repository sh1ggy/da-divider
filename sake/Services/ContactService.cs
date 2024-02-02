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

	public Contact? DeleteContact(int contactId)
	{
		return _repository.DeleteContact(contactId);
	}
}