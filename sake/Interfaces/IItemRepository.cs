using Divider.Models;

namespace Divider.Repository;

public interface IItemRepository
{
  public IEnumerable<Item> GetItemsByPlace(int placeId);
  public void CreateItem(Item item);
  public Item? DeleteItem(int itemId);
  public Item? EditItem(Item item);
  public IEnumerable<Contact> AssignContactToItem(int itemId, int contactId);
  public IEnumerable<Contact> UnassignContactToItem(int itemId, int contactId);
}