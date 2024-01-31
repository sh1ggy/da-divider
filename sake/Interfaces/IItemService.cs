using Divider.Models;
using Divider.ApiModels;

namespace Divider.Service;

public interface IItemService
{
  public Item GetItemsByPlace(int placeId);
  public Item CreateItem(CreateItemRequest creationRequest);
}
