using Microsoft.AspNetCore.Mvc;
using Divider.Models;
using Microsoft.EntityFrameworkCore;

namespace Divider.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class DividersController : ControllerBase
  {
    private readonly DividersContext _context;

    public DividersController(DividersContext context)
    {
      _context = context;
    }

    [HttpGet]
    [Route("/contacts")]
    public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
    {
      return await _context.Contacts.ToListAsync();
    }

    [HttpPost]
    [Route("/contacts")]
    public async Task<ActionResult<Contact>> CreateContact(Contact contact)
    {
      if (contact == null)
      {
        return BadRequest();
      }
      _context.Contacts.Add(contact);
      await _context.SaveChangesAsync();
      return CreatedAtRoute("GetContact", new { name = contact.Name }, contact);
    }

    [HttpGet]
    [Route("/items")]
    public async Task<ActionResult<IEnumerable<Item>>> GetItems()
    {
      return await _context.Items.ToListAsync();
    }

    [HttpPost]
    [ActionName(nameof(Item))]
    [Route("/items")]
    public async Task<ActionResult<Item>> CreateItem(Item item)
    {
      if (item == null)
      {
        return BadRequest();
      }
      _context.Items.Add(item);
      await _context.SaveChangesAsync();
      return CreatedAtRoute(nameof(CreateItem), new { name = item.Name }, item);
    }
  }
};

