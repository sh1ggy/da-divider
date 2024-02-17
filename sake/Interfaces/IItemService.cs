using Divider.Models;
using Divider.ApiModels;

namespace Divider.Service;

public interface IItemService
{
  public IEnumerable<Item> GetItemsByPlace(int placeId);
  public Item CreateItem(CreateItemRequest creationRequest);
  public Item? DeleteItem(int itemId);
  public Item? EditItem(EditItemRequest editRequest, int itemId);
  public IEnumerable<Contact> AssignContactToItem(int itemId, int contactId, bool unassign);
}
