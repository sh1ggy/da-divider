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
		try
		{
			var items = _items.GetItemsByPlace(placeId);
			return Ok(items);
		}
		catch
		{
			return BadRequest();
		}
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

	[HttpDelete]
	[Route("/items/{itemId}")]
	public ActionResult<Item> DeleteItem(int itemId)
	{
		if (itemId == 0)
		{
			return BadRequest();
		}
		_items.DeleteItem(itemId);
		return Ok();
	}

	[HttpPut]
	[Route("/items/{itemId}")]
	public ActionResult<Item> EditItem(EditItemRequest editItemRequest, int itemId)
	{
		if (editItemRequest == null)
		{
			return BadRequest();
		}
		var res = _items.EditItem(editItemRequest, itemId);
		if (res == null) return BadRequest();
		return Ok();
	}
}

