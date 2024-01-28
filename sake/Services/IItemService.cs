using Divider.Models;
using Divider.ApiModels;

namespace Divider.Services;

public interface IItemService
{
  public Item GetItemsByPlace(int placeId);
  public Item CreateItem(CreateItemRequest creationRequest);
}
