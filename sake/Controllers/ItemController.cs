using Microsoft.AspNetCore.Mvc;
using Divider.Models;
using Microsoft.EntityFrameworkCore;
using Divider.Service;

namespace Divider.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ItemController : ControllerBase
{
	// TODO: remove;
	private DividersContext _context;
	private IItemService _items;
	public ItemController(IItemService items)
	{
		_items = items;
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

