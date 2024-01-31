using Divider.Models;
using Divider.ApiModels;

namespace Divider.Service;

public interface IItemService
{
  public IEnumerable<Item> GetItemsByPlace(int placeId);
  public Item CreateItem(CreateItemRequest creationRequest);
}
