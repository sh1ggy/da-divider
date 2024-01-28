using Divider.Models;

namespace Divider.Repository;

public interface IItemRepository
{
  public int GetItemsByPlace(int placeId);

  public int CreateItem(Item item);
}