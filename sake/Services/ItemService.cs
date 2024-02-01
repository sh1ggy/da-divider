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
    };
    _repository.CreateItem(item);
    return item;
  }

  public IEnumerable<Item> GetItemsByPlace(int placeId)
  {
    return _repository.GetItemsByPlace(placeId);
  }

  public Item DeleteItem(int itemId)
  {
    return _repository.DeleteItem(itemId);
  }
}