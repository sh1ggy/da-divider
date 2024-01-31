using Microsoft.AspNetCore.Mvc;
using Divider.Models;
using Divider.Service;
using Divider.ApiModels;

namespace Divider.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ItemController : ControllerBase
{
	// TODO: remove;
	private IItemService _items;
	public ItemController(IItemService items)
	{
		_items = items;
	}

	[HttpGet]
	[Route("/items/{placeId}")]
	public ActionResult<IEnumerable<Item>> GetItemByPlace(int placeId)
	{
		var items = _items.GetItemsByPlace(placeId);
		return Ok(items);
	}

	[HttpPost]
	[ActionName(nameof(Item))]
	[Route("/items")]
	public ActionResult<Item> CreateItem(CreateItemRequest createItemRequest)
	{
		if (createItemRequest == null)
		{
			return BadRequest();
		}
		_items.CreateItem(createItemRequest);
		return CreatedAtRoute(nameof(CreateItem), new { name = createItemRequest.Name }, createItemRequest);
	}
}

