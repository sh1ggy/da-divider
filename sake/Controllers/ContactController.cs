using Divider.ApiModels;
using Divider.Models;
using Divider.Service;
using Microsoft.AspNetCore.Mvc;

namespace Divider.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ContactController : ControllerBase
{
  private IContactService _contacts;
  public ContactController(IContactService contacts)
  {
    _contacts = contacts;
  }

  [HttpGet]
  [Route("/contacts")]
  public ActionResult<GetContactsResponse> GetContacts()
  {
    var contacts = _contacts.GetContacts();
    return Ok(contacts);
  }

  [HttpPost]
  [Route("/contacts")]
  public ActionResult<CreateContactResponse> CreateContact(CreateContactRequest createContactRequest)
  {
    if (createContactRequest == null) return BadRequest();
    _contacts.CreateContact(createContactRequest);
    return CreatedAtAction("CreateContact", createContactRequest);
  }

  [HttpDelete]
  [Route("/contacts/{contactId}")]
  public ActionResult<Contact> DeleteContact(int contactId)
  {
    if (contactId == 0) return BadRequest();
    try
    {
      _contacts.DeleteContact(contactId);
      return Ok();
    }
    catch
    {
      return BadRequest();
    }
  }

  [HttpPut]
  [Route("/contacts/{contactId}")]
  public ActionResult<Contact> EditContact(EditContactRequest editContactRequest, int contactId)
  {
    if (editContactRequest == null) return BadRequest();
    try
    {
      _contacts.EditContact(editContactRequest, contactId);
    }
    catch
    {
      return BadRequest();
    }
    return Ok();

  }
}

