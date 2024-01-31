using Divider.Models;

namespace Divider.Repository;

public interface IItemRepository
{
  public IEnumerable<Item> GetItemsByPlace(int placeId);
  public void CreateItem(Item item);
}