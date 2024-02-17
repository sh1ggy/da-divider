using Divider.ApiModels;
using Divider.Models;
using Divider.Repository;

namespace Divider.Service;

public class ItemService : IItemService
{
  private IItemRepository _repository;
  public ItemService(IItemRepository repository)
  {
    _repository = repository;
  }
  public Item CreateItem(CreateItemRequest creationRequest)
  {

    Item item = new Item
    {
      Name = creationRequest.Name,
      Price = creationRequest.Price,
      PlaceId = creationRequest.PlaceId,
    };
    _repository.CreateItem(item);
    return item;
  }

  public IEnumerable<Item> GetItemsByPlace(int placeId)
  {
    return _repository.GetItemsByPlace(placeId);
  }

  public Item? DeleteItem(int itemId)
  {
    var item = _repository.DeleteItem(itemId);
    if (item == null) return null;
    return item;
  }

  public Item? EditItem(EditItemRequest editItemRequest, int itemId)
  {
    if (editItemRequest.item.Id != itemId) return null;
    // TODO: implement proper created/edited at
    return _repository.EditItem(editItemRequest.item);
  }

  public IEnumerable<Contact> AssignContactToItem(int itemId, int contactId, bool unassign)
  {
    if (unassign)
    {
      return _repository.UnassignContactToItem(itemId, contactId, unassign);
    }
    return _repository.AssignContactToItem(itemId, contactId);
  }
}